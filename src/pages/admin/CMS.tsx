import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cmsService } from "@/services/cms.service";
import { CMSContent } from "@/services/db";
import { mediaService } from "@/services/media.service";
import React, { useEffect, useState } from "react";

const AdminCMS: React.FC = () => {
  const [content, setContent] = useState<CMSContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await cmsService.getContent();
        setContent(data);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load CMS content",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, [toast]);

  const handleChange = (field: keyof CMSContent, value: string) => {
    if (content) {
      setContent({ ...content, [field]: value });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setIsSaving(true);
    try {
      await cmsService.updateContent(content);
      toast({
        title: "Success",
        description: "Website content updated successfully",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !content) return <div className="p-8">Loading CMS...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading font-medium">
          Content Management System
        </h1>
      </div>

      <form
        onSubmit={handleSave}
        className="space-y-8 bg-white p-8 rounded-xl shadow-sm border"
      >
        {/* Hero Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium border-b pb-2">Homepage Hero</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Hero Title (Use \n for newlines)
            </label>
            <textarea
              value={content.heroTitle}
              onChange={(e) => handleChange("heroTitle", e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black/5 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Hero Subtitle</label>
            <textarea
              value={content.heroSubtitle}
              onChange={(e) => handleChange("heroSubtitle", e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black/5 min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Text</label>
              <input
                type="text"
                value={content.heroButtonText}
                onChange={(e) => handleChange("heroButtonText", e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between items-center">
                Background Video
                <span className="text-xs text-gray-500 font-normal">
                  URL or Upload
                </span>
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={content.heroVideoUrl}
                  onChange={(e) => handleChange("heroVideoUrl", e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black/5"
                />
                <div className="relative">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 50 * 1024 * 1024) {
                        toast({
                          variant: "destructive",
                          title: "File Too Large",
                          description:
                            "Please upload a video smaller than 50MB, or paste a direct URL.",
                        });
                        return;
                      }

                      setIsUploadingVideo(true);
                      try {
                        const path = await mediaService.uploadHomeVideo(file);
                        handleChange("heroVideoUrl", path);
                        toast({
                          title: "Video Uploaded",
                          description: "Video stored securely.",
                        });
                      } catch (err: any) {
                        toast({
                          variant: "destructive",
                          title: "Upload Failed",
                          description: err.message,
                        });
                      } finally {
                        setIsUploadingVideo(false);
                      }
                    }}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-black hover:file:bg-primary/80"
                    disabled={isUploadingVideo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banners & Text */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-medium border-b pb-2">Banners & About</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium">Banner/Promo Text</label>
            <textarea
              value={content.bannerText}
              onChange={(e) => handleChange("bannerText", e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black/5 min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">About Section Text</label>
            <textarea
              value={content.aboutText}
              onChange={(e) => handleChange("aboutText", e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black/5 min-h-[100px]"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-medium border-b pb-2">
            Contact Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Support Email</label>
              <input
                type="email"
                value={content.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Support Phone</label>
              <input
                type="text"
                value={content.contactPhone}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black/5"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-black text-white px-8 py-6 rounded-xl"
          >
            {isSaving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminCMS;
