from datetime import date, datetime
from dataclasses import dataclass
from typing import Optional
from models.transaction_item import TransactionItem
from models.transaction_item_tier import TransactionItemTier

from beartype import beartype

@beartype
@dataclass(frozen=True)
class Transaction:
    created_at: datetime
    transaction_item: TransactionItem
    transaction_item_tier: Optional[TransactionItemTier] = None
    id: Optional[int] = None
