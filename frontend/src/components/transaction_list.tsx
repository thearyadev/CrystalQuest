import React from 'react';
import { Transaction } from '../models';
import CrystalMiniPng from '../assets/crystal-mini.png';
import { Chip, Avatar } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const TransactionListItem = ({ transaction }: { transaction: Transaction }) => {
    const priceColor = transaction.transaction_item.type === 'decrease' ? "rgb(255, 40, 40)" : "rgb(0, 255, 108)"
    return (
        <ListItem >
            <ListItemText secondary={transaction.created_at.toLocaleString()} />
            <ListItemText primary={transaction.transaction_item.name + " - " + transaction.transaction_item_tier?.tier}  sx={{ textAlign: 'center' }} />
            <ListItemText>
                <Stack direction="row" spacing={1} alignItems='center' justifyContent="end">
                    <Chip label={transaction.transaction_item_tier?.price} avatar={<Avatar src={CrystalMiniPng} sx={{ width: 1, height: 1 }} />} sx={{backgroundColor: priceColor}}  />
                </Stack>
            </ListItemText>
        </ListItem>
    )
}



export const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
    return (
        <List
            sx={{ width: '100%' }}
            aria-label="transactions"
        >
            {transactions.map((transaction) => (
                <TransactionListItem transaction={transaction} key={transaction.id} />
            ))}
        </List>
    )
}