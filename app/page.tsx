"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, Zap, Target, FileText, MessageSquare, UploadCloud, Play } from "lucide-react"

/**
 * Home Page Component
 * Main landing page featuring hero section, feature cards, recent activity, and quick actions
 * Uses glass morphism design with dark theme
 */
export default function Home() {
  // Sample recent activity data - in production, this would come from an API
  const [recentActivity] = useState([
    {
      id: 1,
      type: "document",
      title: "AI_Research_Methods_2024.pdf",
      date: "Uploaded 2 hours ago",
      size: "3.2 MB",
      pages: "127 pages",
      status: "Processed",
      statusColor: "bg-green-600",
    },
    {
      id: 2,
      type: "chat",
      title: '"What are the key findings about neural networks?"',
      date: "Asked 1 hour ago",
      sources: "3 sources referenced",
      status: "Answered",
      statusColor: "bg-[#4b5563]/30",
    },
  ])

  return (
    <div className="flex h-screen background from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {/* ===== HERO SECTION ===== */}
        {/* Large banner with headline, subheading, and call-to-action buttons */}
        <section className="border-b border-slate-800 background from-slate-900 via-slate-800 to-slate-900">
  <div className="max-w-6xl mx-auto px-8 py-16">
    <div className="text-center max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-6xl font-bold text-white mb-6">
        Your private research assistant
      </h1>
      <p className="text-xl text-slate-300 mb-10 leading-relaxed">
        Transform your research workflow with AI that understands your documents. Get precise answers, discover
        insights, and accelerate your research process.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/upload">
          <Button
            size="lg"
            className="bg-[#6b7280] hover:bg-[#5a6370] text-white font-semibold px-8 py-4 rounded-xl flex items-center gap-3 shadow-lg"
          >
            <UploadCloud className="w-5 h-5" />
            Upload Documents
          </Button>
        </Link>
        <Button
          size="lg"
          variant="outline"
          className="border-[#6b7280] text-white hover:bg-[#4b5563]/50 bg-[#4b5563]/30 font-semibold px-8 py-4 rounded-xl flex items-center gap-3"
        >
          <Play className="w-5 h-5" />
          Watch Demo
        </Button>
      </div>
    </div>
  </div>
</section>
        {/* ===== FEATURES SECTION ===== */}
        {/* Three feature cards highlighting key benefits */}
        <section className="px-8 py-16 border-b border-slate-800">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
            {/* Feature 1: Privacy */}
            <div className="glass-card rounded-2xl p-8 bg-[#4b5563]/30 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all duration-200">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">100% Private</h3>
              <p className="text-slate-300 leading-relaxed">
                Your documents never leave your control. All processing happens securely within your environment.
              </p>
            </div>

            {/* Feature 2: Speed */}
            <div className="glass-card rounded-2xl p-8 bg-[#4b5563]/30 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all duration-200">
              <div className="w-16 h-16 bg-[#6b7280] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-slate-300 leading-relaxed">
                Get instant answers from thousands of pages. Advanced indexing makes search incredibly fast.
              </p>
            </div>

            {/* Feature 3: Accuracy */}
            <div className="glass-card rounded-2xl p-8 bg-[#4b5563]/30 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all duration-200">
              <div className="w-16 h-16 bg-[#4b5563] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Precise Results</h3>
              <p className="text-slate-300 leading-relaxed">
                Every answer includes citations and source references for complete transparency and accuracy.
              </p>
            </div>
          </div>
        </section>

        {/* ===== RECENT ACTIVITY SECTION ===== */}
        {/* Shows recent uploads and chat interactions */}
        <section className="px-8 py-16 border-b border-slate-800">
          <div className="max-w-6xl">
            {/* Section header with "View All" link */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Recent Activity</h2>
              <Link
                href="/chat"
                className="text-slate-400 hover:text-slate-300 flex items-center gap-2 font-medium"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Activity items list */}
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-xl p-6 bg-[#4b5563]/30 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all duration-200 flex items-center justify-between"
                >
                  {/* Activity icon and details */}
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-12 h-12 ${item.type === "document" ? "bg-red-600" : "bg-[#4b5563]/30"} rounded-xl flex items-center justify-center`}
                    >
                      {item.type === "document" ? (
                        <FileText className="w-6 h-6 text-white" />
                      ) : (
                        <MessageSquare className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-400">{item.date}</p>
                      {item.type === "document" && (
                        <p className="text-xs text-slate-500 mt-1">
                          {item.size} • {item.pages}
                        </p>
                      )}
                      {item.type === "chat" && <p className="text-xs text-slate-500 mt-1">{item.sources}</p>}
                    </div>
                  </div>

                  {/* Status badge */}
                  <span className={`${item.statusColor} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== QUICK ACTIONS SECTION ===== */}
        {/* Two prominent action cards for common tasks */}
        <section className="px-8 py-16">
          <div className="max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-8">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Quick Upload Card */}
              <Link href="/upload">
                <div className="glass-card rounded-2xl p-8 bg-[#4b5563]/30 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all duration-200 cursor-pointer h-full">
                  <div className="w-12 h-12 bg-[#6b7280] rounded-xl flex items-center justify-center mb-6">
                    <UploadCloud className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Quick Upload</h3>
                  <p className="text-slate-300 mb-6">Drag and drop your research documents to get started instantly.</p>
                  <Button variant="outline" className="border-[#1b1d22] text-white hover:bg-[#0f1115] bg-transparent">
                    Choose Files
                  </Button>
                </div>
              </Link>

              {/* Smart Search Card */}
              <Link href="/chat">
                <div className="glass-card rounded-2xl p-8 bg-[#4b5563]/30 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all duration-200 cursor-pointer h-full">
                  <div className="w-12 h-12 bg-[#4b5563] rounded-xl flex items-center justify-center mb-6">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Smart Search</h3>
                  <p className="text-slate-300 mb-6">
                    Ask questions in natural language and get precise answers with citations.
                  </p>
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-[#0f1115] bg-transparent">
                    Start Searching
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
