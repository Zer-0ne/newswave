import { newArticles } from '@/utils/Interface'
import { colors } from '@/utils/colors'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from '@/utils/styles'

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

    const [isIntersecting, setIsIntersecting] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5 // Trigger when 50% of the card is visible
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);
    return (
        <Link href={data.url} target='_blank' style={{display:'flex',width:'100%'}} >
            <Box
                ref={cardRef}
                sx={{
                    p: 1,
                    boxShadow: `0 0 10px ${colors.shadowColor}`,
                    borderRadius: 2,
                    ...styles.hoverEffect, transform: isIntersecting ? 'scale(1)' : 'scale(0.9)',
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    // justifyContent: 'center',
                    width: '100%',
                    flex:1
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
                            flex: 2
                        }}
                    >
                        {data?.title}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 12,
                            opacity: .6
                        }}
                    >{formattedDateTime}</Typography>
                </Box>
            </Box>
        </Link>
    )
}

export default NewsCard