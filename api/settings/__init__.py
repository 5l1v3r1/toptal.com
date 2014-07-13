# -*- coding: utf-8 -*-

from datetime import timedelta

# Flask

DEBUG = False
LOGGER_NAME = 'flask'
MAX_CONTENT_LENGTH = None
PERMANENT_SESSION_LIFETIME = timedelta(days=31)
PROPAGATE_EXCEPTIONS = False
SECRET_KEY = 'SECRET_KEY'
SERVER_NAME = None
SESSION_COOKIE_NAME = 'SESSION_COOKIE_NAME'
TESTING = False
USE_X_SENDFILE = False

# Flask-DebugToolbar

DEBUG_TB_INTERCEPT_REDIRECTS = False
DEBUG_TB_PROFILER_ENABLED = False

# SQLAlchemy

SQLALCHEMY_ECHO = False
