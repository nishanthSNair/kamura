import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
 return {
 rules: {
 userAgent: "*",
 allow: "/",
 disallow: [
 "/admin/",
 "/api/",
 "/my/",
 "/provider/dashboard/",
 "/review/",
 ],
 },
 sitemap: "https://kamuralife.com/sitemap.xml",
 };
}
