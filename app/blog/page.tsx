import type { Metadata } from "next";
import { BlogView } from "@/components/blog/blog-view";
import { getBlogPosts, getBlogCategories } from "@/lib/wordpress";

export const revalidate = 300; // re-check WordPress every 5 minutes

export const metadata: Metadata = {
  title: "Blog & Insights — Intidata",
  description:
    "Perspectives from the Intidata team on software development, digital transformation, and technology trends across multifinance, factoring, accounting, and plantation operations.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);

  return <BlogView posts={posts} categories={categories} />;
}