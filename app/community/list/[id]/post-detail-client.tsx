"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Flag, ThumbsUp, ThumbsDown, Eye } from "lucide-react"
import Header from "@/components/header"

export default function PostDetailClient({
  id,
  post,
  comments: initialComments,
}: {
  id: string
  post: any
  comments: any[]
}) {
  const router = useRouter()

  const [commentText, setCommentText] = useState("")
  const [comments] = useState(initialComments)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const [isReportConfirmOpen, setIsReportConfirmOpen] = useState(false)
  const [isReportDoneOpen, setIsReportDoneOpen] = useState(false)

  const handleBack = () => router.push("/community/list")

  const handleLike = () => {
    setLiked(!liked)
    if (disliked) setDisliked(false)
  }

  const handleDislike = () => {
    setDisliked(!disliked)
    if (liked) setLiked(false)
  }

  const openReportConfirm = () => setIsReportConfirmOpen(true)
  const cancelReport = () => setIsReportConfirmOpen(false)
  const confirmReport = () => {
    setIsReportConfirmOpen(false)
    setIsReportDoneOpen(true)
  }
  const closeReportDone = () => setIsReportDoneOpen(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-4 max-w-3xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleBack} className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold text-foreground">{post.stockName}</h1>
          </div>
        </div>

        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                  <AvatarFallback>{post.author?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-foreground">{post.author}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.time}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground hover:bg-transparent hover:text-red-600"
                onClick={openReportConfirm}
              >
                <Flag className="h-4 w-4" />
                <span className="text-xs">신고하기</span>
              </Button>
            </div>

            <h2 className="text-xl font-bold text-foreground mb-4">{post.title}</h2>
            <div className="text-sm text-foreground leading-relaxed whitespace-pre-line mb-6">{post.content}</div>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <Button variant={liked ? "default" : "outline"} size="sm" onClick={handleLike} className="gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.likes + (liked ? 1 : 0)}</span>
              </Button>
              <Button variant={disliked ? "default" : "outline"} size="sm" onClick={handleDislike} className="gap-2">
                <ThumbsDown className="h-4 w-4" />
                <span>{post.dislikes + (disliked ? 1 : 0)}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-2">
            <Textarea
              placeholder="댓글을 입력하세요"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-3 min-h-[50px] resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
            />
            <div className="flex justify-end">
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                댓글 작성
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3 mb-6">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} alt={comment.author} />
                      <AvatarFallback>{comment.author?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">{comment.time}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-muted-foreground hover:bg-transparent hover:text-red-600"
                    onClick={openReportConfirm}
                  >
                    <Flag className="h-4 w-4" />
                    <span className="text-xs">신고하기</span>
                  </Button>
                </div>

                <p className="text-sm text-foreground ml-12 mb-2">{comment.content}</p>
                <div className="flex items-center gap-3 ml-12 text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span className="text-xs">{comment.likes ?? 0}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <ThumbsDown className="h-3.5 w-3.5" />
                    <span className="text-xs">{comment.dislikes ?? 0}</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <a
          href="https://www.fss.or.kr/fss/main/sub1Unfair.do?menuNo=200080"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 text-sm font-medium border-2 border-destructive text-destructive hover:text-destructive-foreground bg-transparent text-center rounded-md"
        >
          불법 주식리딩방 금융감독원 신고 국번없이 1332
        </a>

        {isReportConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[90%] max-w-sm rounded-lg bg-white p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-foreground">신고하시겠습니까?</h2>
              <p className="mt-2 text-sm text-muted-foreground">신고가 접수되면 운영 정책에 따라 검토됩니다.</p>
              <div className="mt-5 flex justify-center gap-2">
                <Button variant="outline" onClick={cancelReport}>취소</Button>
                <Button onClick={confirmReport} className="bg-blue-500 hover:bg-blue-600 text-white">확인</Button>
              </div>
            </div>
          </div>
        )}

        {isReportDoneOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[90%] max-w-sm rounded-lg bg-white p-6 shadow-lg">
              <h2 className="text-m font-semibold text-foreground">신고가 접수됐습니다</h2>
              <div className="mt-5 flex justify-end">
                <Button onClick={closeReportDone} className="bg-blue-500 hover:bg-blue-600 text-white">확인</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}