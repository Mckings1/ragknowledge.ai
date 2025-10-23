"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Plus } from "lucide-react";
import Link from "next/link";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "processing" | "completed";
  uploadedAt: string;
}

export default function LibraryPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [query, setQuery] = useState("");

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

  // optional: keep reading localStorage periodically to reflect progress happening on Upload page in another tab
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

  const filtered = files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex h-screen background from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />

      <main className="flex-1 overflow-auto ">
        <div className="border-b border-slate-700/50 bg-[#4b5563]/30 backdrop-blur px-8 py-6 sticky top-0 z-10">
          <h1 className="text-3xl font-bold text-white mb-2 ">Document Library</h1>
          <p className="text-slate-400 mb-4">Saved documents for your knowledge base.</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="text-sm text-slate-300">{files.length} documents stored</div>
            </div>

            <Link href="/upload">
              <Button className="gap-2 bg-slate-700 hover:bg-[#0f1115] text-white rounded-lg">
                <Plus className="w-4 h-4" /> Upload New
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex gap-4 mb-8 ">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documents..."
                className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 rounded-lg focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filtered.length === 0 ? (
              <p className="text-slate-500 text-center">No documents found.</p>
            ) : (
              filtered.map((f) => (
                <div key={f.id} className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-500 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-700/40 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-slate-300" />
                    </div>

                    <div className="flex-1">
                      <p className="text-white font-semibold mb-2 truncate">{f.name}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${f.status === "completed" ? "bg-green-500" : "bg-blue-500"}`}
                            style={{ width: `${f.progress}%` }}
                          />
                        </div>
                        <span className={`text-xs ${f.status === "completed" ? "text-green-400" : "text-blue-300"}`}>
                          {f.progress}% {f.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-slate-400 text-sm">{f.size}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
