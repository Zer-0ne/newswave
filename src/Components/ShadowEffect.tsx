import { Box } from '@mui/material'
import React from 'react'

const ShadowEffect = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                ':after': {
                    content: '""',
                    position: 'absolute',
                    zIndex: 2,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 17,
                    background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
                },
                ':before': {
                    content: '""',
                    position: 'absolute',
                    zIndex: 2,
                    right: 0,
                    top: 0,
                    // backdropFilter:'blur(16px) saturate(180%)',
                    left: 0,
                    height: 17,
                    background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
                },
            }}
        >
            {children}
        </Box>
    )
}

export default ShadowEffect