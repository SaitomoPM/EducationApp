import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Upload, BookOpen, Plus } from "lucide-react";

interface ActionPanelProps {
  onUploadClick?: () => void;
  onLibraryClick?: () => void;
}

const ActionPanel = ({
  onUploadClick = () => {},
  onLibraryClick = () => {},
}: ActionPanelProps) => {
  return (
    <Card className="w-full max-w-[1200px] mx-auto bg-white shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <Button
            onClick={onUploadClick}
            className="w-full md:w-[250px] h-[80px] flex flex-col gap-2 items-center justify-center bg-blue-600 hover:bg-blue-700 transition-colors"
            size="lg"
          >
            <Upload className="h-6 w-6" />
            <span className="font-medium">Upload Content</span>
          </Button>

          <Button
            onClick={onLibraryClick}
            className="w-full md:w-[250px] h-[80px] flex flex-col gap-2 items-center justify-center bg-emerald-600 hover:bg-emerald-700 transition-colors"
            size="lg"
          >
            <BookOpen className="h-6 w-6" />
            <span className="font-medium">View Library</span>
          </Button>

          <div className="hidden md:block h-[80px] w-[1px] bg-gray-200"></div>

          <div className="w-full md:w-auto flex-1 flex flex-col items-center justify-center text-center p-4">
            <h3 className="text-lg font-semibold mb-2">Quick Start</h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload educational content or browse your existing library
            </p>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={onUploadClick}
            >
              <Plus className="h-4 w-4" />
              <span>New Upload</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionPanel;
