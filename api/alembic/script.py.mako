${'# -*- coding: utf-8 -*-'}

'''
Revision ID: ${up_revision}
Revises: ${down_revision}
Timestamp: ${create_date}
'''

from alembic import op
from sqlalchemy import *
${imports if imports else ''}
revision = ${repr(up_revision)}
down_revision = ${repr(down_revision)}


def upgrade():
    ${upgrades if upgrades else 'pass'}


def downgrade():
    ${downgrades if downgrades else 'pass'}
