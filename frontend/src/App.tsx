import { useEffect, useState } from 'react'
import './App.css'
import React from 'react'
import { TransactionItemList } from './components/transaction_item_list'
import { Box, Tab, Tabs, Typography, Backdrop } from '@mui/material';
import { TransactionItem, Transaction, Balance as CrystalBalance } from "./models"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Balance } from './components/balance'
import { ApiFetchTransactionItems, ApiFetchTransactions, ApiFetchBalance } from './apiActions'
import AddItemFloatingActionButton from './components/add_item_dialog'
import CircularProgress from '@mui/material/CircularProgress';


import { TransactionList } from './components/transaction_list'
const theme = createTheme({
  palette: {
    primary: {
      main: '#F652A0',
    },
    secondary: {
      main: '#36EEE0',
    },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanelContainer(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ height: 'calc(100vh - 300px)', overflowY: 'scroll', pt: 5, pl: 1, pr: 1 }} id='ScrollbarHiddenBox' >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [items, setItems] = useState<TransactionItem[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [crystalBalance, setCrystalBalance] = useState<CrystalBalance>({ crystals: 0 })
  const [value, setValue] = useState(0);
  const [loadingOpen, setLoadingOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState('boat');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  const reload = () => {
    handleLoadingOpen();
    Promise.all([
      ApiFetchTransactionItems(),
      ApiFetchTransactions(),
      ApiFetchBalance()
    ]).then(([items, transactions, balance]) => {
      setItems(items)
      setTransactions(transactions)
      setCrystalBalance(balance)
      handleLoadingClose();
    })
  }

  const handleLoadingClose = () => {
    setLoadingOpen(false);
  }

  const handleLoadingOpen = () => {
    setLoadingOpen(true);
  }


  useEffect(() => {

    Promise.all([
      ApiFetchTransactionItems(),
      ApiFetchTransactions(),
      ApiFetchBalance()
    ]).then(([items, transactions, balance]) => {
      setItems(items)
      setTransactions(transactions)
      setCrystalBalance(balance)
      handleLoadingClose();
    })
  }, []);


  return (
    <ThemeProvider theme={theme}>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>




      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Balance value={crystalBalance} />
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant='fullWidth'>
            <Tab label="Transactions" {...a11yProps(0)} />
            <Tab label="Buy" {...a11yProps(1)} />
            <Tab label="Earn" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanelContainer value={value} index={0}>
          <TransactionList transactions={transactions} />
        </TabPanelContainer>
        <TabPanelContainer value={value} index={1}>
          <TransactionItemList items={items} type="decrease" reloadFn={reload} />
        </TabPanelContainer>
        <TabPanelContainer value={value} index={2}>
          <TransactionItemList items={items} type="increase" reloadFn={reload} />
        </TabPanelContainer>
      </Box>
      <AddItemFloatingActionButton reloadFn={reload} />
    </ThemeProvider>
  );
}

export default App
