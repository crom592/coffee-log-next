import Link from "next/link"
import { format } from "date-fns"
import { Log, Bean } from "@prisma/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

type LogWithBean = Log & {
  bean: Bean;
}

interface LogCardProps {
  log: LogWithBean
}

export function LogCard({ log }: LogCardProps) {
  return (
    <Link href={`/logs/${log.id}`}>
      <Card className="hover:bg-accent">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{log.bean.name}</h3>
            <span className="text-sm text-muted-foreground">
              {format(new Date(log.createdAt), "MMM d, yyyy")}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Grind Size</span>
              <span className="text-sm">{log.grindSize}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Temperature</span>
              <span className="text-sm">{log.temperature}°C</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ratio</span>
              <span className="text-sm">{log.ratio}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Rating</span>
              <span className="text-sm">{log.rating}/5</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
