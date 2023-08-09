import buildUrl from "./apiEndpointBuilder";
import {Transaction, TransactionItem, Balance} from "./models";

export const ApiFetchTransactions = async (): Promise<Transaction[]> => {
    const url = buildUrl("/api/transactions")
    const response = await fetch(url);
    const responseData = await response.json();

    return responseData.map((transaction: any) => {
        return {
            created_at: new Date(transaction.created_at),
            id: transaction.id,
            transaction_item: {
                id: transaction.transaction_item.id,
                name: transaction.transaction_item.name,
                price: transaction.transaction_item.price,
                type: transaction.transaction_item.type,
            },
            transaction_item_tier: {
                id: transaction.transaction_item_tier.id,
                price: transaction.transaction_item_tier.price,
                tier: transaction.transaction_item_tier.tier,
            }
        }

    });
}

export const ApiFetchTransactionItems = async (): Promise<TransactionItem[]> => {
    const url = buildUrl("/api/items")
    const response = await fetch(url);
    const responseData = await response.json();
    console.log(responseData)

    return responseData.map((item: any) => {
        return {
            type: item.type,
            name: item.name,
            price: item.price,
            id: item.id,
            tiers: item.tiers?.map((tier: any) => {
                return {
                    tier: tier.tier,
                    price: tier.price,
                    id: tier.id,
                };
            })
        }
    });
}

export const ApiFetchBalance = async (): Promise<Balance> => {
    const url = buildUrl("/api/balance")
    const response = await fetch(url);
    const responseData = await response.json();

    return {
        crystals: responseData.crystals,
        today: responseData.today,
    }

}

export const ApiAddTransaction = async (transaction: Transaction): Promise<any> => {

}

export const ApiAddTransactionItem = async (transactionItem: TransactionItem): Promise<Response> => {
    const url = buildUrl("/api/insert/item")
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionItem),
    });
    return response;
}