import Link from "next/link";
import { listAdminProducts } from "@/lib/admin/products";
import { ProductsList } from "@/components/admin/products/products-list";

export default async function AdminProductsPage() {
  const products = await listAdminProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[22px] font-semibold text-ink-0">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-signal-blue px-5 py-2.5 text-[13.5px] font-medium text-white"
        >
          New Product
        </Link>
      </div>
      <p className="mt-2 text-[13.5px] text-ink-2">
        Kelola produk FISCUS yang tampil di homepage, halaman produk, dan navigasi.
      </p>
      <div className="mt-6">
        <ProductsList initialProducts={products} />
      </div>
    </div>
  );
}