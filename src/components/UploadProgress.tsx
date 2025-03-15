import React, { useState, useEffect } from "react";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { AlertCircle, CheckCircle, FileWarning } from "lucide-react";

interface UploadProgressProps {
  progress?: number;
  status?: "idle" | "uploading" | "success" | "error";
  fileName?: string;
  fileSize?: number;
  errorMessage?: string;
}

const UploadProgress = ({
  progress = 0,
  status = "idle",
  fileName = "document.pdf",
  fileSize = 1024 * 1024 * 2.5, // 2.5MB default
  errorMessage = "An error occurred during upload",
}: UploadProgressProps) => {
  const [displayProgress, setDisplayProgress] = useState(progress);

  // Format file size to human-readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    if (bytes < 1024 * 1024 * 1024)
      return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
  };

  // Animate progress when uploading
  useEffect(() => {
    if (status === "uploading") {
      setDisplayProgress(progress);
    } else if (status === "success") {
      setDisplayProgress(100);
    }
  }, [progress, status]);

  return (
    <div className="w-full p-4 rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileWarning className="h-5 w-5 text-gray-500" />
          <span className="font-medium truncate max-w-[200px]">{fileName}</span>
        </div>
        <Badge
          variant={
            status === "idle"
              ? "outline"
              : status === "uploading"
                ? "secondary"
                : status === "success"
                  ? "success"
                  : "destructive"
          }
          className={`${
            status === "success"
              ? "bg-green-100 text-green-800"
              : status === "error"
                ? "bg-red-100 text-red-800"
                : ""
          }`}
        >
          {status === "idle" && "Ready"}
          {status === "uploading" && "Uploading..."}
          {status === "success" && "Complete"}
          {status === "error" && "Failed"}
        </Badge>
      </div>

      <Progress value={displayProgress} className="h-2 mb-2" />

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{formatFileSize(fileSize)}</span>
        <span>{displayProgress}%</span>
      </div>

      {status === "error" && (
        <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{errorMessage}</span>
        </div>
      )}

      {status === "success" && (
        <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="h-4 w-4" />
          <span>Upload completed successfully</span>
        </div>
      )}
    </div>
  );
};

export default UploadProgress;
