import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Type, ZoomIn, Sun, Moon, Accessibility } from "lucide-react";

interface AccessibilitySettingsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AccessibilitySettings = ({
  open = true,
  onOpenChange,
}: AccessibilitySettingsProps) => {
  const [textSize, setTextSize] = useState<number[]>([100]);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleTextSizeChange = (value: number[]) => {
    setTextSize(value);
    // In a real implementation, this would apply the text size to the app
  };

  const handleHighContrastChange = (checked: boolean) => {
    setHighContrast(checked);
    // In a real implementation, this would toggle high contrast mode
  };

  const handleScreenReaderChange = (checked: boolean) => {
    setScreenReader(checked);
    // In a real implementation, this would toggle screen reader support
  };

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    // In a real implementation, this would toggle dark mode
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Accessibility Settings
          </DialogTitle>
          <DialogDescription>
            Customize your experience to make the app more accessible for your
            needs.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                <Label htmlFor="text-size" className="text-base font-medium">
                  Text Size
                </Label>
              </div>
              <span className="text-sm text-gray-500">{textSize[0]}%</span>
            </div>
            <Slider
              id="text-size"
              min={50}
              max={200}
              step={10}
              value={textSize}
              onValueChange={handleTextSizeChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>A</span>
              <span className="text-lg">A</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ZoomIn className="h-5 w-5" />
                <Label
                  htmlFor="high-contrast"
                  className="text-base font-medium"
                >
                  High Contrast
                </Label>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={handleHighContrastChange}
              />
            </div>
            <p className="text-sm text-gray-500">
              Increase contrast between text and background for better
              readability.
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {darkMode ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
                <Label htmlFor="dark-mode" className="text-base font-medium">
                  Dark Mode
                </Label>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleDarkModeChange}
              />
            </div>
            <p className="text-sm text-gray-500">
              Switch between light and dark themes.
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Accessibility className="h-5 w-5" />
                <Label
                  htmlFor="screen-reader"
                  className="text-base font-medium"
                >
                  Screen Reader Support
                </Label>
              </div>
              <Switch
                id="screen-reader"
                checked={screenReader}
                onCheckedChange={handleScreenReaderChange}
              />
            </div>
            <p className="text-sm text-gray-500">
              Optimize content for screen readers and assistive technologies.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange && onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => onOpenChange && onOpenChange(false)}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessibilitySettings;
