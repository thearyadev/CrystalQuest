from dataclasses import dataclass
from datetime import date, datetime
from typing import Optional

from beartype import beartype
from models.transaction_item import TransactionItem
from models.transaction_item_tier import TransactionItemTier


@beartype
@dataclass(frozen=True)
class Transaction:
    created_at: datetime
    transaction_item: TransactionItem
    transaction_item_tier: Optional[TransactionItemTier] = None
    id: Optional[int] = None
