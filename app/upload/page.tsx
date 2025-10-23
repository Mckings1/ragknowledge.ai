"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Upload, File, X, CheckCircle, AlertCircle, Loader } from "lucide-react"

/**
 * UploadedFile Interface
 * Represents a file being uploaded with status and progress tracking
 */
interface UploadedFile {
  id: string
  name: string
  size: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
}

/**
 * Upload Page Component
 * Drag-and-drop file upload interface with progress tracking
 * Supports batch uploads and displays processing status
 */
export default function UploadPage() {
  // Sample uploaded files with various statuses
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "AI_Research_Methods_2024.pdf",
      size: "3.2 MB",
      status: "completed",
      progress: 100,
    },
    {
      id: "2",
      name: "Neural_Networks_Guide.pdf",
      size: "2.8 MB",
      status: "completed",
      progress: 100,
    },
  ])

  const [isDragging, setIsDragging] = useState(false)

  // Handle drag over event
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  // Handle drag leave event
  const handleDragLeave = () => {
    setIsDragging(false)
  }

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop logic here
  }

  // Handle file selection from input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles) {
      // Handle file selection logic here
    }
  }

  // Remove file from list
  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  /**
   * Get status icon based on file status
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case "processing":
        return <Loader className="w-5 h-5 text-blue-400 animate-spin" />
      default:
        return <File className="w-5 h-5 text-slate-400" />
    }
  }

  /**
   * Get status badge color based on file status
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-900/30 text-green-300 border border-green-700/50"
      case "error":
        return "bg-red-900/30 text-red-300 border border-red-700/50"
      case "processing":
        return "bg-blue-900/30 text-blue-300 border border-blue-700/50"
      default:
        return "bg-slate-700/30 text-slate-300 border border-slate-600/50"
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* ===== PAGE HEADER ===== */}
        {/* Title and description */}
        <div className="border-b border-slate-700/50 bg-slate-800/40 backdrop-blur px-8 py-6 sticky top-0 z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Upload Documents</h1>
          <p className="text-slate-400">Add research papers, PDFs, and documents to your library</p>
        </div>

        {/* ===== CONTENT AREA ===== */}
        <div className="p-8 max-w-6xl">
          {/* ===== UPLOAD ZONE ===== */}
          {/* Drag-and-drop area for file uploads */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 mb-8 ${
              isDragging
                ? "border-[#9ca3af] bg-[#6b7280]/20 backdrop-blur"
                : "border-slate-600/50 bg-slate-800/40 hover:border-[#9ca3af] hover:bg-[#6b7280]/20"
            }`}
          >
            {/* Upload icon */}
            <div className="w-20 h-20 bg-[#6b7280] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Upload className="w-10 h-10 text-white" />
            </div>

            {/* Upload instructions */}
            <h3 className="text-2xl font-bold text-white mb-4">Drag and drop your files here</h3>
            <p className="text-slate-400 mb-8">or click to browse from your computer</p>

            {/* File input and select button */}
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
              accept=".pdf,.doc,.docx,.txt,.md"
            />
            <label htmlFor="file-input">
              <Button asChild className="bg-slate-600 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-lg">
                <span>Select Files</span>
              </Button>
            </label>

            {/* File format info */}
            <p className="text-xs text-slate-500 mt-6">Supported formats: PDF, DOC, DOCX, TXT, MD (Max 50MB each)</p>
          </div>

          {/* ===== UPLOADED FILES LIST ===== */}
          {/* Display uploaded files with progress and status */}
          {files.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Upload Progress</h2>
              <div className="space-y-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-200"
                  >
                    {/* File info row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Status icon */}
                        {getStatusIcon(file.status)}

                        {/* File details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate">{file.name}</h4>
                          <p className="text-xs text-slate-400 mt-1">{file.size}</p>
                        </div>
                      </div>

                      {/* Status badge and remove button */}
                      <div className="flex items-center gap-3 ml-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(file.status)}`}>
                          {file.status === "completed"
                            ? "Processed"
                            : file.status === "processing"
                              ? "Processing"
                              : file.status === "uploading"
                                ? "Uploading"
                                : "Error"}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                          className="text-slate-400 hover:text-red-400 hover:bg-slate-700/40 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Progress bar for uploading/processing files */}
                    {file.progress < 100 && (
                      <div className="w-full bg-slate-700/40 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-slate-500 to-slate-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== INFO BOX ===== */}
          {/* Tips for best results */}
          <div className="mt-8 p-6 bg-slate-700/20 backdrop-blur border border-slate-600/50 rounded-xl">
            <h3 className="font-semibold text-slate-200 mb-3">Tips for best results</h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Upload clear, readable documents for better processing</li>
              <li>• PDFs with text layers work best (avoid scanned images)</li>
              <li>• You can upload multiple files at once</li>
              <li>• All documents are processed securely and privately</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
