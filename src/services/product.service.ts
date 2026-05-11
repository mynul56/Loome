import { Product, delay } from "./db";
import { hasSupabaseConfig, supabase } from "./supabase.client";

const PRODUCTS_KEY = "loome_products_v5";

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
  category: string;
  created_at: string;
};

const mapRowToProduct = (row: ProductRow): Product => ({
  id: row.id,
  name: row.name,
  team: row.team,
  type: row.type,
  price: row.price,
  discountPrice: row.discount_price ?? undefined,
  images: row.images,
  sizes: row.sizes,
  inStock: row.in_stock,
  shortDescription: row.short_description,
  fullDescription: row.full_description,
  isFeatured: row.is_featured,
  isActive: row.is_active,
  category: row.category,
  createdAt: row.created_at,
});

const mapProductToRow = (product: Partial<Product>) => ({
  id: product.id,
  name: product.name,
  team: product.team,
  type: product.type,
  price: product.price,
  discount_price: product.discountPrice ?? null,
  images: product.images,
  sizes: product.sizes,
  in_stock: product.inStock,
  short_description: product.shortDescription,
  full_description: product.fullDescription,
  is_featured: product.isFeatured,
  is_active: product.isActive,
  category: product.category,
  created_at: product.createdAt,
});

const stripUndefined = <T extends Record<string, unknown>>(value: T): T =>
  Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
  ) as T;

export const productService = {
  async getAllProducts(includeInactive = false): Promise<Product[]> {
    if (hasSupabaseConfig && supabase) {
      let query = supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (!includeInactive) {
        query = query.eq("is_active", true);
      }

      const { data, error } = await query;
      if (error) {
        throw new Error(error.message);
      }
      return (data as ProductRow[]).map(mapRowToProduct);
    }

    await delay(300);
    const products: Product[] = JSON.parse(
      localStorage.getItem(PRODUCTS_KEY) || "[]",
    );
    return includeInactive ? products : products.filter((p) => p.isActive);
  },

  async getProductById(id: string): Promise<Product | null> {
    if (hasSupabaseConfig && supabase) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      return data ? mapRowToProduct(data as ProductRow) : null;
    }

    await delay(200);
    const products: Product[] = JSON.parse(
      localStorage.getItem(PRODUCTS_KEY) || "[]",
    );
    return products.find((p) => p.id === id) || null;
  },

  async createProduct(
    productData: Omit<Product, "id" | "createdAt">,
  ): Promise<Product> {
    if (hasSupabaseConfig && supabase) {
      const newProduct: Product = {
        ...productData,
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("products")
        .insert(mapProductToRow(newProduct))
        .select("*")
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return mapRowToProduct(data as ProductRow);
    }

    await delay(400);
    const products: Product[] = JSON.parse(
      localStorage.getItem(PRODUCTS_KEY) || "[]",
    );

    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    if (hasSupabaseConfig && supabase) {
      const { data, error } = await supabase
        .from("products")
        .update(stripUndefined(mapProductToRow(updates)))
        .eq("id", id)
        .select("*")
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return mapRowToProduct(data as ProductRow);
    }

    await delay(400);
    const products: Product[] = JSON.parse(
      localStorage.getItem(PRODUCTS_KEY) || "[]",
    );
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error("Product not found");
    }

    const updatedProduct = { ...products[index], ...updates };
    products[index] = updatedProduct;

    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return updatedProduct;
  },

  async deleteProduct(id: string): Promise<void> {
    if (hasSupabaseConfig && supabase) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
      return;
    }

    await delay(400);
    let products: Product[] = JSON.parse(
      localStorage.getItem(PRODUCTS_KEY) || "[]",
    );
    products = products.filter((p) => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  },
};
