import Link from "next/link"
import { format } from "date-fns"
import { Coffee } from "@prisma/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface LogCardProps {
  log: Coffee
}

export function LogCard({ log }: LogCardProps) {
  return (
    <Link href={`/logs/${log.id}`}>
      <Card className="hover:bg-accent">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{log.name}</h3>
            <span className="text-sm text-muted-foreground">
              {format(new Date(log.createdAt), "MMM d, yyyy")}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Roaster</span>
              <span className="text-sm">{log.roaster}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Origin</span>
              <span className="text-sm">{log.origin}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Process</span>
              <span className="text-sm">{log.process}</span>
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
