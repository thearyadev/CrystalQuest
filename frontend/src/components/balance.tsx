import React from 'react';
import CrystalSvg from '../assets/crystal.png';
import { Stack } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Balance as CrystalBalance } from '../models';
import { useEffect, useState } from 'react';

export const Balance = ({ value }: { value: CrystalBalance }) => {

    return (

        <Stack direction="row" spacing={1} alignItems='center'>
            <img className='crystal-icon' src={CrystalSvg} />
            <h1 className={`crystal-balance`}>
                {value.crystals.toLocaleString()}
            </h1>
        </Stack>
    )
}