from dataclasses import dataclass
from datetime import date, datetime
from typing import Optional

from beartype import beartype


@beartype
@dataclass(frozen=True)
class Balance:
    crystals: int
