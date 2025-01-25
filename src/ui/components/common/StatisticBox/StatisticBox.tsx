import { Box, Divider } from '@mui/material'
import React, { FC } from 'react'
import { CategoryChip } from './CategoryChip'
import { Category } from '@idealToDo/data/types/Category.type'

interface IStatisticBoxProps {
    onCategorySelect: (category: Category) => void,
    activeCategory: string
    categoryData: {
        all: number,
        open: number,
        closed: number,
        archived: number,
    }
}

export const StatisticBox: FC<IStatisticBoxProps> = ({ onCategorySelect, categoryData, activeCategory }) => {

    return (
        <Box style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            <CategoryChip label='All' value={categoryData.all.toString()} onClick={() => onCategorySelect("All")} active={activeCategory == "All"} />
            <Divider style={{ border: "1px solid hsla(0, 0%, 62%, 1)" }} />
            <CategoryChip label='Open' value={categoryData.open.toString()} onClick={() => onCategorySelect("Open")} active={activeCategory == "Open"} />
            <CategoryChip label='Closed' value={categoryData.closed.toString()} onClick={() => onCategorySelect("Closed")} active={activeCategory == "Closed"} />
            <CategoryChip label='Archived' value={categoryData.archived.toString()} onClick={() => onCategorySelect("Archived")} active={activeCategory == "Archived"} />
        </Box>)
}
