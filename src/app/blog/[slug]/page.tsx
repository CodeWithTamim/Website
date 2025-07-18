import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { getAllPosts, getPostBySlug, getPostStats } from '@/lib/blog'
import { MDXContent } from '@/components/mdx-content'
import { ShareButton } from '@/components/share-button'
import { type Post } from 'contentlayer/generated'
import Link from 'next/link'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post: Post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const stats = getPostStats(post.body.raw)

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['The Byte Array'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    other: {
      'article:reading_time': `${stats.readingTimeMinutes}`,
      'article:word_count': `${stats.wordCount}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const stats = getPostStats(post.body.raw)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[980px]">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="group">
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <Card className="contribute-card mb-8">
            <CardHeader className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'MMMM d, yyyy')}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{stats.readingTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{stats.wordCount.toLocaleString()} words</span>
                  </div>
                </div>
                
                <CardTitle className="text-3xl md:text-4xl font-bold leading-tight">
                  {post.title}
                </CardTitle>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
                
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <ShareButton title={post.title} />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Article Content */}
          <Card className="contribute-card mb-8">
            <CardContent className="pt-8">
              <article className="prose prose-lg dark:prose-invert max-w-none">
                <MDXContent code={post.body.code} />
              </article>
            </CardContent>
          </Card>

          {/* Article Footer */}
          <Card className="contribute-card">
            <CardContent className="pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  <p>Published on {format(new Date(post.date), 'MMMM d, yyyy')}</p>
                  <p>{stats.readingTime} • {stats.wordCount.toLocaleString()} words</p>
                </div>
                <div className="flex items-center gap-4">
                  <ShareButton title={post.title} />
                  <Button asChild>
                    <Link href="/blog">More Articles</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 