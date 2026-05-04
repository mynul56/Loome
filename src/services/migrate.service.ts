import { hasSupabaseConfig, supabase } from "./supabase.client";

const PRODUCTS_KEY = "loome_products_v5";
const CMS_KEY = "loome_cms_v5";
const CMS_ID = "default";

type ProductRow = {
  id: string;
  name: string;
  team: string;
  type: string;
  price: number;
  discount_price: number | null;
  images: string[];
  sizes: string[];
  in_stock: boolean;
  short_description: string;
  full_description: string;
  is_featured: boolean;
  is_active: boolean;
  category: string | null;
  created_at: string;
};

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
};

export const migrateLocalStorageToSupabase = async () => {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error("Supabase env vars are missing");
  }

  const rawProducts = JSON.parse(
    localStorage.getItem(PRODUCTS_KEY) || "[]",
  ) as any[];
  const rawCms = JSON.parse(localStorage.getItem(CMS_KEY) || "null") as
    | any
    | null;

  const productRows: ProductRow[] = rawProducts.map((product) => ({
    id: product.id,
    name: product.name,
    team: product.team,
    type: product.type,
    price: Number(product.price || 0),
    discount_price: product.discountPrice ?? null,
    images: Array.isArray(product.images) ? product.images : [],
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
    in_stock: Boolean(product.inStock),
    short_description: product.shortDescription || "",
    full_description: product.fullDescription || "",
    is_featured: Boolean(product.isFeatured),
    is_active: Boolean(product.isActive),
    category: product.category ?? null,
    created_at: product.createdAt || new Date().toISOString(),
  }));

  if (productRows.length > 0) {
    const { error } = await supabase
      .from("products")
      .upsert(productRows, { onConflict: "id" });

    if (error) {
      throw new Error(error.message);
    }
  }

  if (rawCms) {
    const cmsRow: CMSRow = {
      id: CMS_ID,
      hero_title: rawCms.heroTitle || "",
      hero_subtitle: rawCms.heroSubtitle || "",
      hero_button_text: rawCms.heroButtonText || "",
      hero_video_url: rawCms.heroVideoUrl || "",
      banner_text: rawCms.bannerText || "",
      about_text: rawCms.aboutText || "",
      contact_email: rawCms.contactEmail || "",
      contact_phone: rawCms.contactPhone || "",
    };

    const { error } = await supabase
      .from("cms_content")
      .upsert(cmsRow, { onConflict: "id" });

    if (error) {
      throw new Error(error.message);
    }
  }

  return {
    products: productRows.length,
    cms: rawCms ? 1 : 0,
  };
};
