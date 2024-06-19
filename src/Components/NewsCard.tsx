import { newArticles } from '@/utils/Interface'
import { colors } from '@/utils/colors'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const NewsCard = ({ data }: {
    data: newArticles
}) => {
    const dateTimeString = data?.publishedAt;
    const dateTime = new Date(dateTimeString);

    const formattedDateTime = dateTime.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(',', '');
    return (
        <>
            <Box
                sx={{
                    p: 1,
                    boxShadow: `0 0 10px ${colors.shadowColor}`,
                    borderRadius: 2,
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    // justifyContent: 'center',
                    width:'100%'
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: 70,
                        height: 70,
                        overflow: 'hidden',
                        borderRadius: '5px',
                    }}
                >
                    <Image
                        src={data?.urlToImage || '/news.png'}
                        alt='alt'
                        layout='fill' // Make the image fill the container
                        objectFit='fill' // Ensures the image covers the entire container
                    />
                </Box>
                <Box>
                    <Typography
                        sx={{
                            flex:2
                        }}
                    >
                        {data?.title}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize:12,
                            opacity:.6
                        }}
                    >{formattedDateTime}</Typography>
                </Box>
            </Box>
        </>
    )
}

export default NewsCard