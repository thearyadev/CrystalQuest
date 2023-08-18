import React from 'react';
import { Transaction } from '../models';
import CrystalMiniPng from '../assets/crystal-mini.png';
import { Chip, Avatar, Typography } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const TransactionListItem = ({ transaction }: { transaction: Transaction }) => {
    const priceColor = transaction.transaction_item.type === 'decrease' ? "rgb(255, 40, 40)" : "rgb(0, 255, 108)"
    return (
        <ListItem >
            <ListItemText ><Typography variant="overline" display="block" gutterBottom>{transaction.created_at.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Typography></ListItemText>
            <ListItemText sx={{ textAlign: 'center' }}>
                <Stack direction="column">
                <Typography variant="overline" display="block" gutterBottom>
                    {transaction.transaction_item.name}
                </Typography>
                <Typography variant="subtitle2" display="block" gutterBottom sx={{color: "#F652A0"}} >
                    {transaction.transaction_item_tier?.tier}
                </Typography>
                </Stack>
            </ListItemText>
            <ListItemText>
                <Stack direction="row" spacing={1} alignItems='center' justifyContent="end">
                    <Chip label={transaction.transaction_item_tier?.price.toLocaleString()} avatar={<Avatar src={CrystalMiniPng} sx={{ width: 1, height: 1 }} />} sx={{ backgroundColor: priceColor }} />
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