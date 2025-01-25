import { Box, Chip, Typography } from '@mui/material';
import React, { FC } from 'react'

interface ICategoryChipProps {
    label: string;
    active?: boolean;
    onClick: VoidFunction;
    value: string;
}

export const CategoryChip: FC<ICategoryChipProps> = ({ active, label, onClick, value }) => {
    return (
        <Box onClick={onClick} style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
            <Typography variant='body2' style={{ color: active ? "hsla(218, 97%, 51%, 1)" : "hsla(0, 0%, 62%, 1)" }}>{label}</Typography>
            <Chip label={value} style={{ height: "15px", padding: "0", backgroundColor: active ? "hsla(218, 97%, 51%, 1)" : "" }} />
        </Box>
    )
}
