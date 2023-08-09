from rich import print

from database import Database

if __name__ == "__main__":
    db = Database("CrystalQuestDatabase.db")
    # db.create_tables("database/schema/tables.sql")
    # db.close()
    # db.create_tables("database/schema/tables.sql")
    print(db.get_all_transaction_items())
    db.close()
