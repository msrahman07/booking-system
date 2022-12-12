import { Box, Modal } from '@mui/material';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { closeModal, modalContent, modalState } from '../stores/modalStore';

const CommonModal = () => {
    const open = useAppSelector(modalState);
    const content = useAppSelector(modalContent);
    const dispatch = useAppDispatch();

    const handleClose = () => dispatch(closeModal());
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='modal'>
                {content}
            </Box>

        </Modal>
    )
}

export default CommonModal