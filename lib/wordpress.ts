const WORDPRESS_URL = "http://intidata-blog.local";

export async function getPosts() {
  const res = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/posts?_embed`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch WordPress posts");
  }

  return res.json();
}