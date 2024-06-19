export interface Articles {
    status: string;
    totalResult: number;
    articles: newArticles[]
}

export interface newArticles {
    author: string
    content: string
    description: string
    publishedAt: string
    source: { id: string | null, name: string }
    title: string
    url: string
    urlToImage: string
}