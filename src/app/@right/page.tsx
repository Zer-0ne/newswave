'use client'
import NewsCard from "@/Components/NewsCard"
import ShadowEffect from "@/Components/ShadowEffect"
import { newByKeyWords } from "@/utils/FetchFromApi"
import { newArticles } from "@/utils/Interface"
import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"

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
			<RightContent title='Technology' query='Technology'/>
		</Box>
	</>
}

const RightContent = ({title,query}:{
	title:string
	query:string
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
	}, [])
	return <Box sx={{
		mb:5
	}}>
		<Box
			sx={{
				display: 'flex'
				, justifyContent: 'space-between'
				, alignItems: 'center',
				mb:1,
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
					, justifyContent: 'space-between'
					, alignItems: 'center'
					, flexWrap: 'wrap',
					maxHeight: '60vh'
					, overflowY: 'scroll',
					p: 1
				}}
			>
				{
					data &&
					data.filter(article => article.title !== "[Removed]")?.map((item,index)=>(
						<NewsCard key={index} data={item}/>
					))
				}
			</Box>
		</ShadowEffect>
	</Box>
}

export default RightContainer;