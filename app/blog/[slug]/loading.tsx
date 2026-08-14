export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-void">
      <div className="container-x max-w-3xl pt-40 lg:pt-36">
        <div className="h-4 w-28 animate-pulse rounded-full bg-panel-2" />
        <div className="mt-8 h-12 w-full animate-pulse rounded-xl bg-panel-2" />
        <div className="mt-3 h-12 w-2/3 animate-pulse rounded-xl bg-panel-2" />
        <div className="mt-10 aspect-video w-full animate-pulse rounded-2xl bg-panel-2" />
      </div>
    </div>
  );
}