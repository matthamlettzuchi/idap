import type { Metadata } from "next";
import { BlogView } from "@/components/blog/blog-view";

export const metadata: Metadata = {
  title: "Blog & Insights — Intidata",
  description:
    "Perspectives from the Intidata team on software development, digital transformation, and technology trends across multifinance, factoring, accounting, and plantation operations.",
};

export default function BlogPage() {
  return <BlogView />;
}