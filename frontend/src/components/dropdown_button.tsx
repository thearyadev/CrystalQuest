import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { TransactionItemTier } from '../models';
import { ApiAddTransaction } from '../apiActions';
import { Transaction, TransactionItem } from '../models';

// const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

const TierSelectButton = ({ item, tiers, reloadFn }: {item: TransactionItem, tiers: TransactionItemTier[], reloadFn: () => void }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleClick = () => {
        console.info(`You clicked ${tiers[selectedIndex].tier} at price ${tiers[selectedIndex].price}`);
        const transaction: Transaction = {
            transaction_item: item,
            transaction_item_tier: tiers[selectedIndex],
            created_at: new Date(),
        }

        console.log(transaction.transaction_item.type)


        ApiAddTransaction(transaction).then(() => {
            reloadFn();
        })
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button onClick={handleClick}>{tiers[selectedIndex]?.tier || tiers[0].tier} ({tiers[selectedIndex]?.price || tiers[0].price})</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {tiers.map((tier: TransactionItemTier, index) => (
                                        <MenuItem
                                            key={tier.id}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {tier.tier}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}
export default TierSelectButton;