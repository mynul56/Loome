const signedUrlCache = new Map<string, string>();

const isDirectUrl = (value: string) => {
  if (!value) return false;
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/") ||
    value.startsWith("data:") ||
    value.startsWith("blob:")
  );
};

const fetchSignedUrl = async (endpoint: string, path: string) => {
  const response = await fetch(`${endpoint}?path=${encodeURIComponent(path)}`);
  if (!response.ok) {
    throw new Error("Failed to resolve signed URL");
  }
  const data = await response.json();
  return data.url as string;
};

export const mediaService = {
  async uploadProductImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/media/upload/product-image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Product image upload failed");
    }

    const data = await response.json();
    return data.path as string;
  },

  async uploadHomeVideo(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/media/upload/home-video", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Home video upload failed");
    }

    const data = await response.json();
    return data.path as string;
  },

  async resolveProductImageUrl(pathOrUrl: string): Promise<string> {
    if (!pathOrUrl || isDirectUrl(pathOrUrl)) {
      return pathOrUrl;
    }

    const cacheKey = `product:${pathOrUrl}`;
    const cached = signedUrlCache.get(cacheKey);
    if (cached) return cached;

    try {
      const signedUrl = await fetchSignedUrl(
        "/api/media/signed/product-image",
        pathOrUrl,
      );
      signedUrlCache.set(cacheKey, signedUrl);
      return signedUrl;
    } catch (err) {
      return pathOrUrl;
    }
  },

  async resolveHomeVideoUrl(pathOrUrl: string): Promise<string> {
    if (!pathOrUrl || isDirectUrl(pathOrUrl)) {
      return pathOrUrl;
    }

    const cacheKey = `video:${pathOrUrl}`;
    const cached = signedUrlCache.get(cacheKey);
    if (cached) return cached;

    try {
      const signedUrl = await fetchSignedUrl(
        "/api/media/signed/home-video",
        pathOrUrl,
      );
      signedUrlCache.set(cacheKey, signedUrl);
      return signedUrl;
    } catch (err) {
      return pathOrUrl;
    }
  },
};
