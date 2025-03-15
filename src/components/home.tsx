import React, { useState } from "react";
import Header from "./Header";
import ActionPanel from "./ActionPanel";
import ContentLibraryPreview from "./ContentLibraryPreview";
import UploadModal from "./UploadModal";
import AccessibilitySettings from "./AccessibilitySettings";
import { Dialog, DialogTrigger } from "./ui/dialog";

const Home = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [activeView, setActiveView] = useState<"home" | "library">("home");

  const handleUploadClick = () => {
    setUploadModalOpen(true);
  };

  const handleLibraryClick = () => {
    setActiveView("library");
  };

  const handleUploadComplete = (file: File) => {
    // In a real implementation, this would add the file to the library
    console.log("Upload complete:", file.name);
    setTimeout(() => {
      setUploadModalOpen(false);
    }, 1500);
  };

  const handleViewItem = (id: string) => {
    // In a real implementation, this would open the content viewer
    console.log("Viewing item:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        onUploadClick={handleUploadClick}
        onLibraryClick={handleLibraryClick}
      />

      <main className="flex-1 p-4 md:p-6 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        <section className="w-full">
          <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
            {activeView === "home"
              ? "Welcome to Your Learning Hub"
              : "Content Library"}
          </h1>

          {activeView === "home" && (
            <div className="space-y-8">
              <ActionPanel
                onUploadClick={handleUploadClick}
                onLibraryClick={handleLibraryClick}
              />

              <div className="mt-8">
                <ContentLibraryPreview onViewItem={handleViewItem} />
              </div>
            </div>
          )}

          {activeView === "library" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Browse and manage your educational content
                </p>
                <button
                  onClick={() => setActiveView("home")}
                  className="text-blue-600 hover:underline"
                >
                  Back to Home
                </button>
              </div>
              <ContentLibraryPreview onViewItem={handleViewItem} />
            </div>
          )}
        </section>
      </main>

      <footer className="bg-white p-4 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>© 2023 Mobile Education App. All rights reserved.</p>
      </footer>

      {/* Modals */}
      <UploadModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onUploadComplete={handleUploadComplete}
      />

      <Dialog open={accessibilityOpen} onOpenChange={setAccessibilityOpen}>
        <AccessibilitySettings
          open={accessibilityOpen}
          onOpenChange={setAccessibilityOpen}
        />
      </Dialog>
    </div>
  );
};

export default Home;
