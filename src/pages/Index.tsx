import FootballLoader from "@/components/FootballLoader";
import Layout from "@/components/Layout";
import LiveScoreTicker from "@/components/LiveScoreTicker";
import { cmsService } from "@/services/cms.service";
import { CMSContent, Product } from "@/services/db";
import { mediaService } from "@/services/media.service";
import { productService } from "@/services/product.service";
import { ArrowRight, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index: React.FC = () => {
  const [cms, setCms] = useState<CMSContent | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heroVideoSrc, setHeroVideoSrc] = useState("");
  const [featuredImageUrls, setFeaturedImageUrls] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cmsData, products] = await Promise.all([
          cmsService.getContent(),
          productService.getAllProducts(),
        ]);
        setCms(cmsData);
        const featured = products.filter((p) => p.isFeatured && p.isActive);
        const selected =
          featured.length > 0 ? featured.slice(0, 4) : products.slice(0, 4);
        setFeaturedProducts(selected);

        const videoUrl = await mediaService.resolveHomeVideoUrl(
          cmsData.heroVideoUrl || "/bgvdo.mp4",
        );
        setHeroVideoSrc(videoUrl);

        const resolvedImages = await Promise.all(
          selected.map(async (product) => {
            const path = product.images?.[0] || "";
            const url = path
              ? await mediaService.resolveProductImageUrl(path)
              : "";
            return [product.id, url] as const;
          }),
        );
        setFeaturedImageUrls(Object.fromEntries(resolvedImages));
      } catch (err) {
        console.error("Failed to load home data", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading || !cms) {
    return (
      <Layout>
        <FootballLoader text="Loading Stadium..." />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* HERO SECTION - MATCH DAY ENERGY */}
      <section className="relative w-full h-[85vh] bg-black overflow-hidden flex items-center">
        {/* Background Video / Image */}
        <div className="absolute inset-0 opacity-60">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover grayscale"
          >
            <source
              src={heroVideoSrc || cms.heroVideoUrl || "/bgvdo.mp4"}
              type="video/mp4"
            />
          </video>
          {/* Neon overlay grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idHJhbnNwYXJlbnQiLz4KPHBhdGggZD0iTTAgNDBMMDAgMEw0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-30 mix-blend-overlay"></div>
        </div>

        {/* Diagonal Cut Layout */}
        <div className="relative z-10 w-full px-6 lg:px-12 max-w-[1800px] mx-auto mt-20">
          <div className="max-w-4xl space-y-6">
            <div className="inline-block bg-primary text-black font-bold uppercase tracking-widest px-4 py-1 text-sm transform -skew-x-12 animate-fade-in-up mb-4">
              {cms.heroSubtitle.replace("\\n", " ")}
            </div>

            <h1
              className="text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] font-heading text-white uppercase tracking-tighter animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {cms.heroTitle.split("\\n").map((line, i) => (
                <span
                  key={i}
                  className="block hover:text-primary transition-colors cursor-default"
                >
                  {line}
                </span>
              ))}
            </h1>

            <div
              className="pt-8 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-4 bg-white text-black font-heading text-2xl uppercase px-8 py-4 hover:bg-primary transition-all transform hover:translate-x-2"
              >
                {cms.heroButtonText} <ArrowRight className="w-8 h-8" />
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-1/3 h-2 bg-primary"></div>
        <div className="absolute top-0 right-0 w-2 h-1/3 bg-primary"></div>
      </section>

      {/* LATEST DROPS TICKER */}
      <div className="w-full bg-primary text-black font-heading text-2xl uppercase overflow-hidden border-y-4 border-black py-3">
        <div className="flex whitespace-nowrap animate-[slide_20s_linear_infinite]">
          <span className="mx-4">• WORLD CUP 2026 KITS OUT NOW</span>
          <span className="mx-4">• AUTHENTIC REPLICAS</span>
          <span className="mx-4">• LIMITED EDITION DROPS</span>
          <span className="mx-4">• WORLD CUP 2026 KITS OUT NOW</span>
          <span className="mx-4">• AUTHENTIC REPLICAS</span>
          <span className="mx-4">• LIMITED EDITION DROPS</span>
          <span className="mx-4">• WORLD CUP 2026 KITS OUT NOW</span>
          <span className="mx-4">• AUTHENTIC REPLICAS</span>
          <span className="mx-4">• LIMITED EDITION DROPS</span>
        </div>
      </div>

      {/* FEATURED COLLECTION */}
      <section className="py-24 bg-background">
        <div className="px-6 lg:px-12 max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-black pb-4">
            <div>
              <h2 className="text-5xl md:text-7xl font-heading uppercase text-black">
                Starting XI
              </h2>
              <p className="text-xl font-bold text-gray-500 uppercase mt-2">
                {cms.bannerText}
              </p>
            </div>
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 font-bold uppercase hover:text-primary transition-colors mt-4 md:mt-0 text-xl"
            >
              View All Kits <ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`group block bg-white border-4 border-transparent hover:border-primary transition-all duration-300 sport-shadow animate-fade-in-up`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  {product.discountPrice && (
                    <div className="absolute top-4 left-4 z-10 bg-black text-primary font-heading text-xl uppercase px-3 py-1 transform -skew-x-12">
                      SALE
                    </div>
                  )}
                  <img
                    src={
                      featuredImageUrls[product.id] ||
                      "https://via.placeholder.com/600x800/111/FFF?text=KIT"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-primary text-black font-heading text-2xl uppercase px-6 py-2 transform -skew-x-12 scale-90 group-hover:scale-100 transition-transform">
                      View Kit
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
                    {product.team} • {product.type}
                  </p>
                  <h3 className="text-2xl font-heading uppercase leading-tight mb-4 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between border-t-2 border-gray-100 pt-4">
                    <div className="font-jersey text-3xl font-bold">
                      {product.discountPrice ? (
                        <div className="flex items-center gap-3">
                          <span className="text-red-600">
                            ৳{product.discountPrice}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            ৳{product.price}
                          </span>
                        </div>
                      ) : (
                        <span>৳{product.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link
            to="/shop"
            className="md:hidden flex items-center justify-center gap-2 font-bold uppercase hover:text-primary transition-colors mt-12 border-2 border-black p-4 w-full"
          >
            View All Kits <ArrowRight />
          </Link>
        </div>
      </section>

      {/* LIVE SCORE BREAK - BETWEEN SECTIONS */}
      <div className="py-8 bg-black border-y-4 border-primary">
        <LiveScoreTicker />
      </div>

      {/* AGGRESSIVE PROMO SECTION */}
      <section className="w-full bg-black text-white min-h-[85vh] flex items-center relative overflow-hidden py-32">
        {/* Animated Abstract field lines */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          {/* Breathing center circle */}
          <div
            className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] border-[15px] border-gray-800 rounded-full"
            style={{ animation: "pulse-ring 8s ease-in-out infinite" }}
          ></div>
          {/* Static center line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[15px] bg-gray-800"></div>
          {/* Sci-fi scanner line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_20px_5px_rgba(212,255,0,0.4)]"
            style={{ animation: "scan-line 6s linear infinite" }}
          ></div>
          {/* Floating Neon Particles */}
          <div
            className="absolute top-[20%] left-[15%] w-3 h-3 bg-primary rounded-full animate-ping"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute bottom-[25%] right-[15%] w-4 h-4 bg-primary rounded-full animate-ping"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-[60%] left-[80%] w-2 h-2 bg-primary rounded-full animate-ping"
            style={{ animationDuration: "2s", animationDelay: "0.5s" }}
          ></div>
        </div>

        <div className="relative z-10 px-6 lg:px-12 max-w-[1800px] mx-auto text-center w-full">
          <Zap className="w-24 h-24 text-primary mx-auto mb-10 animate-bounce" />
          <h2 className="text-7xl md:text-[10rem] font-heading uppercase mb-10 leading-[0.85] tracking-tighter">
            Built For
            <br />
            <span className="text-primary">The Pitch</span>
          </h2>
          <p className="text-xl md:text-3xl font-bold uppercase text-gray-400 max-w-4xl mx-auto mb-16 tracking-wider">
            {cms.aboutText}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/shop"
              className="group bg-primary text-black font-heading text-3xl md:text-5xl uppercase px-16 py-8 transform -skew-x-12 hover:bg-white transition-all hover:scale-105 sport-shadow"
            >
              <span className="block transform skew-x-12 group-hover:tracking-widest transition-all duration-300">
                Gear Up Now
              </span>
            </Link>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.02); opacity: 1; box-shadow: 0 0 40px rgba(212, 255, 0, 0.1); }
          100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.5; }
        }
        @keyframes scan-line {
          0% { transform: translateY(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `,
        }}
      />
    </Layout>
  );
};

export default Index;
