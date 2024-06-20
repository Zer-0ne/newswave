'use client'
import { colors } from '@/utils/colors'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { categories } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { removeNews } from '@/slice/newsSlice';

const Navbar = () => {
    return (
        <>
            <Box
                sx={{
                    bgcolor: 'white',
                    padding: 1.5,
                    boxShadow: '0 0 10px black'
                    , position: 'sticky',
                    paddingX: 3,
                    justifyContent: 'space-between',
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: { md: 'row', xs: 'column', xl: 'row' }
                    , gap: 1,
                    top: 0,
                    zIndex: 100
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 900,
                        fontSize: 20,
                        fontStyle: 'italic',
                        px: .2
                    }}
                    className='gradient-text'
                >
                    NewsWave
                </Typography>
                <Categories />
                <SearchBar />
            </Box>
        </>
    )
}


const SearchBar = () => {
    const [query, setQuery] = useState<string | undefined>();
    const { news } = useSelector((state: RootState) => state.news);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const fetch = async () => {
        try {
            const { fetchNews } = await import('@/slice/newsSlice');

            if (query === '' || !query) {
                setIsEmpty(true);
                return;
            }
            if (news) {
                dispatch(removeNews());
            }

            if (query) {
                await dispatch(fetchNews({
                    action: (query === 'all') ? 'headline' : 'query',
                    query: encodeURIComponent(query),
                    heading: query
                }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (query === '' || !query) {
                setIsEmpty(true);
                return;
            }
            fetch();
        }
    };

    return (
        <Box
            sx={{
                padding: 1,
                paddingX: 2,
                background: colors.searchBarBg,
                borderRadius: 2,
                display: 'flex',
                position: { xs: 'absolute', md: 'relative' },
                right: { xs: 10, md: 0 },
                top: { xs: 100, md: 0 },
                left: { xs: 10, md: 0 },
                justifyContent: 'space-between',
                alignItems: 'center',
                border: (isEmpty) ? '1px solid red' : 'none',
                ':before': {
                    content: '""',
                    position: 'absolute',
                    inset: -2,
                    borderRadius: 2.6,
                    background: isFocused ? 'linear-gradient(270deg, #ff3300, #04ff00, #3700ff, #00e5ff, #ea00ff, #8400ff)' : 'none',
                    backgroundSize: '600% 600%',
                    animation: isFocused ? 'gradientBorder 3s ease infinite' : 'none',
                    zIndex: -1
                }
            }}
        >
            <input
                placeholder='Search...'
                onChange={(e) => { (query !== '') && setIsEmpty(false); setQuery(e.target.value as string); }}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                    background: 'transparent',
                    outline: 'none',
                    border: 'none',
                    flex: 1
                }}
            />
            <SearchIcon
                onClick={fetch}
                sx={{
                    fontSize: 18,
                    fontWeight: '800',
                    cursor: 'pointer'
                }}
            />
        </Box>
    );
};


const Categories = () => {
    const { news } = useSelector((state: RootState) => state.news)
    const [query, setQuery] = useState<{
        query: string;
        label: string
    } | undefined>()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const fetch = async () => {
            try {
                // If news exists, remove it first
                const { fetchNews } = await import('@/slice/newsSlice')
                if (news) {
                    dispatch(removeNews());
                }

                // Then fetch new news

                if (query) {
                    await dispatch(fetchNews({
                        action: (query?.query == 'all') ? 'headline' : 'query',
                        query: query?.query,
                        heading: query?.label || ""
                    }));
                }
            } catch (error) {
                console.log(error);
            }
        };

        (query) && fetch()
    }, [query])
    return <>
        <Box
            sx={{
                position: 'relative',
                // bgcolor:'red',
                ':after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 17,
                    background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.45710784313725494) 100%)',
                },
                ':before': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: 17,
                    background: 'linear-gradient(277deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.45710784313725494) 100%)',
                },
                maxWidth: { md: '60%', xs: '100%' },
            }}
        >

            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'scroll',
                    gap: 3,
                    alignItems: 'self-start',
                    justifyContent: 'flex-start',
                    // flex:3
                    paddingX: 2
                }}
            >
                {
                    categories.map((item, index) => (
                        <Typography
                            onClick={() => { setQuery(item) }}
                            key={index}
                            style={{
                                cursor: 'pointer',
                                // flex:2,
                                whiteSpace: 'nowrap',
                                textTransform: 'capitalize'
                            }}
                        >{item.label}</Typography>
                    ))
                }
            </Box>
        </Box>
    </>
}
export default Navbar