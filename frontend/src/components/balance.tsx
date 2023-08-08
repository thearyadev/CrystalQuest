import React from 'react';
import CrystalSvg from '../assets/crystal.png';
import { Stack } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

export const Balance = ({ value }: { value: number }) => {
    return (
        <Tooltip title="369 Crystals Earned Today!" placement='top'>

            <Stack direction="row" spacing={1} alignItems='center'>
                <img className='crystal-icon' src={CrystalSvg} />
                <h1 className='crystal-balance'>{value}</h1>
            </Stack>
        </Tooltip>
    )
}