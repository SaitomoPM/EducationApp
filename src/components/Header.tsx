import React from "react";
import { Button } from "./ui/button";
import { Settings, Upload, BookOpen } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";

interface HeaderProps {
  title?: string;
  onUploadClick?: () => void;
  onLibraryClick?: () => void;
}

const Header = ({
  title = "Mobile Education App",
  onUploadClick = () => {},
  onLibraryClick = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-[70px] px-4 py-2 flex items-center justify-between bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary">{title}</h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onUploadClick}
          className="flex items-center gap-1"
        >
          <Upload size={16} />
          <span className="hidden sm:inline">Upload</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onLibraryClick}
          className="flex items-center gap-1"
        >
          <BookOpen size={16} />
          <span className="hidden sm:inline">Library</span>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Accessibility Settings"
            >
              <Settings size={20} />
            </Button>
          </DialogTrigger>
          {/* AccessibilitySettings component will be rendered here by the parent component */}
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
