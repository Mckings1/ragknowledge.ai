"use client"

import { useState } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Trash2, Search, Clock } from "lucide-react"

interface ChatSession {
  id: string
  title: string
  preview: string
  date: string
  messageCount: number
  sources: number
}

export default function ChatHistoryPage() {
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Neural Networks Research",
      preview: "What are the key findings about neural networks?",
      date: "Today at 2:30 PM",
      messageCount: 12,
      sources: 3,
    },
    {
      id: "2",
      title: "Machine Learning Fundamentals",
      preview: "Explain the difference between supervised and unsupervised learning",
      date: "Yesterday at 10:15 AM",
      messageCount: 8,
      sources: 2,
    },
    {
      id: "3",
      title: "Data Science Best Practices",
      preview: "What are the best practices for data preprocessing?",
      date: "2 days ago",
      messageCount: 15,
      sources: 5,
    },
    {
      id: "4",
      title: "AI Ethics Discussion",
      preview: "How should we approach ethical considerations in AI?",
      date: "1 week ago",
      messageCount: 20,
      sources: 4,
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSessions = chatSessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-slate-800 px-8 py-6 sticky top-0 z-10">
          <h1 className="text-3xl font-bold text-white mb-4">Chat History</h1>
          <div className="flex gap-3 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Chat Sessions Grid */}
        <div className="p-8">
          {filteredSessions.length > 0 ? (
            <div className="grid gap-4">
              {filteredSessions.map((session) => (
                <Link key={session.id} href={`/chat?session=${session.id}`}>
                  <Card className="p-6 bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                            {session.title}
                          </h3>
                          <p className="text-sm text-slate-400 mt-1 line-clamp-2">{session.preview}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-red-400 hover:bg-slate-700 flex-shrink-0 ml-2"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.date}
                      </div>
                      <div>{session.messageCount} messages</div>
                      <div>{session.sources} sources</div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-300 mb-2">No conversations found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search or start a new conversation</p>
              <Link href="/chat">
                <Button className="bg-blue-600 hover:bg-blue-700">Start New Chat</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
