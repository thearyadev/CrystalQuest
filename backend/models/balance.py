from datetime import date, datetime
from dataclasses import dataclass
from typing import Optional

from beartype import beartype

@beartype
@dataclass(frozen=True)
class Balance:
    crystals: int
    today: int
