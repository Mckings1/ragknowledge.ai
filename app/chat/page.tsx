"use client"

import { useState, useEffect, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Loader2 } from "lucide-react"

// ============================
// Message Interface
// ============================
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: Array<{ title: string; pages: string }>
  isLoading?: boolean
}

// ============================
// Chat Component
// ============================
const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your Research AI Assistant. Upload your documents and ask me questions about them. I’ll provide clear answers with source references.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // ============================
  // Auto-scroll to latest message
  // ============================
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // ============================
  // Handle Sending Message
  // ============================
  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setInput("")
    setIsLoading(true)

    // =======================================
    // Simulate AI response (mock)
    // =======================================
    // TODO: Replace this section with a real Azure AI call later:
    // Example: call Azure Function or Semantic Kernel endpoint here
    //
    // const response = await fetch("/api/ask", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ query: input }),
    // })
    // const data = await response.json()
    //
    // Then use: data.answer, data.sources, etc.
    // =======================================

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? {
                ...msg,
                isLoading: false,
                content:
                  "Based on your uploaded research documents, I found relevant insights. Would you like me to expand on this topic or show related references?",
                sources: [
                  { title: "AI_Research_Methods_2024.pdf", pages: "Pages 10-14" },
                  { title: "Neural_Networks_Guide.pdf", pages: "Pages 3-8" },
                ],
              }
            : msg
        )
      )
      setIsLoading(false)
    }, 1500)
  }

  // ============================
  // JSX Render
  // ============================
  return (
    <div className="flex h-screen background from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Chat Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ===== Header ===== */}
        <div className="border-b border-slate-700/50 bg-[#4b5563]/30 backdrop-blur px-8 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Research Chat</h1>
          <p className="text-slate-400 mb-4">Ask questions about your uploaded documents</p>
        </div>

        {/* ===== Messages ===== */}
        <div className="flex-1 overflow-auto p-8 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-2xl ${
                  message.role === "user"
                    ? "bg-[#6b7280] text-white rounded-2xl rounded-tr-none"
                    : "bg-[#4b5563]/60 backdrop-blur text-slate-100 rounded-2xl rounded-tl-none border border-[#6b7280]/50"
                } p-6`}
              >
                {/* Message Content */}
                {message.isLoading ? (
                  <div className="flex gap-2 items-center">
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                    <span className="text-sm text-slate-400">Analyzing documents...</span>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                )}

                {/* Sources */}
                {!message.isLoading && message.sources && message.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-600/50">
                    <p className="text-xs font-semibold text-slate-300 mb-3">Sources:</p>
                    <div className="space-y-2">
                      {message.sources.map((src, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 bg-slate-700/30 rounded border border-slate-600/30"
                        >
                          <div className="w-2 h-2 bg-slate-400 rounded-full flex-shrink-0"></div>
                          <p className="text-xs text-slate-400 truncate">
                            {src.title} — <span className="text-slate-500">{src.pages}</span>
                          </p>
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

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* ===== Input Section ===== */}
        <div className="border-t border-slate-700/50 bg-[#4b5563]/30 backdrop-blur p-6">
          <div className="max-w-4xl mx-auto flex gap-3">
            {/* Attach button */}
            <Button
              variant="outline"
              size="icon"
              className="border-slate-600/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 bg-transparent flex-shrink-0 rounded-lg"
            >
              <Paperclip className="w-5 h-5" />
            </Button>

            {/* Input */}
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question about your documents..."
              className="bg-slate-700/40 border-slate-600/50 text-white placeholder:text-slate-500 rounded-lg focus:border-slate-500 focus:ring-slate-500"
            />

            {/* Send button */}
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-[#6b7280] hover:bg-[#5a6370] text-white flex-shrink-0 rounded-lg disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
