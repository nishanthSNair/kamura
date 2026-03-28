import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { treatments } from "@/data/treatments";
import { listings } from "@/data/listings";
import { events } from "@/data/events";
import { CATEGORY_META } from "@/data/treatment-categories";
import { areas } from "@/data/areas";
import { WELLNESS_GOALS } from "@/data/wellness-goals";
import { POPULAR_COMPARISONS } from "@/data/treatment-comparisons";

const INDEXNOW_KEY = "a79a643f-a5f6-4ce1-9fcc-7fa23583fcb2";
const HOST = "kamuralife.com";
const BASE_URL = `https://${HOST}`;

// Collect all site URLs
function getAllUrls(): string[] {
 const urls: string[] = [
 BASE_URL,
 `${BASE_URL}/blog`,
 `${BASE_URL}/treatments`,
 `${BASE_URL}/explore`,
 `${BASE_URL}/events`,
 `${BASE_URL}/about`,
 `${BASE_URL}/quiz`,
 `${BASE_URL}/wellness-checker`,
 `${BASE_URL}/explore/compare`,
 `${BASE_URL}/treatments/methodology`,
 ];

 // Blog posts
 const posts = getAllPosts();
 for (const post of posts) {
 urls.push(`${BASE_URL}/blog/${post.slug}`);
 }

 // Treatments
 for (const t of treatments) {
 urls.push(`${BASE_URL}/treatments/${t.slug}`);
 }

 // Treatment categories
 for (const cat of CATEGORY_META) {
 urls.push(`${BASE_URL}/treatments/category/${cat.slug}`);
 }

 // Listings
 for (const l of listings) {
 urls.push(`${BASE_URL}/explore/${l.id}`);
 }

 // Areas
 for (const a of areas) {
 urls.push(`${BASE_URL}/explore/area/${a.slug}`);
 }

 // Events
 for (const e of events) {
 urls.push(`${BASE_URL}/events/${e.id}`);
 }

 // Treatment comparisons
 urls.push(`${BASE_URL}/treatments/compare`);
 for (const comp of POPULAR_COMPARISONS) {
 urls.push(`${BASE_URL}/treatments/compare/${comp.slug1}-vs-${comp.slug2}`);
 }

 // Best-for goal pages
 for (const goal of WELLNESS_GOALS) {
 urls.push(`${BASE_URL}/treatments/best-for/${goal.slug}`);
 }

 return urls;
}

// POST /api/indexnow — submit all URLs to IndexNow
export async function POST() {
 const urls = getAllUrls();

 try {
 const response = await fetch("https://api.indexnow.org/indexnow", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 host: HOST,
 key: INDEXNOW_KEY,
 keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
 urlList: urls,
 }),
 });

 return NextResponse.json({
 success: response.ok,
 status: response.status,
 urlCount: urls.length,
 message: response.ok
 ? `Submitted ${urls.length} URLs to IndexNow`
 : `IndexNow returned status ${response.status}`,
 });
 } catch (error) {
 return NextResponse.json(
 {
 success: false,
 error: error instanceof Error ? error.message : "Unknown error",
 },
 { status: 500 }
 );
 }
}

// GET /api/indexnow — show URL count and key status
export async function GET() {
 const urls = getAllUrls();
 return NextResponse.json({
 key: INDEXNOW_KEY,
 keyUrl: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
 totalUrls: urls.length,
 categories: {
 static: 11,
 blog: getAllPosts().length,
 treatments: treatments.length,
 treatmentCategories: CATEGORY_META.length,
 listings: listings.length,
 areas: areas.length,
 events: events.length,
 comparisons: POPULAR_COMPARISONS.length,
 goals: WELLNESS_GOALS.length,
 },
 usage: "POST to this endpoint to submit all URLs to IndexNow (Bing, Yandex, etc.)",
 });
}
