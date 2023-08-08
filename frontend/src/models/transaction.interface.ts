import { TransactionItem } from './transaction_item.interface';
import { TransactionItemTier } from './transaction_item_tier.interface';

export interface Transaction {
    created_at: Date;
    transaction_item: TransactionItem;
    transaction_item_tier?: TransactionItemTier | null;
    id?: number | null;
}