import React from 'react';
import CrystalSvg from '../assets/crystal.png';
import { Stack, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Balance as CrystalBalance } from '../models';
import { useEffect, useState } from 'react';

export const Balance = ({ value }: { value: CrystalBalance }) => {

    return (

        <Stack direction="row" spacing={1} alignItems='center' sx={{display: "flex", maxWidth: "100%", overflow: "hidden"}}>
            <img className='crystal-icon' src={CrystalSvg} />
            <Typography variant='h2' sx={{flexShrink: 1, whiteSpace: "nowrap"} }>
                {value.crystals.toLocaleString()}
            </Typography>
        </Stack>
    )
}

