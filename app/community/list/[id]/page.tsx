import Header from "@/components/header"
import PostDetailClient from "./post-detail-client"

import { POSTS, getCommentsByPostId, getPostById } from "@/app/data/community"

export function generateStaticParams() {
  return POSTS.map((p) => ({ id: String(p.id) }))
}

export const dynamicParams = false

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const postId = Number(id)

  const post = getPostById(postId)
  const comments = getCommentsByPostId(postId)

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 max-w-3xl">
          <p className="text-center text-muted-foreground">해당 게시글을 찾을 수 없습니다.</p>
        </main>
      </div>
    )
  }

  return <PostDetailClient post={post} comments={comments} />
}