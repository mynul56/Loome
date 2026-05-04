import { CMSContent, defaultCMS, delay } from "./db";
import { hasSupabaseConfig, supabase } from "./supabase.client";

const CMS_KEY = "loome_cms_v5";
const CMS_ID = "default";

type CMSRow = {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_button_text: string;
  hero_video_url: string;
  banner_text: string;
  about_text: string;
  contact_email: string;
  contact_phone: string;
  updated_at?: string;
};

const mapRowToContent = (row: CMSRow): CMSContent => ({
  heroTitle: row.hero_title,
  heroSubtitle: row.hero_subtitle,
  heroButtonText: row.hero_button_text,
  heroVideoUrl: row.hero_video_url,
  bannerText: row.banner_text,
  aboutText: row.about_text,
  contactEmail: row.contact_email,
  contactPhone: row.contact_phone,
});

const mapContentToRow = (content: Partial<CMSContent>) => ({
  id: CMS_ID,
  hero_title: content.heroTitle,
  hero_subtitle: content.heroSubtitle,
  hero_button_text: content.heroButtonText,
  hero_video_url: content.heroVideoUrl,
  banner_text: content.bannerText,
  about_text: content.aboutText,
  contact_email: content.contactEmail,
  contact_phone: content.contactPhone,
});

const mergeContent = (
  base: CMSContent,
  updates: Partial<CMSContent>,
): CMSContent => ({
  ...base,
  ...updates,
});

export const cmsService = {
  async getContent(): Promise<CMSContent> {
    if (hasSupabaseConfig && supabase) {
      const { data, error } = await supabase
        .from("cms_content")
        .select("*")
        .eq("id", CMS_ID)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        const { data: seeded, error: seedError } = await supabase
          .from("cms_content")
          .insert(mapContentToRow(defaultCMS))
          .select("*")
          .single();

        if (seedError) {
          throw new Error(seedError.message);
        }

        return mapRowToContent(seeded as CMSRow);
      }

      return mapRowToContent(data as CMSRow);
    }

    await delay(200);
    // Return what's in local storage, or fallback if something went wrong
    const content = localStorage.getItem(CMS_KEY);
    if (!content) {
      throw new Error("CMS content not initialized");
    }
    return JSON.parse(content);
  },

  async updateContent(updates: Partial<CMSContent>): Promise<CMSContent> {
    if (hasSupabaseConfig && supabase) {
      const current = await this.getContent();
      const merged = mergeContent(current, updates);
      const { data, error } = await supabase
        .from("cms_content")
        .upsert(mapContentToRow(merged), { onConflict: "id" })
        .select("*")
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return mapRowToContent(data as CMSRow);
    }

    await delay(400);
    const content: CMSContent = JSON.parse(
      localStorage.getItem(CMS_KEY) || "{}",
    );
    const newContent = { ...content, ...updates };
    localStorage.setItem(CMS_KEY, JSON.stringify(newContent));
    return newContent;
  },
};
