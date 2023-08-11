import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Fab, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { TransactionItem, TransactionItemTier } from '../models';
import { ApiAddTransactionItem } from '../apiActions';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#4C5270',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddItemFloatingActionButton = ({ reloadFn }: { reloadFn: () => void }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // form
  const [type, setType] = React.useState('');
  const [name, setName] = React.useState('');
  const [tiers, setTiers] = React.useState<TransactionItemTier[]>([]);
  const [activeTierName, setActiveTierName] = React.useState('');
  const [activeTierPrice, setActiveTierPrice] = React.useState(0);
  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleAddTier = () => {
    // push a tier to the tiers array
    setTiers((prevTiers) => [
      ...prevTiers,
      {
        tier: activeTierName,
        price: activeTierPrice
      }
    ])
    setActiveTierName("");
    setActiveTierPrice(0);
  }

  const handleActivePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(event.target.value);
    if (price > -1 ){
      setActiveTierPrice(price);
    }
    
  }

  const submitForm = () => {
    if (name === "" || tiers.length === 0 || type === "") {
      console.log("invalid form")
      return 
    }
    const transactionItem: TransactionItem = {
      type: type,
      name: name,
      tiers: tiers,
      price: 0
    }
    // do api call
    ApiAddTransactionItem(transactionItem).then((response) => {
      if (response.status === 200) {
        reloadFn();
        handleClose();
        setType("");
        setName("");
        setTiers([]);
        setActiveTierName("");
        setActiveTierPrice(0);
        
      }else{
        
      }
    })
    
  }

  return (
    <div>
      <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: '25px', right: '25px' }} onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Add an Item
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="select-type-label" sx={{ color: 'white' }}>Type</InputLabel>
            <Select
              labelId="select-type-label"
              id="select-type"
              value={type}
              label="Type"
              onChange={handleTypeChange}
              sx={{ color: 'white', mb: 2 }}
            >
              <MenuItem value={'increase'}>Earnable</MenuItem>
              <MenuItem value={'decrease'}>Spendable</MenuItem>
            </Select>

            <TextField
              required
              id="outlined-required"
              label="Name"
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ sx: { color: 'white' } }}
              onChange={handleNameChange}
              sx={{ color: "white", mb: 2 }}
            />

            <Typography variant='h6' component="h6" sx={{ mb: 2 }}>Add Tiers</Typography>
            {
              tiers.map((tier, index) => (
                <Stack direction="row" spacing={2} sx={{mb: 2, }}>
                  <TextField
                    id="outlined-disabled"
                    defaultValue={tier.tier}
                    InputProps={{ style: { color: 'white' }, readOnly: true }}
                    sx={{ }}
                  />
                  <TextField
                    id="outlined-disabled"
                    defaultValue={tier.price}
                    InputProps={{ style: { color: 'white' }, readOnly: true }}
                    type='number'
                    sx={{ color: "white" }}
                  />
                </Stack>

              ))
            }
            <Divider sx={{ m: 2 }} />
            <Stack direction="row" spacing={2}>
              <TextField
                id="outlined-disabled"
                InputProps={{ style: { color: 'white' } }}
                value={activeTierName}
                sx={{ mb: 2, color: "white" }}
                onChange={(e) => setActiveTierName(e.target.value)}
              />
              <TextField
                id="outlined-disabled"
                InputProps={{ style: { color: 'white' } }}
                type='number'
                value={activeTierPrice}
                sx={{ mb: 2, color: "white" }}
                onChange={handleActivePriceChange}
              />
            </Stack>
            <Button onClick={handleAddTier}>Add Tier</Button>
            <Button onClick={submitForm}>Submit</Button>

          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}

export default AddItemFloatingActionButton