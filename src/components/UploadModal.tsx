import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Upload, X, FileUp } from "lucide-react";
import FileTypeSelector from "./FileTypeSelector";
import UploadProgress from "./UploadProgress";

interface UploadModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUploadComplete?: (file: File) => void;
}

const UploadModal = ({
  open = true,
  onOpenChange = () => {},
  onUploadComplete = () => {},
}: UploadModalProps) => {
  const [fileType, setFileType] = useState<"pdf" | "animation">("pdf");
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (fileType === "pdf" && !selectedFile.type.includes("pdf")) {
      setErrorMessage("Please select a valid PDF file");
      setUploadStatus("error");
      return;
    }

    if (
      fileType === "animation" &&
      !selectedFile.type.includes("video") &&
      !selectedFile.type.includes("image")
    ) {
      setErrorMessage("Please select a valid animation file (video or image)");
      setUploadStatus("error");
      return;
    }

    setFile(selectedFile);
    setUploadStatus("idle");
    setErrorMessage("");
  };

  const handleUpload = () => {
    if (!file) return;

    setUploadStatus("uploading");
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setUploadStatus("success");
          onUploadComplete(file);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleReset = () => {
    setFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    setErrorMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Educational Content
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <FileTypeSelector
            selectedType={fileType}
            onTypeSelect={(type) => {
              setFileType(type);
              setFile(null);
              setUploadStatus("idle");
            }}
          />

          {uploadStatus === "idle" && !file && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <FileUp className="h-10 w-10 text-gray-400" />
                <div>
                  <p className="text-lg font-medium">
                    Drag and drop your file here
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    or click to browse from your device
                  </p>
                </div>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                    Browse Files
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept={fileType === "pdf" ? ".pdf" : "image/*,video/*"}
                    onChange={handleFileChange}
                  />
                </Label>
              </div>
            </div>
          )}

          {(file || uploadStatus !== "idle") && (
            <UploadProgress
              fileName={file?.name}
              fileSize={file?.size}
              status={uploadStatus}
              progress={uploadProgress}
              errorMessage={errorMessage}
            />
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={uploadStatus === "uploading"}
          >
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={
                !file ||
                uploadStatus === "uploading" ||
                uploadStatus === "success"
              }
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
