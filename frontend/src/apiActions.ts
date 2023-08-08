import buildUrl from "./apiEndpointBuilder";
import {Transaction, TransactionItem, TransactionItemTier} from "./models";

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

export const ApiFetchBalance = async (): Promise<any> => {

}

export const ApiAddTransaction = async (transaction: Transaction): Promise<any> => {

}

export const ApiAddTransactionItem = async (transactionItem: TransactionItem): Promise<any> => {

}