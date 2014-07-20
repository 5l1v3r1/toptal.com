# -*- coding: utf-8 -*-

from datetime import date, timedelta
from os import environ
from os.path import dirname, join
from unittest import main, TestCase

from alembic import command
from alembic.config import Config
from simplejson import loads

environ['environment'] = 'test'

command.upgrade(Config(
    join(dirname(__file__), 'alembic', 'settings', 'test.ini')
), 'head')

from serve import application, engine, session_

from modules import models

models.populate(engine, session_)


class TestCase_(TestCase):

    def create_app(self):
        return application


class TestCase1(TestCase_):
    email = 'mahendrakalkura@gmail.com'
    password = 'password'
    name = 'Mahendra Kalkura'
    token = ''

    def setUp(self):
        with application.test_client() as client:
            response = client.post('/sign-in', data={
                'email': self.email,
                'password': self.password,
            })
            self.assertTrue(response.status_code == 200)
            content = loads(response.data)
            self.assertTrue(content['email'] == self.email)
            self.assertTrue(content['token'] != '')
            self.token = content['token']

    def test_1(self):
        with application.test_client() as client:
            response = client.get('/dashboard', headers={
                'Token': self.token,
            })
            self.assertTrue(response.status_code == 200)
            content = loads(response.data)
            self.assertTrue(content['total_distance'] == 679.00)
            self.assertTrue(content['total_time'] == 420.00)
            self.assertTrue(content['average_speed'] == 1.6166666666666667)

    def test_2(self):
        with application.test_client() as client:
            response = client.get('/dashboard', query_string={
                'date': date.today() - timedelta(days=6)
            },headers={
                'Token': self.token,
            })
            self.assertTrue(response.status_code == 200)
            content = loads(response.data)
            self.assertTrue(content['total_distance'] == 637.00)
            self.assertTrue(content['total_time'] == 420.00)
            self.assertTrue(content['average_speed'] == 1.5166666666666666)

    def test_3(self):
        with application.test_client() as client:
            response = client.get('/entry', headers={
                'Token': self.token,
            })
            self.assertTrue(response.status_code == 200)
            content = loads(response.data)
            self.assertTrue(len(content['items']) == 10)
            self.assertTrue(content['meta']['count'] == 100)
            self.assertTrue(content['meta']['first'] == 1)
            self.assertTrue(content['meta']['last'] == 10)
            self.assertTrue(content['meta']['page'] == 1)
            self.assertTrue(content['meta']['pages_1'] == 10)
            self.assertTrue(content['meta']['pages_2'] == [1, 2, 3])

    def test_4(self):
        with application.test_client() as client:
            today = date.today()
            response = client.get('/entry', query_string={
                'dates_from': today - timedelta(days=6),
                'dates_to': today,
            }, headers={
                'Token': self.token,
            })
            self.assertTrue(response.status_code == 200)
            content = loads(response.data)
            self.assertTrue(len(content['items']) == 7)
            self.assertTrue(content['meta']['count'] == 7)
            self.assertTrue(content['meta']['first'] == 1)
            self.assertTrue(content['meta']['last'] == 7)
            self.assertTrue(content['meta']['page'] == 1)
            self.assertTrue(content['meta']['pages_1'] == 1)
            self.assertTrue(content['meta']['pages_2'] == [1])

    def test_5(self):
        with application.test_client() as client:
            response = client.get('/entry/1', headers={
                'Token': self.token,
            })
            self.assertTrue(response.status_code == 200)
            content = loads(response.data)
            self.assertTrue(content['id'] == 1)

    def test_6(self):
        with application.test_client() as client:
            date = '1001-01-01'
            distance = 1.00
            time = 1.00

            response = client.post('/entry', data={
                'date': date,
                'distance': distance,
                'time': time,
            }, headers={
                'Token': self.token,
            })
            self.assertTrue(response.status_code == 200)
            content = loads(response.data)
            self.assertTrue(content['id'] > 0)
            self.assertTrue(content['date'] == date)
            self.assertTrue(content['distance'] == distance)
            self.assertTrue(content['time'] == time)

            id = content['id']

            date = '2002-02-02'
            distance = 2.00
            time = 2.00

            response = client.put('/entry/%(id)d' % {
                'id': id,
            }, data={
                'date': date,
                'distance': distance,
                'time': time,
            }, headers={
                'Token': self.token,
            })
            self.assertTrue(response.status_code == 200)
            content = loads(response.data)
            self.assertTrue(content['id'] > 0)
            self.assertTrue(content['date'] == date)
            self.assertTrue(content['distance'] == distance)
            self.assertTrue(content['time'] == time)

            response = client.delete('/entry/%(id)d' % {
                'id': id,
            }, headers={
                'Token': self.token,
            })
            self.assertTrue(response.status_code == 200)
            content = loads(response.data)
            self.assertTrue(content.keys() == [])

    def test_7(self):
        with application.test_client() as client:
            name = '2'
            response = client.post('/profile', data={
                'name': name,
                'password': self.password,
            }, headers={
                'Token': self.token,
            })
            self.assertTrue(response.status_code == 200)
            content = loads(response.data)
            self.assertTrue(content['id'] > 0)
            self.assertTrue(content['email'] == self.email)
            self.assertTrue(content['name'] == name)


class TestCase2(TestCase_):
    email = '1@1.com'
    password = '1'
    name = '1'

    def test_1(self):
        with application.test_client() as client:
            response = client.post('/sign-up', data={
                'email': self.email,
                'name': self.name,
                'password': self.password,
            })
            self.assertTrue(response.status_code == 200)
            content = loads(response.data)
            self.assertTrue(content['id'] > 0)
            self.assertTrue(content['email'] == self.email)
            self.assertTrue(content['name'] == self.name)

    def test_2(self):
        with application.test_client() as client:
            response = client.post('/sign-in', data={
                'email': self.email,
                'password': self.password,
            })
            self.assertTrue(response.status_code == 200)
            content = loads(response.data)
            self.assertTrue(content['token'] != '')


class TestCase3(TestCase_):

    def test_1(self):
        with application.test_client() as client:
            response = client.post('/sign-up', data={
                'email': '',
                'name': '',
                'password': '',
            })
            self.assertTrue(response.status_code == 400)
            self.assertTrue(
                loads(response.data)['exception'], 'Invalid Parameters'
            )

    def test_2(self):
        with application.test_client() as client:
            response = client.post('/sign-in', data={
                'email': '',
                'password': '',
            })
            self.assertTrue(response.status_code == 400)
            self.assertTrue(
                loads(response.data)['exception'], 'Invalid Parameters'
            )

    def test_3(self):
        with application.test_client() as client:
            response = client.get('/dashboard')
            self.assertTrue(response.status_code == 401)
            self.assertTrue(
                loads(response.data)['exception'], 'BadSignature'
            )

    def test_4(self):
        with application.test_client() as client:
            response = client.get('/entry')
            self.assertTrue(response.status_code == 401)
            self.assertTrue(
                loads(response.data)['exception'], 'BadSignature'
            )

    def test_5(self):
        with application.test_client() as client:
            response = client.get('/entry/0')
            self.assertTrue(response.status_code == 401)
            self.assertTrue(
                loads(response.data)['exception'], 'BadSignature'
            )

    def test_6(self):
        with application.test_client() as client:
            response = client.post('/entry')
            self.assertTrue(response.status_code == 401)
            self.assertTrue(
                loads(response.data)['exception'], 'BadSignature'
            )

    def test_7(self):
        with application.test_client() as client:
            response = client.put('/entry/0')
            self.assertTrue(response.status_code == 401)
            self.assertTrue(
                loads(response.data)['exception'], 'BadSignature'
            )

    def test_8(self):
        with application.test_client() as client:
            response = client.delete('/entry/0')
            self.assertTrue(response.status_code == 401)
            self.assertTrue(
                loads(response.data)['exception'], 'BadSignature'
            )

    def test_9(self):
        with application.test_client() as client:
            response = client.post('/profile')
            self.assertTrue(response.status_code == 401)
            self.assertTrue(
                loads(response.data)['exception'], 'BadSignature'
            )

if __name__ == '__main__':
    main()
