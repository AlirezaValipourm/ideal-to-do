import { Box, IconButton } from '@mui/material';
import React, { FC, ReactNode } from 'react'
import MUIModal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
interface IModalProps {
    open: boolean,
    children: ReactNode,
    onClose: VoidFunction
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    p: 5,
};

export const Modal: FC<IModalProps> = ({ children, onClose, open }) => {
    return (
        <MUIModal
            open={open}
            onClose={onClose}

        >
            <Box sx={style}>
                <Box style={{ position: "relative" }}>

                    <IconButton onClick={onClose} style={{ position: "absolute", top: "-35px", right: "-30px" }}>
                        <CloseIcon />
                    </IconButton>
                    {children}
                </Box>
            </Box>
        </MUIModal>)
}
