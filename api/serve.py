# -*- coding: utf-8 -*-

from datetime import datetime, timedelta
from functools import wraps
from os import environ
from os.path import abspath, dirname, join

from flask import Flask, g, jsonify, make_response, render_template, request
from flask.ext.assets import Bundle, Environment
from itsdangerous import (
    BadSignature, SignatureExpired, TimedJSONWebSignatureSerializer,
)
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.sql import func

from modules import models

application = Flask(
    __name__, static_folder=join(abspath(dirname(__file__)), 'resources')
)

application.config.from_pyfile('settings/__init__.py')
application.config.from_pyfile('settings/%(environment)s.py' % {
    'environment': environ.get('environment', 'serve'),
}, silent=True)

assets = Environment(application)
assets.cache = False
assets.debug = application.config['DEBUG']
assets.directory = application.static_folder
assets.manifest = 'json:assets/versions.json'
assets.url = application.static_url_path
assets.url_expire = True
assets.versions = 'hash'
assets.register('javascripts', Bundle(
    'vendor/jquery/dist/jquery.js',
    'vendor/bootstrap/dist/js/bootstrap.js',
    filters='rjsmin' if not application.config['DEBUG'] else None,
    output='assets/compressed.js',
))
assets.register('stylesheets', Bundle(
    Bundle(
        'stylesheets/all.less',
        filters='less',
        output='stylesheets/all.css',
    ),
    filters='cssmin,cssrewrite' if not application.config['DEBUG'] else None,
    output='assets/compressed.css',
))

engine = create_engine(
    application.config['SQLALCHEMY_URL'],
    convert_unicode=True,
    echo=application.config['SQLALCHEMY_ECHO'],
    pool_recycle=10,
    pool_size=5,
    pool_timeout=120,
    strategy='threadlocal',
)

models.base.prepare(engine)

session_ = scoped_session(sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=True,
))


def verify(function):
    @wraps(function)
    def decorated_function(*args, **kwargs):
        g.user = None
        token = request.headers.get('Token', '')
        try:
            token = TimedJSONWebSignatureSerializer(
                application.config['SECRET_KEY']
            ).loads(token)
            g.user = g.session.query(
                models.user,
            ).get(token['id'] if 'id' in token else 0)
            if not g.user:
                raise BadSignature
        except BadSignature:
            return jsonify({
                'exception': 'BadSignature'
            }), 401
        except SignatureExpired:
            return jsonify({
                'exception': 'SignatureExpired'
            }), 401
        return function(*args, **kwargs)
    return decorated_function


@application.before_request
def before_request():
    g.session = session_()


@application.after_request
def after_request(response):
    g.session.close()
    return response


@application.route('/')
def index():
    return render_template('index.html')


@application.route('/sign-up', methods=['POST'])
def sign_up():
    email = request.form.get('email', '')
    password = request.form.get('password', '')
    name = request.form.get('name', '')
    if not email or not password or not name:
        return jsonify({
            'exception': 'Invalid Parameters',
        }), 400
    if g.session.query(models.user).filter(models.user.email==email).count():
        return jsonify({
            'exception': 'Invalid Email',
        }), 400
    user = models.user(**{
        'email': email,
        'name': name,
        'password': password,
    })
    g.session.add(user)
    g.session.commit()
    g.session.refresh(user)
    return jsonify(user.get_dictionary()), 200


@application.route('/sign-in', methods=['POST'])
def sign_in():
    email = request.form.get('email', '')
    password = request.form.get('password', '')
    if not email or not password:
        return jsonify({
            'exception': 'Invalid Parameters',
        }), 400
    user = g.session.query(
        models.user,
    ).filter(
        models.user.email==email,
    ).first()
    if not user:
        return jsonify({
            'exception': 'Invalid Email/Password',
        }), 400
    if not user.is_valid(password):
        return jsonify({
            'exception': 'Invalid Password',
        }), 400
    return jsonify({
        'token': user.get_token(),
    }), 200


@application.route('/profile', methods=['POST'])
@verify
def profile():
    password = request.form.get('password', '')
    name = request.form.get('name', '')
    if not password or not name:
        return jsonify({
            'exception': 'Invalid Parameters',
        }), 400
    g.user.password = password
    g.user.name = name
    g.session.add(g.user)
    g.session.commit()
    g.session.refresh(g.user)
    return jsonify(g.user.get_dictionary()), 200


@application.route('/entry', methods=['GET'])
@verify
def times_get():
    dates_from = request.args.get('dates_from', '')
    if dates_from:
        dates_from = datetime.strptime(dates_from, '%Y-%m-%d').date()
    dates_to = request.args.get('dates_to', '')
    if dates_to:
        dates_to = datetime.strptime(dates_to, '%Y-%m-%d').date()
    order_by_column = request.args.get('order_by_column', '')
    if not order_by_column in ['id', 'date', 'distance', 'time']:
        order_by_column = 'id'
    order_by_direction = request.args.get('order_by_direction', '')
    if not order_by_direction in ['asc', 'desc']:
        order_by_direction = 'asc'
    offset = 0
    try:
        offset = int(request.args.get('offset', '0'))
    except ValueError:
        pass
    limit = 10
    try:
        limit = int(request.args.get('limit', '10'))
    except ValueError:
        pass
    query = g.session.query(models.entry).filter(models.entry.user==g.user)
    if dates_from:
        query = query.filter(models.entry.date >= dates_from)
    if dates_to:
        query = query.filter(models.entry.date <= dates_to)
    return jsonify({
        'items': [
            item.get_dictionary()
            for item in query.order_by('%(column)s %(direction)s' % {
                'column': order_by_column,
                'direction': order_by_direction,
            }).all()[offset:offset+limit]
        ],
        'total': query.count(),
    }), 200


@application.route('/entry', methods=['POST'])
@verify
def times_post():
    date = request.form.get('date', '')
    distance = request.form.get('distance', '')
    time = request.form.get('time', '')
    if not date or not distance or not time:
        return jsonify({
            'exception': 'Invalid Parameters',
        }), 400
    entry = models.entry(**{
        'date': date,
        'distance': distance,
        'time': time,
        'user': g.user,
    })
    g.session.add(entry)
    g.session.commit()
    g.session.refresh(entry)
    return jsonify(entry.get_dictionary()), 200


@application.route('/entry/<int:id>', methods=['PUT'])
@verify
def times_put(id):
    entry = g.session.query(models.entry).get(id)
    if not entry:
        return jsonify({
            'exception': 'Invalid ID',
        }), 400
    if not entry.user == g.user:
        return jsonify({
            'exception': 'Invalid Entry',
        }), 400
    date = request.form.get('date', '')
    distance = request.form.get('distance', '')
    time = request.form.get('time', '')
    if not date or not distance or not time:
        return jsonify({
            'exception': 'Invalid Parameters',
        }), 400
    entry.date = date
    entry.distance = distance
    entry.time = time
    g.session.add(entry)
    g.session.commit()
    g.session.refresh(entry)
    return jsonify(entry.get_dictionary()), 200


@application.route('/entry/<int:id>', methods=['DELETE'])
@verify
def times_delete(id):
    entry = g.session.query(models.entry).get(id)
    if not entry:
        return jsonify({
            'exception': 'Invalid ID',
        }), 400
    if not entry.user == g.user:
        return jsonify({
            'exception': 'Invalid Entry',
        }), 400
    g.session.delete(entry)
    g.session.commit()
    return jsonify({}), 200


@application.route('/report', methods=['GET'])
@verify
def report():
    date_ = request.args.get('date', '')
    if date_:
        date_ = datetime.strptime(date, '%Y-%m-%d').date()
    query = g.session.query(
        func.sum(models.entry.distance).label('total_distance'),
        func.sum(models.entry.time).label('total_time'),
    ).filter(
        models.entry.user==g.user,
    )
    if date_:
        query = query.filter(
            models.entry.date >= date_,
            models.entry.date <= date_ + timedelta(days=6),
        )
    result = query.first()
    return jsonify({
        'average_speed': float(result.total_distance / result.total_time),
        'total_distance': float(result.total_distance),
        'total_time': float(result.total_time),
    })

if __name__ == '__main__':
    application.run()
