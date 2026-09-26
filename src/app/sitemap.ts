import {COMPOUNDED_PRODUCTS} from '@/data/compounded';
import catalogue from '@/data/therapy-explorer.json';
import {listings} from "@/data/listings";
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { events } from "@/data/events";
import { treatments } from "@/data/treatments";
import { CATEGORY_META } from "@/data/treatment-categories";
import { WELLNESS_GOALS } from "@/data/wellness-goals";
import { POPULAR_COMPARISONS } from "@/data/treatment-comparisons";
import { protocols } from "@/data/protocols";

export default function sitemap(): MetadataRoute.Sitemap {
 const baseUrl = "https://kamuralife.com";
 const posts = getAllPosts();

 const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
 url: `${baseUrl}/blog/${post.slug}`,
 lastModified: new Date(post.date),
 changeFrequency: "monthly",
 priority: 0.9,
 }));

 return [
 ...catalogue.map(t=>({url:`${baseUrl}/peptides/${t.id}`,changeFrequency:"monthly" as const,priority:0.9})),
 {url:`${baseUrl}/body`,changeFrequency:"monthly",priority:0.9},
 {url:`${baseUrl}/learn`,changeFrequency:"weekly",priority:0.9},
 {
 url: baseUrl,
 changeFrequency: "weekly",
 priority: 1,
 },
 {
 url: `${baseUrl}/explore`,
 changeFrequency: "monthly",
 priority: 0.8,
 },
 {
 url: `${baseUrl}/events`,
 changeFrequency: "weekly",
 priority: 0.9,
 },
 {
 url: `${baseUrl}/compounded`,
 changeFrequency: "monthly",
 priority: 0.9,
 },
 ...COMPOUNDED_PRODUCTS.map(({slug})=>({
 url: `${baseUrl}/compounded/${slug}`,
 changeFrequency: "monthly" as const,
 priority: 0.9,
 })),
 {
 url: `${baseUrl}/reports`,
 changeFrequency: "monthly",
 priority: 0.9,
 },
 {
 url: `${baseUrl}/supplements`,
 changeFrequency: "weekly",
 priority: 0.9,
 },
 {
 url: `${baseUrl}/quiz`,
 changeFrequency: "monthly",
 priority: 0.8,
 },
 {
 url: `${baseUrl}/wellness-checker`,
 changeFrequency: "monthly",
 priority: 0.8,
 },
 {
 url: `${baseUrl}/about`,
 changeFrequency: "monthly",
 priority: 0.7,
 },
 {
 url: `${baseUrl}/blog`,
 changeFrequency: "weekly",
 priority: 0.9,
 },
 ...blogUrls,
 ...events.map((event) => ({
 url: `${baseUrl}/events/${event.id}`,
 changeFrequency: "monthly" as const,
 priority: 0.8,
 })),
 ...listings.map(l=>({url:`${baseUrl}/explore/${l.id}`,changeFrequency:'monthly' as const,priority:0.7})),
 {
 url: `${baseUrl}/treatments`,
 changeFrequency: "weekly",
 priority: 1,
 },
 {
 url: `${baseUrl}/treatments/methodology`,
 changeFrequency: "monthly",
 priority: 0.7,
 },
 ...CATEGORY_META.map((cat) => ({
 url: `${baseUrl}/treatments/category/${cat.slug}`,
 changeFrequency: "weekly" as const,
 priority: 0.8,
 })),
 ...treatments.map((t) => ({
 url: `${baseUrl}/treatments/${t.slug}`,
 changeFrequency: "monthly" as const,
 priority: 0.9,
 })),
 {
 url: `${baseUrl}/treatments/compare`,
 changeFrequency: "monthly",
 priority: 0.7,
 },
 ...POPULAR_COMPARISONS.map((c) => ({
 url: `${baseUrl}/treatments/compare/${c.slug1}-vs-${c.slug2}`,
 changeFrequency: "monthly" as const,
 priority: 0.8,
 })),
 ...WELLNESS_GOALS.map((g) => ({
 url: `${baseUrl}/treatments/best-for/${g.slug}`,
 changeFrequency: "weekly" as const,
 priority: 0.9,
 })),
 {
 url: `${baseUrl}/peptides`,
 changeFrequency: "weekly",
 priority: 0.9,
 },
 ...[
 "calculator",
 "directory",
 "what-is-a-peptide",
 "tracker",
 "protocol-builder",
 "compare",
 "sourcing-guide",
 "clinic-dashboard",
 "evidence-feed",
 "protocol-templates",
 "advisor",
 ].map((sub) => ({
 url: `${baseUrl}/peptides/${sub}`,
 changeFrequency: "monthly" as const,
 priority: sub === "what-is-a-peptide" || sub === "calculator" ? 0.9 : 0.8,
 })),
 {
 url: `${baseUrl}/classes`,
 changeFrequency: "weekly",
 priority: 0.9,
 },
 {
 url: `${baseUrl}/list-your-business`,
 changeFrequency: "monthly",
 priority: 0.6,
 },
 {
 url: `${baseUrl}/privacy`,
 changeFrequency: "yearly",
 priority: 0.3,
 },
 {
 url: `${baseUrl}/terms`,
 changeFrequency: "yearly",
 priority: 0.3,
 },
 {
 url: `${baseUrl}/protocols`,
 changeFrequency: "monthly",
 priority: 0.9,
 },
 ...protocols.map((p) => ({
 url: `${baseUrl}/protocols/${p.slug}`,
 changeFrequency: "monthly" as const,
 priority: 0.9,
 })),
 ];
}
