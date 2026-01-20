"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, MessageCircle, PenSquare } from "lucide-react"
import Header from "@/components/header"
import Link from "next/link"

import { POSTS } from "@/app/data/community"

export default function CommunityPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)

  const hotPosts = POSTS.filter((p) => p.isHot)
  const regularPosts = POSTS.filter((p) => !p.isHot)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 2, Math.max(hotPosts.length - 2, 0)))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 2, 0))
  }

  const visiblePosts = hotPosts.slice(currentIndex, currentIndex + 2)

  const handlePostClick = (id: number) => {
    router.push(`/community/list/${id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Link href="/community">
          <button className="px-1 py-4 md:py-2 text-gray-400 font-medium text-[13px] transition hover:text-gray-600 hover:underline">
            ← 전체 종목 커뮤니티 보기
          </button>
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-10 mt-5 text-center">
          <span className="text-blue-600">삼성전자</span> 커뮤니티
        </h1>

        {/* 인기 게시글 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">인기 게시글</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="h-8 w-8 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                disabled={currentIndex >= hotPosts.length - 2}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visiblePosts.map((post) => (
              <Card
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:bg-red-50"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.time}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <h3 className="text-base font-bold text-foreground mb-2 line-clamp-1">
                    {post.isHot ? `🔥HOT ${post.title}` : post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.content}</p>

                  <div className="flex items-center gap-4 text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <ThumbsDown className="h-4 w-4" />
                      <span className="text-sm">{post.dislikes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">전체 게시글</h2>
          <div className="space-y-3">
            {regularPosts.map((post) => (
              <Card
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="cursor-pointer hover:shadow-lg transition-colors hover:bg-sky-50"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-foreground">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.time}</p>
                        </div>

                        <h3 className="text-sm font-bold text-foreground mb-1 line-clamp-1">
                          {post.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 whitespace-pre-line">
                          {post.content}
                        </p>

                        <div className="flex items-center gap-4 text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span className="text-xs">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                            <ThumbsDown className="h-3.5 w-3.5" />
                            <span className="text-xs">{post.dislikes}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span className="text-xs">{post.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          onClick={() => router.push("/community/list/write")}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white"
        >
          <PenSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}