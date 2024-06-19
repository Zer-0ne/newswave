'use client'
import NewsCard from "@/Components/NewsCard"
import ShadowEffect from "@/Components/ShadowEffect"
import { removeNews } from "@/slice/newsSlice"
import { AppDispatch, RootState } from "@/store/store"
import { newByKeyWords } from "@/utils/FetchFromApi"
import { newArticles } from "@/utils/Interface"
import { Box, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const RightContainer = () => {
	return <>
		<Box
			sx={{
				flex: 2,
				display: { xs: 'none', md: 'flex' },
				flexDirection: 'column',
				// justifyContent: 'center',
				// maxHeight:'70vh'
			}}
		>
			{/* <RightContent title='Political' query='Political'/> */}
			<RightContent title='Technology' query='Technology' />
		</Box>
	</>
}

const RightContent = ({ title, query }: {
	title: string
	query: string
}) => {
	const [data, setData] = useState<newArticles[]>([])
	useEffect(() => {
		const fetch = async () => {
			try {
				const res = await newByKeyWords(query);
				setData(res?.articles as newArticles[])
			} catch (error) {
				console.error(error)
			}
		}
		fetch()
	}, []);
	const { news } = useSelector((state: RootState) => state.news)
	const dispatch = useDispatch<AppDispatch>()
	const fetchData = async () => {
		try {
			// If news exists, remove it first
			const { fetchNews } = await import('@/slice/newsSlice')
			if (news) {
				dispatch(removeNews());
			}

			await dispatch(fetchNews({
				action: 'query',
				query: 'technology'
			}));

		} catch (error) {
			console.log(error);
		}
	};
	return <Box sx={{
		mb: 5
	}}>
		<Box
			sx={{
				display: 'flex'
				, justifyContent: 'space-between'
				, alignItems: 'center',
				mb: 1,
			}}
		>
			<Typography
				variant="body1"
				component={'p'}
				sx={{
					fontSize: 20
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
				>{title} {' '}</Typography>
				{'  '}News
			</Typography>

			<Typography
				onClick={fetchData}
				sx={{
					fontSize: 13,
					opacity: .62,
					cursor: 'pointer'
				}}
			>See more</Typography>
		</Box>

		{/* cards */}
		<ShadowEffect>

			<Box
				sx={{
					gap: 1,
					display: 'flex'
					// , justifyContent: 'space-between'
					// , alignItems: 'center'
					, flexWrap: 'wrap',
					maxHeight: '40vh'
					, overflowY: 'scroll',
					p: 1
				}}
			>
				{
					data &&
					data.filter(article => article.title !== "[Removed]")?.map((item, index) => (
						<NewsCard key={index} data={item} />
					))
				}
			</Box>
		</ShadowEffect>

		<Box
			sx={{
				p: 1,
				display: 'flex'
				, justifyContent: 'center'
				, alignItems: 'center'
				, flexWrap: 'wrap'
				, gap: 2,
				mt: 7,
				opacity: .6
			}}
		>
			<Link href={'https://github.com/Zer-0ne/'} target="_blank">
				<Typography>Github</Typography>
			</Link>

			<Link href={'https://www.linkedin.com/in/sahil-khan-7a718a259/'} target="_blank">
				<Typography>LinkedIn</Typography>
			</Link>
			<Link href={'https://leetcode.com/u/sahil_khan_5/'} target="_blank">
				<Typography>LeetCode</Typography>
			</Link>
		</Box>
		<Typography
			sx={{
				mt: 1,
				fontWeight: '700'
				, fontSize: 14,
				opacity: .6,
				mx: 'auto'
				, textAlign: 'center'
			}}
		>Sahil Khan</Typography>
	</Box>
}

export default RightContainer;