"use client";

import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Upload as UploadIcon,
  FileText,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  title?: string;
  tags?: string[];
  size: string;
  uploadedAt: string;
  pages: number;
  progress: number;
  status: "uploading" | "processing" | "completed";
}

export default function Upload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const storedFiles = localStorage.getItem("uploadedFiles");
    if (storedFiles) {
      try {
        setFiles(JSON.parse(storedFiles));
      } catch (e) {
        console.error("Failed to parse uploadedFiles", e);
      }
    }
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      localStorage.setItem("uploadedFiles", JSON.stringify(files));
    }
  }, [files]);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles)
      .filter((file) => {
        if (file.size > 50 * 1024 * 1024) {
          toast.error(`${file.name} exceeds 50MB limit`);
          return false;
        }
        return true;
      })
      .map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        title: title || file.name,
        tags: tags ? tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString(),
        pages: Math.floor(Math.random() * 50) + 1,
        progress: 0,
        status: "uploading" as const,
      }));

    if (newFiles.length === 0) return;

    setFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 15;
        if (progress >= 100) {
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? { ...f, progress: 100, status: "completed" }
                : f
            )
          );
          toast.success(`${file.name} uploaded successfully!`);
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? { ...f, progress, status: progress < 50 ? "uploading" : "processing" }
                : f
            )
          );
        }
      }, 300);
    });

    setTitle("");
    setTags("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFilePicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#0b0b0b] via-[#111] to-[#181818] text-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="border-b border-white/10 bg-[#4b5563]/30 backdrop-blur-md px-8 py-6 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Upload Documents</h1>
            <p className="text-gray-400">
              Add files to your research library. Supported: PDF, DOCX, TXT, MD.
            </p>
          </div>
        </div>
        <div className="p-8 max-w-5xl mx-auto">
          <div
            className={`mb-8 p-12 rounded-xl border-2 border-dashed transition-all cursor-pointer bg-white/5 ${
              isDragging
                ? "border-white/30 bg-white/10"
                : "border-white/10 hover:border-white/20"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UploadIcon className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Drop files here or click to browse
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Maximum file size: 50MB per file • Batch upload supported
              </p>
              <Button
                onClick={openFilePicker}
                className="bg-[#6b7280] hover:bg-[#5a6370] text-white font-semibold"
              >
                Select Files
              </Button>
              <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                multiple
                className="hidden"
                accept=".pdf,.docx,.txt,.md"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">
                Document Title (Optional)
              </label>
              <Input
                placeholder="Enter document title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Tags (Optional)
              </label>
              <Input
                placeholder="research, methodology, analysis"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
          {files.length > 0 && (
            <div className="p-6 rounded-xl bg-white/5">
              <h3 className="text-lg font-semibold mb-4">Upload Progress</h3>
              <div className="space-y-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white/10"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-gray-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium truncate">
                          {file.title || file.name}
                        </p>
                        <div className="flex items-center gap-2">
                          {file.status === "completed" ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-green-400 font-medium">
                                Indexed
                              </span>
                            </>
                          ) : (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                              <span className="text-sm text-gray-400 font-medium">
                                {file.progress}% {file.status}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            file.status === "completed"
                              ? "bg-green-400"
                              : "bg-gray-400"
                          }`}
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}