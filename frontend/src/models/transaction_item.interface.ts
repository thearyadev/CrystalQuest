import { TransactionItemTier } from './transaction_item_tier.interface';

export interface TransactionItem {
    type: string;
    name: string;
    price: number;
    id?: number | null;
    tiers?: TransactionItemTier[] | null;
}
