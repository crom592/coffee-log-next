import Link from "next/link";
import { Log } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, ThermometerSun, Timer, Scale } from "lucide-react";

interface LogCardProps {
  log: Log & {
    bean: {
      name: string;
      roastLevel: string;
      origin: string | null;
    };
    method: {
      name: string;
    };
  };
}

export function LogCard({ log }: LogCardProps) {
  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="text-lg">연결된 커피 로그</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <Coffee className="h-5 w-5 mt-1" />
            <div>
              <h4 className="font-medium">{log.bean.name}</h4>
              <p className="text-sm text-muted-foreground">
                {log.bean.origin || '원산지 미상'} • {log.bean.roastLevel}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Timer className="h-4 w-4" />
              <span className="text-sm">{log.timeSeconds}초</span>
            </div>
            <div className="flex items-center space-x-2">
              <ThermometerSun className="h-4 w-4" />
              <span className="text-sm">{Number(log.temperature)}°C</span>
            </div>
            <div className="flex items-center space-x-2">
              <Scale className="h-4 w-4" />
              <span className="text-sm">1:{Number(log.ratio)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              {log.method.name} • {new Date(log.createdAt).toLocaleDateString()}
            </div>
            <Link
              href={`/logs/${log.id}`}
              className="text-sm font-medium hover:underline"
            >
              자세히 보기
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
