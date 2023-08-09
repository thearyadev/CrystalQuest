from fastapi import FastAPI, Depends, APIRouter, Response
from typing import Annotated
from models.transaction_item import TransactionItem
from models.transaction import Transaction
from models.transaction_item_tier import TransactionItemTier
from fastapi.middleware.cors import CORSMiddleware
from models.balance import Balance

import database


app = FastAPI()
api = APIRouter(prefix="/api")



@app.on_event("startup")
async def startup_event():
    app.state.db = database.Database("CrystalQuestDatabase.db")
    app.state.db.create_tables("database/schema/tables.sql")


@app.on_event("shutdown")
async def shutdown_event():
    app.state.db.close()


async def get_database():
    return app.state.db

@api.get("/items", response_model=list[TransactionItem])
async def get_all_transaction_items(db: database.Database = Depends(get_database)) -> list[TransactionItem]:
    return db.get_all_transaction_items()

@api.get("/transactions", response_model=list[Transaction])
async def get_all_transactions(db: database.Database = Depends(get_database)) -> list[Transaction]:
    return db.get_all_transactions()

@api.post("/insert/item", response_model=TransactionItem)
async def create_transaction_item(transactionItem: TransactionItem, db: database.Database = Depends(get_database)) -> Response:
    db.insert_transaction_item(transactionItem)
    return Response(status_code=200)

@api.get("/balance", response_model=Balance)
async def get_balance(db: database.Database = Depends(get_database)) -> Balance:
    return db.get_balance()

app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)