How to install?
===============

Step 1:
-------

```
$ mkdir toptal.com
$ cd toptal.com
$ git clone git@github.com:mahendrakalkura/toptal.com.git .
```

Step 2:
-------

```
$ cd ui
$ npm install -g yo
$ npm install
$ bower install
```

How to run?
===========

```
$ cd ui
$ grunt serve
```

How to test?
============

```
$ cd ui
$ grunt test
```

How to build?
============

```
$ cd ui
$ grunt build
```

Notes
=====

- You can control the URL of the `/api/` section using the following file: `/ui/app/scripts/services/url.js`

- As a safety/security measure, any and all requests returning a `401` status code result in forced session expiration.
