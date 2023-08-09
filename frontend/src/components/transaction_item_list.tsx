import React from 'react';
import { Transaction, TransactionItem } from '../models';
import CrystalMiniPng from '../assets/crystal-mini.png';
import { Chip, Avatar, Typography } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton, Stack, ButtonGroup, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import TierSelectButton from './dropdown_button';


interface TransactionItemListProps {
    items: TransactionItem[];
    type: string;
    reloadFn: () => void;
}


const TransactionItemListItem = ({ item, reloadFn }: { item: TransactionItem, reloadFn: () => void }) => {
    return (
        <ListItem >
            <ListItemText sx={{ textAlign: 'left' }}><Typography variant="overline" display="block" gutterBottom>{item.name}</Typography></ListItemText>
            {/* <ButtonGroup size="small" variant="contained" aria-label="large button group outlined">
                {item?.tiers?.map((tier) => (<Button key={tier.id}>
                    {tier.tier}: {tier.price}
                </Button>))}
            </ButtonGroup> */}
            <TierSelectButton tiers={item.tiers || []} reloadFn={reloadFn} item={item}/>
        </ListItem>
    )
}



export const TransactionItemList = ({ items, type, reloadFn }: TransactionItemListProps) => {
    return (
        <List
            sx={{ width: '100%' }}
            aria-label="transactions"
        >
            {
                items.filter((item) => item.type === type).map((item) => (
                    <TransactionItemListItem item={item} key={item.id} reloadFn={reloadFn} />
                ))
            }
        </List>
    )
}