import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { BookmarksList } from "@/components/bookmarks/BookmarksList";

export const metadata: Metadata = {
  title: "Bookmarks - Coffee Log",
  description: "View your bookmarked posts on Coffee Log",
};

export default async function BookmarksPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-2xl font-bold mb-6">북마크</h1>
      <BookmarksList userId={session.user.id} />
    </div>
  );
}
