"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { TopicKey } from "@/lib/blog-taxonomy";

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  topic: TopicKey;
};

type FilterKey = "todos" | TopicKey;

const filters: { key: FilterKey; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "str", label: "Alquileres a Corto Plazo" },
  { key: "tax-deed", label: "Tax Deed" },
  { key: "archivado", label: "Archivo" },
];

const VALID_FILTERS = new Set<FilterKey>(["todos", "str", "tax-deed", "archivado"]);

function BlogInner({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const initial = searchParams.get("categoria") as FilterKey | null;
  const [filter, setFilter] = useState<FilterKey>(
    initial && VALID_FILTERS.has(initial) ? initial : "todos",
  );

  const visible =
    filter === "todos"
      ? posts.filter((p) => p.topic !== "archivado")
      : posts.filter((p) => p.topic === filter);

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-12">
        {filters.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase font-semibold transition-all ${
                active
                  ? "bg-[#C8A45D] text-black"
                  : "border border-[#C8A45D]/30 text-[#C8A45D] hover:bg-[#C8A45D]/10"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="text-[#F7F3EC]/60 text-sm">
          No hay artículos en esta categoría todavía.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-[#C8A45D]/15 hover:border-[#C8A45D]/45 bg-[#1C1916] transition-all flex flex-col overflow-hidden"
            >
              <div className="h-32 bg-gradient-to-br from-[#141210] to-[#10145F]/25 flex items-center justify-center">
                <span className="text-[#C8A45D] text-3xl">◆</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold">
                    {post.category}
                  </span>
                  <span className="text-[#888888] text-xs">{post.readTime}</span>
                </div>
                <h2 className="heading-serif text-lg text-[#F7F3EC] leading-snug mb-3 group-hover:text-[#C8A45D] transition-colors flex-1">
                  {post.title}
                </h2>
                <p className="text-[#F7F3EC]/60 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-xs text-[#888888] pt-3 border-t border-[#C8A45D]/10">
                  <span>
                    {new Date(post.date).toLocaleDateString("es-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-[#C8A45D] group-hover:underline">Leer →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default function BlogClient({ posts }: { posts: Post[] }) {
  return (
    <Suspense fallback={<div className="text-[#888888] text-sm">Cargando artículos...</div>}>
      <BlogInner posts={posts} />
    </Suspense>
  );
}
