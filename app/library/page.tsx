"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Search, Eye, Download, Trash2, Plus } from "lucide-react"
import Link from "next/link"

interface Document {
  id: number
  title: string
  uploadDate: string
  size: string
  pages: number
  tags: string[]
  progress: number
}

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const documents: Document[] = [
    {
      id: 1,
      title: "Advanced_Neural_Networks_2024.pdf",
      uploadDate: "March 15, 2024",
      size: "4.2 MB",
      pages: 89,
      tags: ["neural-networks", "deep-learning", "research"],
      progress: 98,
    },
    {
      id: 2,
      title: "Machine_Learning_Fundamentals.docx",
      uploadDate: "March 12, 2024",
      size: "2.8 MB",
      pages: 48,
      tags: ["machine-learning", "fundamentals"],
      progress: 100,
    },
    {
      id: 3,
      title: "Research_Methodology_Guide.txt",
      uploadDate: "March 10, 2024",
      size: "245 KB",
      pages: 12,
      tags: ["methodology", "guide"],
      progress: 100,
    },
  ]

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* ===== SIDEBAR ===== */}
      <Sidebar />

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 overflow-auto">
        <div className="border-b border-slate-700/50 bg-slate-800/40 backdrop-blur px-8 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Document Library</h1>
          <p className="text-slate-400 mb-4">Manage and organize your research documents</p>

          {/* Upload Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-fit bg-[#4b5563]/40 backdrop-blur border border-[#6b7280]/50 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">3 documents stored</span>
            </div>

            <Link href="/upload">
              <Button className="gap-2 bg-[#6b7280] hover:bg-[#5a6370] text-white rounded-lg">
                <Plus className="w-4 h-4" />
                Upload New
              </Button>
            </Link>
          </div>
        </div>

        {/* ===== SEARCH BAR ===== */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 rounded-lg focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              All Types
            </Button>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              Sort by Date
            </Button>
          </div>

          <p className="text-sm text-slate-400 mb-6">
            Showing {filteredDocuments.length} of {documents.length} documents
          </p>

          {/* ===== DOCUMENT LIST ===== */}
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-500 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-[#6b7280]/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#9ca3af]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2 text-white truncate">{doc.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
                      <span>Uploaded on {doc.uploadDate}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.pages} pages</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded bg-slate-700/40 text-xs font-medium text-slate-300 border border-slate-600/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all"
                          style={{ width: `${doc.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-green-400">
                        {doc.progress}% Processed
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-2">
                      <Eye className="w-4 h-4" /> View
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-2">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-red-700/50 hover:text-red-300 gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===== PAGINATION ===== */}
          <div className="mt-10 flex justify-center gap-2">
            <Button variant="outline" disabled className="border-slate-700 text-slate-400">
              Previous
            </Button>
            <Button className="bg-[#6b7280] hover:bg-[#5a6370] text-white">1</Button>
            <Button variant="outline" className="border-slate-700 text-slate-400">
              2
            </Button>
            <Button variant="outline" className="border-slate-700 text-slate-400">
              3
            </Button>
            <Button variant="outline" className="border-slate-700 text-slate-400">
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
