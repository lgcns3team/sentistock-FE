"use client"

interface Article {
  id: number
  title: string
  url: string
  score: number
}

interface RelatedArticlesProps {
  articles: Article[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-4">관련 기사</h3>
      <div className="space-y-3">
        {articles.map((article) => (
          <div key={article.id} className="pb-3 border-b border-gray-200 last:border-b-0">
            <p className="text-xs sm:text-sm text-gray-900 font-medium mb-1 line-clamp-2">{article.title}</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 hover:underline truncate"
              >
                {article.url}
              </a>
              <span className="text-xs sm:text-sm font-semibold text-blue-600 whitespace-nowrap">
                {article.score}점
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
