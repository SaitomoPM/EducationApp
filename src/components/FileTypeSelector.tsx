import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { FileIcon, FileImageIcon } from "lucide-react";

interface FileTypeSelectorProps {
  selectedType?: "pdf" | "animation";
  onTypeSelect?: (type: "pdf" | "animation") => void;
}

const FileTypeSelector = ({
  selectedType = "pdf",
  onTypeSelect = () => {},
}: FileTypeSelectorProps) => {
  const handleTypeChange = (value: string) => {
    onTypeSelect(value as "pdf" | "animation");
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Select File Type</h3>
          <RadioGroup
            value={selectedType}
            onValueChange={handleTypeChange}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-slate-50 transition-colors">
              <RadioGroupItem value="pdf" id="pdf" />
              <Label htmlFor="pdf" className="flex items-center cursor-pointer">
                <FileIcon className="h-5 w-5 mr-2 text-blue-600" />
                <div>
                  <p className="font-medium">PDF Document</p>
                  <p className="text-sm text-muted-foreground">
                    Upload educational PDF materials
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-slate-50 transition-colors">
              <RadioGroupItem value="animation" id="animation" />
              <Label
                htmlFor="animation"
                className="flex items-center cursor-pointer"
              >
                <FileImageIcon className="h-5 w-5 mr-2 text-purple-600" />
                <div>
                  <p className="font-medium">Animation</p>
                  <p className="text-sm text-muted-foreground">
                    Upload educational animations
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileTypeSelector;
