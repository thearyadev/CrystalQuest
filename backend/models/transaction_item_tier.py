from dataclasses import dataclass
from datetime import date, datetime
from typing import Optional

from beartype import beartype


@beartype
@dataclass(frozen=True)
class TransactionItemTier:
    tier: str
    price: int
    id: Optional[int] = None
