"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2 } from "lucide-react";
import { useRoadmap } from "@/contexts/RoadmapContext";
import { cn } from "@/lib/misc/utils";

/**
 * RoadmapNode Component
 * Represents a single topic in the learning roadmap
 * - Checkbox for marking complete/incomplete
 * - Title with completion styling
 * - Estimated duration badge
 * - Smooth transitions and animations
 */
export default function RoadmapNode({ topic }) {
  const { isTopicCompleted, toggleTopic } = useRoadmap();
  const isCompleted = isTopicCompleted(topic.id);

  return (
    <div
      className={cn(
        "group flex items-start gap-3 p-3 rounded-xl border transition-all duration-300",
        isCompleted
          ? "bg-green-500/5 border-green-500/20 opacity-75"
          : "bg-background/60 border-border/50 hover:border-primary/30 hover:bg-primary/5"
      )}
    >
      {/* Checkbox */}
      <Checkbox
        id={topic.id}
        checked={isCompleted}
        onCheckedChange={() => toggleTopic(topic.id)}
        className={cn(
          "mt-0.5 transition-all duration-200",
          isCompleted && "border-green-500 data-[state=checked]:bg-green-500"
        )}
        aria-label={`Mark "${topic.title}" as ${isCompleted ? "incomplete" : "complete"}`}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <label
          htmlFor={topic.id}
          className={cn(
            "text-sm font-medium cursor-pointer transition-all duration-300 block",
            isCompleted
              ? "line-through text-muted-foreground"
              : "text-foreground group-hover:text-primary"
          )}
        >
          {topic.title}
        </label>
      </div>

      {/* Duration badge and check icon */}
      <div className="flex items-center gap-2 shrink-0">
        {isCompleted && (
          <CheckCircle2 className="h-4 w-4 text-green-500 animate-in zoom-in duration-300" />
        )}
        <Badge
          variant="outline"
          className={cn(
            "text-xs font-medium gap-1",
            isCompleted && "opacity-60"
          )}
        >
          <Clock className="h-3 w-3" />
          {topic.duration}h
        </Badge>
      </div>
    </div>
  );
}
