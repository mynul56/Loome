export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "buyer";
  createdAt: string;
  lastLogin?: string;
  isBlocked?: boolean;
}

export interface Product {
  id: string;
  name: string;
  team: string;
  type: string; // e.g., 'Home', 'Away', 'Third'
  price: number;
  discountPrice?: number;
  images: string[];
  sizes: string[]; // e.g., 'S', 'M', 'L', 'XL'
  inStock: boolean;
  shortDescription: string;
  fullDescription: string;
  isFeatured: boolean;
  isActive: boolean;
  category: string; // e.g., 'National', 'Club'
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  selectedSize: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  phone: string;
  email?: string;
  deliveryAddress: string;
  items: OrderItem[];
  totalPrice: number;
  additionalNote?: string;
  preferredContact: "Phone" | "Email";
  status: "Pending" | "Confirmed" | "Processing" | "Delivered" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface CMSContent {
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroVideoUrl: string;
  bannerText: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
}

// Initial default data
export const defaultCMS: CMSContent = {
  heroTitle: "We craft jerseys and\nfootball legacies",
  heroSubtitle: "made today, worn\nfor 2026",
  heroButtonText: "Explore Collection",
  heroVideoUrl: "/bgvdo.mp4",
  bannerText:
    "Official 2026 Gear - Premium quality authentic jerseys crafted for the ultimate World Cup experience.",
  aboutText:
    "Welcome to the ultimate destination for 2026 World Cup gear. We provide authentic, premium quality jerseys for fans worldwide.",
  contactEmail: "support@loome.com",
  contactPhone: "+1 234 567 8900",
};

const defaultAdmin: User = {
  id: "admin-1",
  name: "System Admin",
  email: "admin@loome.com",
  password: "admin", // Demo password
  role: "admin",
  createdAt: new Date().toISOString(),
};

// Top 20 World Cup Teams Demo Data
const topTeams = [
  { name: "Argentina", color: "87CEEB", awayColor: "000080" },
  { name: "Brazil", color: "FFD700", awayColor: "0000FF" },
  { name: "France", color: "00008B", awayColor: "FFFFFF" },
  { name: "England", color: "FFFFFF", awayColor: "FF0000" },
  { name: "Germany", color: "FFFFFF", awayColor: "000000" },
  { name: "Spain", color: "FF0000", awayColor: "FFFF00" },
  { name: "Portugal", color: "8B0000", awayColor: "FFFFFF" },
  { name: "Italy", color: "0000FF", awayColor: "FFFFFF" },
  { name: "Netherlands", color: "FFA500", awayColor: "000000" },
  { name: "Belgium", color: "FF0000", awayColor: "FFFFFF" },
  { name: "Croatia", color: "FFFFFF", awayColor: "0000FF" },
  { name: "Uruguay", color: "87CEEB", awayColor: "FFFFFF" },
  { name: "Mexico", color: "006400", awayColor: "FFFFFF" },
  { name: "USA", color: "FFFFFF", awayColor: "00008B" },
  { name: "Japan", color: "00008B", awayColor: "FFFFFF" },
  { name: "South Korea", color: "FF0000", awayColor: "000000" },
  { name: "Morocco", color: "FF0000", awayColor: "FFFFFF" },
  { name: "Senegal", color: "008000", awayColor: "FFFFFF" },
  { name: "Colombia", color: "FFFF00", awayColor: "00008B" },
  { name: "Switzerland", color: "FF0000", awayColor: "FFFFFF" },
];

const generateDemoProducts = (): Product[] => {
  const products: Product[] = [];

  topTeams.forEach((team, index) => {
    // Generate Home Kit
    products.push({
      id: `demo-prod-${index}-home`,
      name: `${team.name} 2026 Authentic Home Kit`,
      team: team.name,
      type: "Home",
      price: 1500,
      discountPrice: 1200,
      // Using placehold.co to generate clean, dynamic mockups matching team colors
      images: [
        `https://placehold.co/600x800/${team.color}/FFF?text=${team.name}+\\nHome+Kit`,
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      inStock: true,
      shortDescription: `Official authentic home jersey for the ${team.name} national football team.`,
      fullDescription: `Experience the pinnacle of football engineering with the ${team.name} 2026 Home Kit. Designed for elite performance and maximum comfort on the pitch. Features moisture-wicking technology and premium team crest detailing.`,
      isFeatured: index < 4, // First 4 teams' home kits are featured
      isActive: true,
      category: "National",
      createdAt: new Date(Date.now() - index * 10000).toISOString(),
    });

    // Generate Away Kit
    products.push({
      id: `demo-prod-${index}-away`,
      name: `${team.name} 2026 Authentic Away Kit`,
      team: team.name,
      type: "Away",
      price: 1500,
      discountPrice: 1200,
      images: [
        `https://placehold.co/600x800/${team.awayColor}/${team.awayColor === "FFFFFF" || team.awayColor === "FFFF00" ? "000" : "FFF"}?text=${team.name}+\\nAway+Kit`,
      ],
      sizes: ["S", "M", "L", "XL"],
      inStock: Math.random() > 0.2, // 80% chance of being in stock
      shortDescription: `Official authentic away jersey for the ${team.name} national football team.`,
      fullDescription: `Represent ${team.name} on the road with the official 2026 Away Kit. Crafted with breathable fabric for peak performance and everyday wearability.`,
      isFeatured: false,
      isActive: true,
      category: "National",
      createdAt: new Date(Date.now() - index * 10000 - 5000).toISOString(),
    });
  });

  return products;
};

export const initializeDB = () => {
  const hasSupabaseEnv = Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
  );

  if (hasSupabaseEnv) {
    return;
  }

  if (!localStorage.getItem("loome_users_v5")) {
    localStorage.setItem("loome_users_v5", JSON.stringify([defaultAdmin]));
  }
  if (!localStorage.getItem("loome_products_v5")) {
    localStorage.setItem(
      "loome_products_v5",
      JSON.stringify(generateDemoProducts()),
    );
  }
  if (!localStorage.getItem("loome_orders_v5")) {
    localStorage.setItem("loome_orders_v5", JSON.stringify([]));
  }
  if (!localStorage.getItem("loome_cms_v5")) {
    localStorage.setItem("loome_cms_v5", JSON.stringify(defaultCMS));
  }
};

// Helper for delay to simulate network requests
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
