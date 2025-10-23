"use client"

import { useState, useRef, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Loader } from "lucide-react"

/**
 * Message Interface
 * Defines the structure of chat messages with role, content, and optional sources
 */
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: string[]
}

/**
 * Chat Page Component
 * Interactive chat interface for asking questions about uploaded documents
 * Features message history, source citations, and real-time typing indicators
 */
export default function ChatPage() {
  // Initial welcome message from the assistant
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your Research AI Assistant. Upload documents and ask me questions about them. I'll provide precise answers with citations from your sources.",
      timestamp: new Date(),
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  /**
   * Handle sending a message
   * Adds user message to chat, simulates AI response with sources
   */
  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response with delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Based on the documents you've uploaded, I found relevant information. The key findings suggest that this topic is important for your research. Would you like me to provide more specific details or search for related information?",
        timestamp: new Date(),
        sources: ["AI_Research_Methods_2024.pdf", "Neural_Networks_Guide.pdf"],
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* ===== CHAT HEADER ===== */}
        {/* Title and status indicator showing active documents */}
        <div className="border-b border-slate-700/50 bg-slate-800/40 backdrop-blur px-8 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Research Chat</h1>
          <p className="text-slate-400 mb-4">Ask questions about your uploaded documents</p>

          {/* Status badge showing number of active documents */}
          <div className="flex items-center gap-2 w-fit bg-[#4b5563]/40 backdrop-blur border border-[#6b7280]/50 px-4 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">12 documents active</span>
          </div>
        </div>

        {/* ===== MESSAGES CONTAINER ===== */}
        {/* Scrollable area displaying chat history */}
        <div className="flex-1 overflow-auto p-8 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {/* Message bubble with role-specific styling */}
              <div
                className={`max-w-2xl ${
                  message.role === "user"
                    ? "bg-[#6b7280] text-white rounded-2xl rounded-tr-none"
                    : "bg-[#4b5563]/60 backdrop-blur text-slate-100 rounded-2xl rounded-tl-none border border-[#6b7280]/50"
                } p-6`}
              >
                {/* Message content */}
                <p className="text-sm leading-relaxed">{message.content}</p>

                {/* Source citations for assistant messages */}
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-600/50">
                    <p className="text-xs font-semibold text-slate-300 mb-3">Sources:</p>
                    <div className="space-y-2">
                      {message.sources.map((source, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 bg-slate-700/30 rounded border border-slate-600/30"
                        >
                          <div className="w-2 h-2 bg-slate-400 rounded-full flex-shrink-0"></div>
                          <p className="text-xs text-slate-400">{source}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamp */}
                <p className="text-xs text-slate-400 mt-3 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {/* Loading indicator - animated dots while waiting for response */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/60 backdrop-blur text-slate-100 rounded-2xl rounded-tl-none border border-slate-700/50 p-6">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* ===== INPUT AREA ===== */}
        {/* Message input field with attachment and send buttons */}
        <div className="border-t border-slate-700/50 bg-slate-800/40 backdrop-blur p-6">
          <div className="max-w-4xl mx-auto flex gap-3">
            {/* Attachment button */}
            <Button
              variant="outline"
              size="icon"
              className="border-slate-600/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 bg-transparent flex-shrink-0 rounded-lg"
            >
              <Paperclip className="w-5 h-5" />
            </Button>

            {/* Message input field */}
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask a question about your documents..."
              className="bg-slate-700/40 border-slate-600/50 text-white placeholder:text-slate-500 rounded-lg focus:border-slate-500 focus:ring-slate-500"
            />

            {/* Send button */}
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-[#6b7280] hover:bg-[#5a6370] text-white flex-shrink-0 rounded-lg disabled:opacity-50"
            >
              {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
