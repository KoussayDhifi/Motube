"""Adding likers

Revision ID: dd2ad73427aa
Revises: 
Create Date: 2021-09-08 17:15:42.674223

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dd2ad73427aa'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('to_do')
    op.add_column('videos', sa.Column('likers', sa.PickleType(), nullable=True))
    op.alter_column('videos', 'views',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('videos', 'views',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.drop_column('videos', 'likers')
    op.create_table('to_do',
    sa.Column('_id', sa.INTEGER(), nullable=False),
    sa.Column('text', sa.TEXT(), nullable=False),
    sa.PrimaryKeyConstraint('_id')
    )
    # ### end Alembic commands ###