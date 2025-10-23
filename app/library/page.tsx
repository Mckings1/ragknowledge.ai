"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Trash2, Search, Download, Share2, MoreVertical } from "lucide-react"

/**
 * Document Interface
 * Represents a document in the library with metadata
 */
interface Document {
  id: string
  title: string
  size: string
  uploadDate: string
  pages: number
  tags: string[]
}

/**
 * Library Page Component
 * Document management interface with search, filtering, and grid/list view options
 * Allows users to organize, download, and manage their research documents
 */
export default function LibraryPage() {
  // Sample documents with metadata
  const [documents] = useState<Document[]>([
    {
      id: "1",
      title: "AI_Research_Methods_2024.pdf",
      size: "3.2 MB",
      uploadDate: "2 hours ago",
      pages: 45,
      tags: ["AI", "Research", "Methods"],
    },
    {
      id: "2",
      title: "Neural_Networks_Guide.pdf",
      size: "2.8 MB",
      uploadDate: "1 day ago",
      pages: 38,
      tags: ["Neural Networks", "Deep Learning"],
    },
    {
      id: "3",
      title: "Machine_Learning_Fundamentals.pdf",
      size: "4.1 MB",
      uploadDate: "3 days ago",
      pages: 52,
      tags: ["Machine Learning", "Fundamentals"],
    },
    {
      id: "4",
      title: "Data_Science_Best_Practices.pdf",
      size: "2.5 MB",
      uploadDate: "1 week ago",
      pages: 31,
      tags: ["Data Science", "Best Practices"],
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  // Filter documents based on search query
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* ===== PAGE HEADER ===== */}
        {/* Title, search, and view mode toggle */}
        <div className="border-b border-slate-700/50 bg-slate-800/40 backdrop-blur px-8 py-6 sticky top-0 z-10">
          <h1 className="text-3xl font-bold text-white mb-6">Document Library</h1>

          {/* Search and filter controls */}
          <div className="flex gap-3 items-center">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="pl-10 bg-slate-700/40 border-slate-600/50 text-white placeholder:text-slate-500 rounded-lg focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            {/* View mode toggle buttons */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-slate-600 text-white"
                    : "border-slate-600/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 bg-transparent"
                }
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-slate-600 text-white"
                    : "border-slate-600/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 bg-transparent"
                }
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* ===== DOCUMENTS DISPLAY ===== */}
        {/* Grid or list view of documents */}
        <div className="p-8">
          {filteredDocuments.length > 0 ? (
            viewMode === "grid" ? (
              // Grid view
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-200 group"
                  >
                    {/* Document header with icon and menu */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center group-hover:bg-slate-500 transition-colors">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 rounded-lg"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Document title */}
                    <h3 className="font-semibold text-white mb-3 line-clamp-2 group-hover:text-slate-200 transition-colors">
                      {doc.title}
                    </h3>

                    {/* Document metadata */}
                    <div className="space-y-2 mb-4 text-sm text-slate-400">
                      <p>{doc.pages} pages</p>
                      <p>{doc.size}</p>
                      <p>Uploaded {doc.uploadDate}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-700/40 text-xs text-slate-300 rounded border border-slate-600/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-600/50 text-slate-300 hover:text-slate-100 hover:bg-slate-700/40 bg-transparent rounded-lg"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-600/50 text-slate-300 hover:text-slate-100 hover:bg-slate-700/40 bg-transparent rounded-lg"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List view
              <div className="space-y-3">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl p-4 hover:border-slate-600/50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      {/* Document info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate hover:text-slate-200 transition-colors">
                            {doc.title}
                          </h3>
                          <div className="flex gap-4 text-xs text-slate-400 mt-1">
                            <span>{doc.pages} pages</span>
                            <span>{doc.size}</span>
                            <span>Uploaded {doc.uploadDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 flex-shrink-0 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 rounded-lg"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 rounded-lg"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-red-400 hover:bg-slate-700/40 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            // Empty state
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-300 mb-2">No documents found</h3>
              <p className="text-slate-400">Start by uploading your first research document</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
