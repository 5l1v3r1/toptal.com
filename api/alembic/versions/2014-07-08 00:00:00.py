# -*- coding: utf-8 -*-

'''
Revision ID: 5d04db1b0f7
Revises: None
Timestamp: 2014-07-08 00:00:00.000000
'''

from alembic import op
from sqlalchemy import (
    Column, Date, ForeignKey, Index, Integer, Numeric, String,
)

revision = '5d04db1b0f7'
down_revision = None


def upgrade():
    op.create_table(
        'users',
        Column('id', Integer(), nullable=False, primary_key=True),
        Column('email', String(255), nullable=False),
        Column('password', String(255), nullable=False),
        Column('name', String(255), nullable=False),
        Index('email', 'email', unique=True),
        Index('name', 'name'),
    )
    op.create_table(
        'entries',
        Column('id', Integer(), nullable=False, primary_key=True),
        Column('user_id', Integer(), ForeignKey('users.id'), nullable=False),
        Column('date', Date(), nullable=False),
        Column(
            'distance',
            Numeric(asdecimal=True, precision=9, scale=2),
            nullable=False,
        ),
        Column(
            'time',
            Numeric(asdecimal=True, precision=9, scale=2),
            nullable=False,
        ),
        Index('date', 'date'),
        Index('distance', 'distance'),
        Index('time', 'time'),
    )

def downgrade():
    op.drop_table('entries')
    op.drop_table('users')
