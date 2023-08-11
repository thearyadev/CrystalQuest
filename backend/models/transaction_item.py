from dataclasses import dataclass
from datetime import date, datetime
from typing import Optional

from beartype import beartype
from models.transaction_item_tier import TransactionItemTier


@beartype
@dataclass(frozen=True)
class TransactionItem:
    type: str
    name: str
    price: int
    id: Optional[int] = None
    tiers: Optional[list[TransactionItemTier]] = None
