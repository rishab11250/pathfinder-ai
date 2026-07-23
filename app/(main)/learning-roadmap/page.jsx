import { BookOpen, Sparkles } from "lucide-react";
import ProgressBar from "./_components/ProgressBar";
import RoadmapSection from "./_components/RoadmapSection";
import CompletionModal from "./_components/CompletionModal";
import { RoadmapProvider } from "@/contexts/RoadmapContext";
import { learningRoadmapData } from "@/lib/data/learning-roadmap-data";

export const metadata = {
  title: "Learning Roadmap | PathfinderAI",
  description: "Interactive learning roadmap with progress tracking for web development skills",
};

/**
 * Learning Roadmap Page
 * Interactive roadmap for learning web development
 * Features:
 * - Progress tracking with localStorage persistence
 * - Collapsible sections
 * - Completion celebration
 * - Responsive design
 * - Accessibility support
 */
export default function LearningRoadmapPage() {
  return (
    <RoadmapProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
          {/* Page header */}
          <div className="space-y-4 mb-12">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em]">
              <Sparkles className="h-3 w-3" />
              Interactive Learning
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-4">
                <BookOpen className="h-8 w-8 md:h-12 md:w-12 text-primary" />
                Learning <span className="text-gradient-primary">Roadmap</span>
              </h1>
              <p className="text-muted-foreground text-sm md:text-base font-medium mt-2">
                Master web development with our comprehensive, interactive roadmap. 
                Track your progress and celebrate your achievements along the way.
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-8">
            {/* Progress bar */}
            <ProgressBar />

            {/* Roadmap sections */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Learning Path
              </h2>
              
              <div className="space-y-4">
                {learningRoadmapData.map((category) => (
                  <RoadmapSection key={category.id} category={category} />
                ))}
              </div>
            </div>

            {/* Info card */}
            <div className="glass rounded-2xl p-6 border border-border/30">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-primary/10 shrink-0">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground">Tips for Success</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Learn at your own pace - time estimates are guidelines</li>
                    <li>Practice each concept with real projects</li>
                    <li>Your progress is saved automatically</li>
                    <li>Focus on understanding, not just completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completion celebration modal */}
        <CompletionModal />
      </div>
    </RoadmapProvider>
  );
}
