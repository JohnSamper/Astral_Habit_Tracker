"""empty message

Revision ID: 6aaf0a9bbc77
Revises: 0763d677d453
Create Date: 2025-09-14 21:08:44.768640

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '6aaf0a9bbc77'
down_revision = '0763d677d453'
branch_labels = None
depends_on = None

def upgrade():
    # 1) Add column as nullable so existing rows don't violate NOT NULL
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=80), nullable=True))

    # 2) Backfill existing rows (pick a sensible default; here we use email)
    op.execute('UPDATE "user" SET name = email WHERE name IS NULL')

    # 3) Enforce NOT NULL now that data is populated
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('name', existing_type=sa.String(length=80), nullable=False)

def downgrade():
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('name')