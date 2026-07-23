"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Clock, CheckCircle2, Target } from "lucide-react";
import { useRoadmap } from "@/contexts/RoadmapContext";

/**
 * ProgressBar Component
 * Displays overall progress with statistics:
 * - Progress percentage
 * - Completed/total topics count
 * - Total estimated hours
 * - Remaining hours
 */
export default function ProgressBar() {
  const { stats } = useRoadmap();

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Progress header */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">
                Learning Progress
              </h2>
            </div>
            <div className="flex items-center gap-2 text-2xl font-extrabold text-primary">
              {stats.progress}%
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <Progress 
              value={stats.progress} 
              className="h-3 bg-primary/20"
            />
            <p className="text-xs text-muted-foreground text-right">
              {stats.completedCount} of {stats.totalTopics} topics completed
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/50">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="text-sm font-bold text-foreground">
                  {stats.completedCount} topics
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/50">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Time</p>
                <p className="text-sm font-bold text-foreground">
                  {stats.totalHours}h
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/50">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Target className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Remaining</p>
                <p className="text-sm font-bold text-foreground">
                  {stats.remainingHours}h
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
