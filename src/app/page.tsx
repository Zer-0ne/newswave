'use client'
import { AppDispatch, RootState, } from "@/store/store";
import { newArticles } from "@/utils/Interface";
import { colors } from "@/utils/colors";
import { newsChannels } from "@/utils/constant";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { styles } from "@/utils/styles";
import dynamic from 'next/dynamic'

const HeadlineCard = dynamic(() => import('@/Components/HeadlineCard'))
const Loading = dynamic(() => import('@/Components/Loading'))
const ShadowEffect = dynamic(() => import('@/Components/ShadowEffect'))


export default function Home() {
	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		const fetch = async () => {
			try {
				const { fetchNews, } = await import('@/slice/newsSlice')
				dispatch(fetchNews({
					action: "headline",
					query: '',
					heading: ''
				}))
			} catch (error) {
				console.log(error)
			}
		}
		fetch()
	}, [])

	return (
		<>
			<MainContainer />
		</>
	);
}


export const LeftContainer = () => {
	const { news } = useSelector((state: RootState) => state.news)
	const [newsChannelsQuery, setNewsChannelsQuery] = useState<string | undefined>(undefined)
	const [heading, setHeading] = useState<string>('')
	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		const fetch = async () => {
			try {
				// If news exists, remove it first
				const { fetchNews, removeNews } = await import('@/slice/newsSlice')
				if (news) {
					dispatch(removeNews());
				}

				// Then fetch new news
				if (newsChannelsQuery) {
					await dispatch(fetchNews({
						action: 'source',
						query: newsChannelsQuery,
						heading
					}));
				}
			} catch (error) {
				console.log(error);
			}
		};

		(newsChannelsQuery) && fetch()
	}, [newsChannelsQuery])

	return <>
		<Box
			sx={{
				display: { md: 'none', xl: 'flex', xs: 'none' },
				mt: 3,
				// flex: 1,
				boxShadow: `0 0 10px ${colors.shadowColor}`,
				overflow: 'hidden',
				borderRadius: 3
			}}
		>
			<Box
				sx={{
					p: { md: 1, xs: 0 },
					py: { md: 0, xs: 1 },
					display: 'block',
					flex: 1
				}}
			>

				<Typography
					variant="body1"
					component={'p'}
					sx={{
						fontSize: 20,
						p: 1,
					}}
				>
					<Typography
						variant="h2"
						component={'h2'}
						sx={{
							display: 'inline-flex'
							, fontSize: 20,
							fontWeight: '700'
						}}
					>News {' '}</Typography>
					{'  '}Channels
				</Typography>

				<ShadowEffect>

					<Box
						sx={{
							p: { md: 1, xs: 0 },
							py: { md: 0, xs: 1 },
							maxHeight: '70vh'
							, overflowY: 'scroll'
						}}
					>
						{
							newsChannels.map((item, index) => (
								<>
									<Typography
										onClick={() => { setNewsChannelsQuery(item.id); setHeading(item.name) }}
										sx={{
											p: .5,
											...styles.hoverEffect,
											cursor: 'pointer'
										}} key={index} >{`${index + 1}.`} {" "}{item.name} </Typography>
								</>
							))
						}
					</Box>
				</ShadowEffect>

			</Box>

		</Box>
	</>
}

export const MainContainer = () => {
	const { news, loading, error, heading } = useSelector((state: RootState) => state.news)
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 20; // Number of items per page
	const totalItems = news.length; // Total number of items

	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const renderPagination = () => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					style={{ fontWeight: currentPage === i ? 'bold' : 'normal' }}
				>
					{i}
				</button>
			);
		}
		return pages;
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

	// New array of items for demonstration

	const paginatedItems = news.slice(startIndex, endIndex);

	return <>
		<Container sx={{
			flex: 3,
			// maxWidth:'900px !important',
			height: 'auto',
			maxWidth: { xs: '100%' },
			px: { xs: 0.5, md: 1 }
			// bgcolor: 'red',
		}}>
			<Box>

				<Typography
					variant="body1"
					component={'p'}
					sx={{
						fontSize: 25, mb: 1
					}}
				>
					<Typography
						variant="h2"
						component={'h2'}
						sx={{
							display: 'inline-flex'
							, fontSize: 25,
							fontWeight: '700'
						}}
					>{heading ? heading : 'Today\'s'} {' '}</Typography>
					{'  '}{(heading === '') && "Headlines"}
				</Typography>

				{/* cards */}
				<ShadowEffect>
					<Box
						sx={{
							gap: { md: 2, xs: 2 },
							display: 'flex'
							, justifyContent: 'center'
							, alignItems: 'center'
							, flexWrap: 'wrap',
							overflowY: 'scroll',
							maxHeight: { md: '75vh', xs: '74vh' },
						}}
					>
						{loading ? (
							<Loading /> // Show loading indicator
						) : news && news?.length ? (
							(paginatedItems as newArticles[])?.map((item, index) => (
								<HeadlineCard key={index} data={item} />
							))
						) :
							!loading &&
							<Typography
								sx={{
									color: 'red',
									fontWeight: '700',
									fontSize: 23
								}}
							>
								No news found!
							</Typography>
						}
						{
							error &&
							<Typography
								sx={{
									color: 'red',
									fontWeight: '700',
									fontSize: 23
								}}
							>
								Something went wrong!
							</Typography>
						}
						<Box
							sx={{
								my: 2,
								mb: 3,
								display: 'flex'
								, justifyContent: 'center'
								, alignItems: 'center'
								, gap: 2
								, maxWidth: '100%',
								minWidth: '70%'
							}}
						>
							{renderPagination()}
						</Box>
					</Box>
				</ShadowEffect>

			</Box>

		</Container>
	</>
}