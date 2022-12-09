import { Paper } from '@mui/material'
import React from 'react'

interface IProps {
    children: React.ReactNode
}

const Item = ({ children }: IProps) => {
    return (
        <Paper
            sx={{
                spacing: 10,
                my: 1, p: 2,
                display: 'flex',
                flexDirection: 'column',
                lineHeight: 2,
                wordBreak: 'break-word'
            }}
            elevation={2}
        >
            {children}
        </Paper>
    )
}

export default Item