"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Eye, Download, Trash2, Plus } from "lucide-react";
import Link from "next/link";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "processing" | "completed";
  uploadedAt: string;
  title?: string;
  tags?: string[];
  pages?: number;
}

export default function LibraryPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [query, setQuery] = useState("");
  const [fileType, setFileType] = useState("All Types");
  const [sortBy, setSortBy] = useState("Date");
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;

  useEffect(() => {
    const json = localStorage.getItem("uploadedFiles");
    if (json) {
      try {
        setFiles(JSON.parse(json));
      } catch (e) {
        console.error("Failed to parse uploadedFiles", e);
      }
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const json = localStorage.getItem("uploadedFiles");
      if (!json) return;
      try {
        const parsed: UploadedFile[] = JSON.parse(json);
        setFiles(parsed);
      } catch {
        // ignore
      }
    }, 750);
    return () => clearInterval(id);
  }, []);

  const handleDelete = (id: string) => {
    setFiles((prev) => {
      const updatedFiles = prev.filter((f) => f.id !== id);
      localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
      return updatedFiles;
    });
  };

  const filteredFiles = files
    .filter((f) =>
      (f.name.toLowerCase().includes(query.toLowerCase()) ||
        (f.tags && f.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())))) &&
      (fileType === "All Types" || f.name.toLowerCase().endsWith(fileType.toLowerCase().replace(" ", "")))
    )
    .sort((a, b) => {
      if (sortBy === "Date") {
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      } else if (sortBy === "Name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredFiles.length / filesPerPage);
  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * filesPerPage,
    currentPage * filesPerPage
  );

  return (
    <div className="flex h-screen background from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="border-b border-slate-700/50 bg-[#4b5563]/30 backdrop-blur px-8 py-6 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Document Library</h1>
            <p className="text-slate-400 mb-4">Saved documents for your knowledge base.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="text-sm text-slate-300">{filteredFiles.length} documents stored</div>
              </div>
              <Link href="/upload">
                <Button className="gap-2 bg-slate-700 hover:bg-[#0f1115] text-white rounded-lg">
                  <Plus className="w-4 h-4" /> Upload New
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documents or tags..."
                className="pl-10 bg-[#4b5563]/30 border-slate-700/50 text-white placeholder:text-slate-500 rounded-lg focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="bg-[#4b5563]/30 border-slate-700/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option>All Types</option>
              <option>PDF</option>
              <option>DOCX</option>
              <option>TXT</option>
              <option>MD</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#4b5563]/30 border-slate-700/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option>Date</option>
              <option>Name</option>
            </select>
          </div>
          <div className="mb-6">
            <p className="text-sm text-slate-500">
              Showing {paginatedFiles.length} of {filteredFiles.length} documents
            </p>
          </div>
          <div className="space-y-4">
            {paginatedFiles.length === 0 ? (
              <p className="text-slate-500 text-center">No documents found.</p>
            ) : (
              paginatedFiles.map((f) => (
                <div
                  key={f.id}
                  className="p-6 rounded-xl bg-[#4b5563]/30 border border-slate-700/50 hover:border-slate-500 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-700/40 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-slate-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-lg mb-2 truncate">
                        {f.title || f.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
                        <span>Uploaded on {new Date(f.uploadedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{f.size}</span>
                        {f.pages && (
                          <>
                            <span>•</span>
                            <span>{f.pages} pages</span>
                          </>
                        )}
                      </div>
                      {f.tags && f.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {f.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded bg-slate-700/50 text-xs font-medium text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${f.status === "completed" ? "bg-green-500" : "bg-blue-500"}`}
                            style={{ width: `${f.progress}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            f.status === "completed" ? "text-green-400" : "text-blue-300"
                          }`}
                        >
                          {f.progress}% {f.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="gap-2 bg-slate-700 hover:bg-slate-600 text-white"
                        asChild
                      >
                        <a href={`/view/${f.id}`} target="_blank">
                          <Eye className="w-4 h-4" /> View
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="gap-2 bg-slate-700 hover:bg-slate-600 text-white"
                        asChild
                      >
                        <a href={`#`} download={f.name}>
                          <Download className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="gap-2 bg-slate-700 hover:bg-red-600 text-white"
                        onClick={() => handleDelete(f.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <Button
                variant="secondary"
                className="bg-slate-700 hover:bg-slate-600 text-white"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant="secondary"
                  className={`${
                    currentPage === page
                      ? "bg-slate-600 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="secondary"
                className="bg-slate-700 hover:bg-slate-600 text-white"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}