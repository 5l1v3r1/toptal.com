# -*- coding: utf-8 -*-

from logging import getLogger

from flask.ext.script import Manager
from webassets.script import CommandLineEnvironment

from modules import models

from serve import application, assets, engine, session_

manager = Manager(application, with_default_commands=False)


@manager.command
def assets_():
    CommandLineEnvironment(assets, getLogger('flask')).build()


@manager.command
def populate():
    models.populate(engine, session_)

if __name__ == '__main__':
    manager.run()
