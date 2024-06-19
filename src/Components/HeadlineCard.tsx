import { colors } from '@/utils/colors'
import { Box, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { newArticles } from '@/utils/Interface';
import { styles } from '@/utils/styles';
import Link from 'next/link';

const HeadlineCard = ({ data }: {
    data: newArticles
}) => {
    const dateTimeString = data.publishedAt;
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
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Link href={data.url} style={{ display: 'flex', width: matches ? '95%' : '100%' }}>
            <Box
                ref={cardRef}
                sx={{
                    minWidth: { md: '95%', xs: '99%' },
                    padding: 1,
                    flex: 1,
                    position: 'relative',
                    boxShadow: '0 0 10px #80808054',
                    margin: 1,
                    ...styles.hoverEffect,
                    transform: isIntersecting ? 'scale(1)' : 'scale(0.9)',
                    borderRadius: 5,
                    overflow: 'hidden', // Ensures the image fits within the rounded corners
                    height: 'auto', // Adjust height automatically
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: '56.25%', // This makes a 16:9 aspect ratio container
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        src={data?.urlToImage || '/news.png'}
                        alt='alt'
                        layout='fill' // Make the image fill the container
                        objectFit='cover' // Ensures the image covers the entire container
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '13px'
                        }}
                    />

                </Box>

                <Box
                    sx={{
                        paddingTop: 2,
                        paddingX: 3,
                        marginX: 'auto',
                        display: 'flex'
                        , justifyContent: 'space-between'
                        , alignItems: 'center',
                        flexWrap: 'wrap'
                    }}
                >
                    {
                        data.author &&
                        <Typography
                            sx={{
                                fontSize: 9,
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                padding: .5,
                                paddingX: 2,
                                bgcolor: colors.newsCompanyBg
                                , color: colors.newsCompanyBtnColor,
                                borderRadius: 5,
                                cursor: 'pointer',
                            }}
                        >{data.author}</Typography>
                    }

                    <Box
                        sx={{
                            gap: 2,
                            display: 'flex'
                            , alignItems: 'center'
                            , justifyContent: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                gap: 1,
                                display: 'flex'
                                , alignItems: 'center'
                                , justifyContent: 'center'
                            }}
                        >
                            <Typography sx={{
                                fontSize: 12,
                                fontWeight: '600',
                                opacity: 0.6
                            }}>
                                {formattedDateTime}
                            </Typography>
                        </Box>


                    </Box>

                </Box>
                <Typography
                    variant='h3'
                    component={'h3'}
                    sx={{
                        paddingX: 1.5,
                        fontSize: 20,
                        paddingY: 1,
                        fontWeight: '700'
                    }}
                >{data.title}</Typography>
            </Box>
        </Link>
    )
}

export default HeadlineCard
