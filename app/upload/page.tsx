"use client";

import { useState, useRef } from "react";
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
  id: number;
  name: string;
  progress: number;
  status: "processing" | "complete";
}

export default function Upload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map(
      (file, index) => ({
        id: Date.now() + index,
        name: file.name,
        progress: 0,
        status: "processing" as const,
      })
    );

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 15;
        if (progress >= 100) {
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? { ...f, progress: 100, status: "complete" }
                : f
            )
          );
          toast.success(`${file.name} uploaded successfully!`);
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, progress } : f))
          );
        }
      }, 300);
    });
  };

  const openFilePicker = () => {
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
    <div className="flex min-h-screen background from-[#0b0b0b] via-[#111] to-[#181818] text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-white/10 bg-[#4b5563]/30 backdrop-blur-md px-8 py-6 sticky top-0 z-10">
          <h1 className="text-3xl font-bold mb-2">Upload Documents</h1>
          <p className="text-gray-400">
            Add files to your research library. Supported: PDF, DOCX, TXT, MD.
          </p>
        </div>

        {/* Content area */}
        <div className="p-8 max-w-5xl mx-auto ">
          {/* Upload zone */}
          <div
            className={`mb-8 p-12 rounded-xl border-2 border-dashed transition-all cursor-pointer glass ${
              isDragging
                ? "border-white/30 bg-white/10"
                : "border-white/10 hover:border-white/20 bg-white/5"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={openFilePicker}
          >
            <div className="text-center ">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UploadIcon className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2 ">
                Drop files here or click to browse
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Maximum file size: 50MB per file • Batch upload supported
              </p>

              <Button onClick={openFilePicker} className="upload-btn bg-[#6b7280] hover:bg-[#5a6370] text-white font-semibold">
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

          {/* Metadata */}
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

          {/* Upload progress */}
          {files.length > 0 && (
            <div className="p-6 rounded-xl glass">
              <h3 className="text-lg font-semibold mb-4">Upload Progress</h3>
              <div className="space-y-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white/5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-gray-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium truncate">{file.name}</p>
                        <div className="flex items-center gap-2">
                          {file.status === "complete" ? (
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
                                {file.progress}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            file.status === "complete"
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
