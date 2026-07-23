"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useRoadmap } from "@/contexts/RoadmapContext";
import { cn } from "@/lib/misc/utils";
import RoadmapNode from "./RoadmapNode";
import { useMemo } from "react";

/**
 * RoadmapSection Component
 * Represents a collapsible category in the roadmap
 * - Expand/collapse with chevron icons
 * - Progress indicator for the section
 * - Smooth animations
 * - Lists all topics in the category
 */
export default function RoadmapSection({ category }) {
  const { isSectionExpanded, toggleSection, isTopicCompleted } = useRoadmap();
  const isExpanded = isSectionExpanded(category.id);

  // Calculate section-specific progress
  const sectionProgress = useMemo(() => {
    const completed = category.topics.filter((topic) =>
      isTopicCompleted(topic.id)
    ).length;
    const total = category.topics.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  }, [category.topics, isTopicCompleted]);

  // Calculate total hours for this section
  const totalHours = useMemo(() => {
    return category.topics.reduce((sum, topic) => sum + topic.duration, 0);
  }, [category.topics]);

  // Get the icon component dynamically
  const IconComponent = LucideIcons[category.icon] || LucideIcons.BookOpen;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:border-primary/30">
      <CardHeader
        className="cursor-pointer select-none hover:bg-accent/50 transition-colors"
        onClick={() => toggleSection(category.id)}
        role="button"
        aria-expanded={isExpanded}
        aria-controls={`section-${category.id}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleSection(category.id);
          }
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Chevron icon */}
            <div className="shrink-0">
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
              )}
            </div>

            {/* Category icon */}
            <div className="p-2 rounded-xl bg-primary/10 shrink-0">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>

            {/* Title */}
            <CardTitle className="text-lg truncate">{category.title}</CardTitle>
          </div>

          {/* Stats badges */}
          <div className="flex items-center gap-2 shrink-0">
            <Badge
              variant="secondary"
              className={cn(
                "text-xs font-bold",
                sectionProgress.percentage === 100 &&
                  "bg-green-500/10 text-green-500 border-green-500/20"
              )}
            >
              {sectionProgress.completed}/{sectionProgress.total}
            </Badge>
            <Badge variant="outline" className="text-xs font-medium hidden sm:inline-flex">
              {totalHours}h
            </Badge>
          </div>
        </div>

        {/* Progress indicator */}
        {sectionProgress.percentage > 0 && (
          <div className="mt-3">
            <div className="h-1.5 bg-primary/20 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  sectionProgress.percentage === 100
                    ? "bg-green-500"
                    : "bg-primary"
                )}
                style={{ width: `${sectionProgress.percentage}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>

      {/* Collapsible content */}
      {isExpanded && (
        <CardContent
          id={`section-${category.id}`}
          className="space-y-2 animate-in slide-in-from-top-2 duration-300"
        >
          {category.topics.map((topic) => (
            <RoadmapNode key={topic.id} topic={topic} />
          ))}
        </CardContent>
      )}
    </Card>
  );
}
