"""smart migration

Revision ID: 021a6e9bf75c
Revises: bfa9a3191284
Create Date: 2025-03-01 20:02:31.132514

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '021a6e9bf75c'
down_revision: Union[str, None] = 'bfa9a3191284'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
