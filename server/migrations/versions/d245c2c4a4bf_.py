"""empty message

Revision ID: d245c2c4a4bf
Revises: be7d1336de26
Create Date: 2023-05-07 10:31:59.457863

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd245c2c4a4bf'
down_revision = 'be7d1336de26'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.drop_column('text')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('text', sa.TEXT(), nullable=False))

    # ### end Alembic commands ###
