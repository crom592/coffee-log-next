import { useUserLogs } from "@/hooks/useUserContent";
import { LogCard } from "@/components/logs/LogCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface UserLogsProps {
  userId: string;
}

export function UserLogs({ userId }: UserLogsProps) {
  const {
    logs,
    isEmpty,
    hasMore,
    isLoading,
    isLoadingMore,
    isRefreshing,
    loadMore,
  } = useUserLogs(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No coffee logs yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {logs.map((log) => (
          <LogCard key={log.id} log={log} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => loadMore()}
            disabled={isLoadingMore}
          >
            {isLoadingMore && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            더 보기
          </Button>
        </div>
      )}
      {isRefreshing && !isLoadingMore && (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
