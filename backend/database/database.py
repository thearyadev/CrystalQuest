import sqlite3
from beartype import beartype
from models.transaction_item import TransactionItem
from models.transaction import Transaction
from models.transaction_item_tier import TransactionItemTier
import datetime

class Database:
    def __init__(self, db_path):
        self.db_path = db_path
        self.db = sqlite3.connect(self.db_path)

    def close(self):
        self.db.close()

    @beartype
    def create_tables(self, schema_path: str) -> None:
        with open(schema_path) as f:
            self.db.executescript(f.read())
            self.db.commit()

    @beartype
    def get_all_transactions(self) -> list[Transaction]:
        cursor = self.db.cursor()
        cursor.execute(
            """
            SELECT
    transactions.id AS transaction_id,
    transactions.created_at AS transaction_created_at,
    transaction_item_tier.id AS tier_id,
    transaction_item_tier.tier AS tier_name,
    transaction_item_tier.price AS tier_price,
    transaction_item.id AS item_id,
    transaction_item.type AS item_type,
    transaction_item.name AS item_name,
    transaction_item.price AS item_price
    FROM transactions
    JOIN transaction_item_tier ON transactions.transaction_item_tier_id = transaction_item_tier.id
    JOIN transaction_item ON transaction_item_tier.transaction_item_id = transaction_item.id;

            """
        )
        return [
            Transaction(
                id=trans_id,
                created_at=datetime.datetime.strptime(created_at, '%Y-%m-%d %H:%M:%S'),
                transaction_item=TransactionItem(
                    id=item_id, type=item_type, name=item_name, price=item_price
                ),
                transaction_item_tier=TransactionItemTier(
                    id=tier_id, tier=tier_name, price=int(tier_price)
                ),
            )
            for trans_id, created_at, tier_id, tier_name, tier_price, item_id, item_type, item_name, item_price in cursor.fetchall()
        ]

    @beartype
    def get_all_transaction_items(self) -> list[TransactionItem]:
        cursor = self.db.cursor()
        cursor.execute(
            """
            SELECT
            ti.id AS item_id,
            ti.type AS item_type,
            ti.name AS item_name,
            ti.price AS item_price,
            GROUP_CONCAT(tt.tier) AS tiers,
            GROUP_CONCAT(tt.price) AS tier_prices
            FROM transaction_item ti
            LEFT JOIN transaction_item_tier tt ON ti.id = tt.transaction_item_id
            GROUP BY ti.id, ti.type, ti.name, ti.price;
            """
        )
        return [
            TransactionItem(
                id=item_id,
                type=item_type,
                name=item_name,
                price=item_price,
                tiers=[
                    TransactionItemTier(tier=tier, price=int(tier_price))
                    for tier, tier_price in zip(
                        tiers.split(","), tier_prices.split(",")
                    ) 
                ] if tiers and tier_prices else None,
            )
            for item_id, item_type, item_name, item_price, tiers, tier_prices in cursor.fetchall()
        ]
