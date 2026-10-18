import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Explicit development artifact: no indexing until an authorized release review.
  return { rules: { userAgent: "*", disallow: "/" } };
}
