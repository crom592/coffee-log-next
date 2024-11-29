import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LogSelector } from "./LogSelector";
import { toast } from "sonner";

interface PostFormProps {
  onSubmit: (title: string, content: string, logId: string | null) => Promise<void>;
  defaultValues?: {
    title?: string;
    content?: string;
    logId?: string | null;
  };
  submitLabel?: string;
}

export function PostForm({ onSubmit, defaultValues, submitLabel = "Post" }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [content, setContent] = useState(defaultValues?.content ?? "");
  const [logId, setLogId] = useState<string | null>(defaultValues?.logId ?? null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit(title, content, logId);
      toast.success("Post created successfully");
      if (!defaultValues) {
        setTitle("");
        setContent("");
        setLogId(null);
      }
    } catch (error) {
      toast.error("Failed to create post");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{defaultValues ? "Edit Post" : "Create Post"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content..."
              disabled={isLoading}
              rows={5}
            />
          </div>
          <div className="space-y-2">
            <Label>커피 로그 연결</Label>
            <LogSelector onSelect={setLogId} selectedLogId={logId} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
