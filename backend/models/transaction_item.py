from datetime import date, datetime
from dataclasses import dataclass
from typing import Optional
from models.transaction_item_tier import TransactionItemTier
from beartype import beartype

@beartype
@dataclass(frozen=True)
class TransactionItem:
    type: str
    name: str
    price: int
    id: Optional[int] = None
    tiers: Optional[list[TransactionItemTier]] = None
