How to install?
===============

Step 1:
-------

```
:::bash
$ mkdir spa
$ cd spa
$ git clone git@git.toptal.com:Mahendra-Kalkura/mahendra-kalkura.git .
```

Step 2:
-------

```
:::bash
$ cd ui
$ npm install -g yo
$ npm install
$ bower install
```

How to run?
===========

```
:::bash
$ cd ui
$ grunt serve
```

How to test?
============

```
:::bash
$ cd ui
$ grunt test
```

Notes
=====

- You can control the URL of the `/api/` section using the following file: `/ui/app/scripts/services/url.js`

- As a safety/security measure, any and all requests returning a `401` status code result in forced session expiration.
