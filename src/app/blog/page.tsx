import { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { getAllPosts, getPostStats } from '@/lib/blog'
import { type Post } from 'contentlayer/generated'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest blog posts and updates - Insights, tutorials, and thoughts on open-source software development and privacy-focused technologies.',
  openGraph: {
    title: 'Blog - The Byte Array',
    description: 'Latest blog posts and updates from The Byte Array team.',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[980px]">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              Insights, tutorials, and thoughts on open-source software development, 
              privacy-focused technologies, and the future of digital innovation.
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-8 md:gap-10">
            {posts.map((post: Post) => {
              const stats = getPostStats(post.body.raw)
              return (
                <Card key={post.slug} className="contribute-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
                      <div className="hidden sm:flex items-center gap-2">
                        <span className="text-xs">{stats.wordCount.toLocaleString()} words</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
                      <Link href={post.url} className="hover:underline">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base md:text-lg leading-relaxed">
                      {post.description}
                    </CardDescription>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
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
                    
                    <div className="pt-4">
                      <Link 
                        href={post.url} 
                        className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
                      >
                        Continue reading
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-20">
              <Card className="contribute-card">
                <CardContent className="pt-8">
                  <div className="mb-6">
                    <svg className="mx-auto h-16 w-16 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">No posts yet</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We&apos;re working on some amazing content. Check back soon for insightful articles 
                    and tutorials on software development and privacy-focused technologies!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 