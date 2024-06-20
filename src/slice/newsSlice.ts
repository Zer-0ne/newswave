import { getHeadlines, newByKeyWords, source } from "@/utils/FetchFromApi";
import { Articles, newArticles } from "@/utils/Interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type FetchNewsParams = {
    action: 'headline' | 'query' | 'source';
    query: string;
    heading: string;
};

export const fetchNews = createAsyncThunk('session', async (params: FetchNewsParams, thunkApi) => {
    const { action, query, heading } = params;

    const fetchData = {
        headline: await getHeadlines() as Articles,
        query: await newByKeyWords(query) as Articles,
        source: await source(query) as Articles
    };

    const news = fetchData[action];

    if (!news) return {
        news: [],
        heading: ''
    };

    return {
        news: news.articles.filter(article => article.title !== "[Removed]").filter(article => article.urlToImage !== null) as newArticles[],
        heading
    };
});

const initialState = {
    news: [] as newArticles[],
    loading: false,
    error: null,
    heading: ''
} as any

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        removeNews: (state) => {
            state.news = []
            state.loading = false
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.news = [];
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload?.news as newArticles[];
                state.heading = action.payload.heading as string;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch news';
            });
    }
})
export const { removeNews } = newsSlice.actions;
export default newsSlice.reducer