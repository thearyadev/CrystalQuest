import sqlite3

class Database:
    def __init__(self, db_path):
        self.db_path = db_path

    def __enter__(self):
        self.db = sqlite3.connect(self.db_path)
        return self.db

    def __exit__(self, exc_type, exc_value, traceback):
        self.db.close()