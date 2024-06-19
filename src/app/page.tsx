'use client'
import { AppDispatch, RootState, } from "@/store/store";
import { newArticles } from "@/utils/Interface";
import { colors } from "@/utils/colors";
import { newsChannels } from "@/utils/constant";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
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
					query: ''
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
						query: newsChannelsQuery
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
					p: 1,
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
							p: 1,
							maxHeight: '70vh'
							, overflowY: 'scroll'
						}}
					>
						{
							newsChannels.map((item, index) => (
								<>
									<Typography
										onClick={() => setNewsChannelsQuery(item.id)}
										sx={{
											p: .5,
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
	const { news, loading, error } = useSelector((state: RootState) => state.news)


	return <>
		<Container sx={{
			flex: 3,
			// maxWidth:'900px !important',
			height: 'auto',
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
					>Today's {' '}</Typography>
					{'  '}Headlines
				</Typography>

				{/* cards */}
				<ShadowEffect>
					<Box
						sx={{
							gap: 3,
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
							(news as newArticles[])?.map((item, index) => (
								<HeadlineCard key={index} data={item} />
							))
						) : (
							<Typography
								sx={{
									color: 'red',
									fontWeight: '700',
									fontSize: 23
								}}
							>
								No news found!
							</Typography>
						)}
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
					</Box>
				</ShadowEffect>

			</Box>

		</Container>
	</>
}