How to install?
===============

Step 1:
-------

```
$ mkdir spa
$ cd spa
$ git clone git@git.toptal.com:Mahendra-Kalkura/mahendra-kalkura.git .
```

Step 2:
-------

```
$ cd api
$ mkvirtualenv spa
$ workon spa
$ pip install -r requirements.txt
$ cp alembic/settings/serve.ini.sample alembic/settings/serve.ini # Line 5
$ cp alembic/settings/test.ini.sample alembic/settings/test.ini   # Line 5
$ cp settings/serve.py.sample settings/serve.py                   # Line 10
$ cp settings/test.py.sample settings/test.py                     # Line 9
$ alembic -c alembic/settings/serve.ini upgrade head
$ deactivate
```

Step 3:
-------

```
$ cd api
$ npm install -g bower
$ bower install
```

How to run?
===========

```
$ cd api
$ workon spa
$ python serve.py
$ deactivate
```

How to test?
============

```
$ cd api
$ workon spa
$ python test.py
$ deactivate
```

Notes
=====

- The user token has a TTL of 86,400 seconds (after which, the session is forcibly expired).

- You can populate the database with sample values using the following commands:

```
$ cd api
$ workon spa
$ python manage.py populate
$ deactivate
```

- You can re-generate the assets using the following commands:

```
$ cd api
$ workon spa
$ python manage.py assets_
$ deactivate
```

- You can see the documentation using the following URL: `http://127.0.0.1:5000/`
