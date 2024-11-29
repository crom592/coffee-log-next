import { useState } from "react";
import useSWR from "swr";
import { Log } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface LogSelectorProps {
  onSelect: (logId: string | null) => void;
  selectedLogId?: string | null;
}

export function LogSelector({ onSelect, selectedLogId }: LogSelectorProps) {
  const [open, setOpen] = useState(false);
  const { data: logs } = useSWR<(Log & { bean: { name: string }; method: { name: string } })[]>("/api/logs");

  if (!logs) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedLogId
            ? logs.find((log) => log.id === selectedLogId)?.bean.name || "커피 로그 선택"
            : "커피 로그 선택"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="커피 로그 검색..." />
          <CommandEmpty>찾을 수 없습니다.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto">
            {logs.map((log) => (
              <CommandItem
                key={log.id}
                value={log.id}
                onSelect={() => {
                  onSelect(log.id === selectedLogId ? null : log.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedLogId === log.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span className="font-medium">{log.bean.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {log.method.name} • {new Date(log.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
