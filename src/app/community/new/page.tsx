"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PostForm } from "@/components/community/PostForm";
import Header from "@/components/Header";

export default function NewPostPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  const handleSubmit = async (title: string, content: string) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const post = await response.json();
    router.push(`/community/${post.id}`);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">New Post</h1>
        <PostForm 
          onSubmit={handleSubmit} 
          renderButton={(isSubmitting) => (
            <Button
              type="submit"
              variant="default"
              className="bg-[#1B4332] hover:bg-[#143728] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          )}
        />
      </div>
    </div>
  );
}
