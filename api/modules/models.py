# -*- coding: utf-8 -*-

from contextlib import closing
from datetime import timedelta, date

from bcrypt import hashpw, gensalt
from flask import current_app
from itsdangerous import TimedJSONWebSignatureSerializer
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base, DeferredReflection
from sqlalchemy.orm import backref, relationship
from sqlalchemy.schema import ThreadLocalMetaData

base = declarative_base(cls=DeferredReflection, metadata=ThreadLocalMetaData())


class user(base):
    __tablename__ = 'users'

    password_ = Column('password', String(length=255), nullable=False)

    @property
    def password(self):
        return self.password_

    @password.setter
    def password(self, value):
        self.password_ = hashpw(value.encode('utf-8'), gensalt(10))

    def get_token(self, expires_in=86400):
        return TimedJSONWebSignatureSerializer(
            current_app.config['SECRET_KEY'], expires_in=expires_in,
        ).dumps({
            'id': self.id,
        })

    def get_dictionary(self):
        return {
            'email': self.email,
            'id': self.id,
            'name': self.name,
            'token': self.get_token(),
        }

    def is_valid(self, password):
        return hashpw(password, self.password) == self.password


class entry(base):
    __tablename__ = 'entries'

    user = relationship(
        'user', backref=backref(
            'entries', cascade='all,delete-orphan', lazy='dynamic',
        )
    )

    def get_dictionary(self):
        return {
            'date': self.date.isoformat(),
            'distance': float(self.distance),
            'id': self.id,
            'time': float(self.time),
        }


def populate(engine, session):
    with closing(engine.connect()) as connection:
        connection.execute('SET foreign_key_checks = 0')
        for table in reversed(base.metadata.sorted_tables):
            connection.execute(table.delete())
            connection.execute('ALTER TABLE %(table)s AUTO_INCREMENT = 1' % {
                'table': table,
            })
        connection.execute('SET foreign_key_checks = 1')

    session = session()

    mahendra_kalkura = user(**{
        'email': 'mahendrakalkura@gmail.com',
        'name': 'Mahendra Kalkura',
        'password': 'password',
    })
    session.add(mahendra_kalkura)
    session.commit()
    session.refresh(mahendra_kalkura)

    today = date.today()

    for index in range(0, 100):
        session.add(entry(**{
            'date': today - timedelta(days=index),
            'distance': 100.00 - (index * 1.00),
            'time': 60.00,
            'user': mahendra_kalkura,
        }))
        session.commit()

    session.close()
