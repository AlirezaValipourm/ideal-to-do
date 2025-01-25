import Add from '@mui/icons-material/Add'
import { Box, Button, Typography } from '@mui/material'
import { format } from 'date-fns'
import React, { FC } from 'react'

interface ITodoHeaderProps {
    title: string;
    date: Date;
    onNewTaskClick: VoidFunction
}

export const TodoHeader: FC<ITodoHeaderProps> = ({ date, title, onNewTaskClick }) => {
    return (
        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
                <Typography variant='h4'>{title}</Typography>
                <Typography variant='body2' style={{ color: "hsla(0, 0%, 62%, 1)" }}>{format(date, "EEEE , dd LLLL")}</Typography>
            </Box>
            <Button variant='contained' style={{ display: "flex", gap: "10px" }} onClick={onNewTaskClick}>
                <Add style={{ fontSize: "18px" }} />
                <Typography variant='button'>New Task</Typography>
            </Button>
        </Box>
    )
}
