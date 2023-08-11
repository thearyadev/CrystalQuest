from typing import Annotated

import database
from fastapi import APIRouter, Depends, FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from models.balance import Balance
from models.transaction import Transaction
from models.transaction_item import TransactionItem
from models.transaction_item_tier import TransactionItemTier

app = FastAPI()
api = APIRouter(prefix="/api")


@app.on_event("startup")
async def startup_event():
    app.state.db = database.Database("crystal_quest_data/CrystalQuestDatabase.db")
    app.state.db.create_tables("database/schema/tables.sql")


@app.on_event("shutdown")
async def shutdown_event():
    app.state.db.close()


async def get_database():
    return app.state.db


@api.get("/items", response_model=list[TransactionItem])
async def get_all_transaction_items(
    db: database.Database = Depends(get_database),
) -> list[TransactionItem]:
    return db.get_all_transaction_items()


@api.get("/transactions", response_model=list[Transaction])
async def get_all_transactions(
    db: database.Database = Depends(get_database),
) -> list[Transaction]:
    return db.get_all_transactions()


@api.post("/insert/item", response_model=TransactionItem)
async def create_transaction_item(
    transactionItem: TransactionItem, db: database.Database = Depends(get_database)
) -> Response:
    db.insert_transaction_item(transactionItem)
    return Response(status_code=200)


@api.get("/balance", response_model=Balance)
async def get_balance(db: database.Database = Depends(get_database)) -> Balance:
    return db.get_balance()


@api.post("/insert/transaction", response_model=Transaction)
async def create_transaction(
    transaction: Transaction, db: database.Database = Depends(get_database)
) -> Response:
    db.insert_transaction(transaction)
    return Response(status_code=200)


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/", StaticFiles(directory="dist", html=True), name="dist")
