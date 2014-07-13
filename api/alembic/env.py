# -*- coding: utf-8 -*-

from __future__ import with_statement

from alembic import context
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool

config = context.config
fileConfig(config.config_file_name)
target_metadata = None


def run_migrations_offline():
    context.configure(url=config.get_main_option('sqlalchemy.url'))
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    engine = engine_from_config(
        config.get_section(config.config_ini_section),
        poolclass=pool.NullPool,
        prefix='sqlalchemy.',
    )
    connection = engine.connect()
    context.configure(connection=connection, target_metadata=target_metadata)
    try:
        with context.begin_transaction():
            context.run_migrations()
    finally:
        connection.close()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
