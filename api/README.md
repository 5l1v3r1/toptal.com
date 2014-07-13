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
$ npm install -g bower
$ bower install
```

How to run?
===========

```
$ workon spa
$ python serve.py
$ deactivate
```

How to test?
============

```
$ workon spa
$ python test.py
$ deactivate
```
