// app/admin/(protected)/articles/[id]/page.tsx
import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/admin/articles";
import { requireCmsUser } from "@/lib/admin/auth";
import { ArticleEditor } from "@/components/admin/article-editor";

export default async function ArticleEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [article, user] = await Promise.all([getArticleById(id), requireCmsUser()]);
  if (!article) notFound();

  const canEdit = user.role === "admin" || article.author_id === user.id;
  if (!canEdit) notFound();

  return <ArticleEditor article={article} canPublish={user.role === "admin"} />;
}