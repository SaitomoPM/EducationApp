import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Eye, FileText, Play } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  type: "pdf" | "animation";
  thumbnail: string;
  dateUploaded: string;
}

interface ContentLibraryPreviewProps {
  items?: ContentItem[];
  onViewItem?: (id: string) => void;
}

const ContentLibraryPreview = ({
  items = [
    {
      id: "1",
      title: "Introduction to Physics",
      type: "pdf",
      thumbnail:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&q=80",
      dateUploaded: "2023-10-15",
    },
    {
      id: "2",
      title: "Cell Division Animation",
      type: "animation",
      thumbnail:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&q=80",
      dateUploaded: "2023-10-12",
    },
    {
      id: "3",
      title: "Chemistry Fundamentals",
      type: "pdf",
      thumbnail:
        "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=300&q=80",
      dateUploaded: "2023-10-10",
    },
    {
      id: "4",
      title: "Solar System Tour",
      type: "animation",
      thumbnail:
        "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?w=300&q=80",
      dateUploaded: "2023-10-05",
    },
  ],
  onViewItem = () => {},
}: ContentLibraryPreviewProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Content</h2>
        <Button variant="outline">View All</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-40 overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1">
                {item.type === "pdf" ? (
                  <FileText className="h-5 w-5 text-blue-500" />
                ) : (
                  <Play className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg truncate">{item.title}</CardTitle>
              <CardDescription>
                {item.type === "pdf" ? "PDF Document" : "Animation"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-sm text-gray-500">
              Uploaded on {new Date(item.dateUploaded).toLocaleDateString()}
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => onViewItem(item.id)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Content
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-gray-500">
            No content available yet. Upload some content to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentLibraryPreview;
