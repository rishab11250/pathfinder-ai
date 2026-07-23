"use client";

import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { 
  getTotalEstimatedHours, 
  getRemainingHours, 
  getTotalTopicsCount 
} from "@/lib/data/learning-roadmap-data";

const RoadmapContext = createContext(undefined);

/**
 * RoadmapProvider manages the global state for the learning roadmap
 * - Completed topics (persisted in localStorage)
 * - Expanded/collapsed sections (persisted in localStorage)
 * - Progress calculations
 * - Completion celebration state
 */
export function RoadmapProvider({ children }) {
  // Persist completed topic IDs
  const [completedTopics, setCompletedTopics] = useLocalStorage(
    "learning-roadmap-completed",
    []
  );

  // Persist expanded/collapsed state for each section
  const [expandedSections, setExpandedSections] = useLocalStorage(
    "learning-roadmap-expanded",
    {}
  );

  // Track if completion modal has been shown for current 100% state
  const [celebrationShown, setCelebrationShown] = useLocalStorage(
    "learning-roadmap-celebration-shown",
    false
  );

  // Calculate progress statistics
  const stats = useMemo(() => {
    const totalTopics = getTotalTopicsCount();
    const completedCount = completedTopics.length;
    const progress = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
    const totalHours = getTotalEstimatedHours();
    const remainingHours = getRemainingHours(completedTopics);
    const completedHours = totalHours - remainingHours;

    return {
      totalTopics,
      completedCount,
      progress,
      totalHours,
      remainingHours,
      completedHours,
    };
  }, [completedTopics]);

  // Toggle topic completion
  const toggleTopic = useCallback(
    (topicId) => {
      setCompletedTopics((prev) => {
        if (prev.includes(topicId)) {
          // Remove from completed
          return prev.filter((id) => id !== topicId);
        } else {
          // Add to completed
          return [...prev, topicId];
        }
      });
      
      // Reset celebration flag when progress changes
      if (stats.progress === 100) {
        setCelebrationShown(false);
      }
    },
    [setCompletedTopics, setCelebrationShown, stats.progress]
  );

  // Check if a topic is completed
  const isTopicCompleted = useCallback(
    (topicId) => {
      return completedTopics.includes(topicId);
    },
    [completedTopics]
  );

  // Toggle section expanded/collapsed state
  const toggleSection = useCallback(
    (sectionId) => {
      setExpandedSections((prev) => ({
        ...prev,
        [sectionId]: !prev[sectionId],
      }));
    },
    [setExpandedSections]
  );

  // Check if a section is expanded
  const isSectionExpanded = useCallback(
    (sectionId) => {
      // Default to expanded if not set
      return expandedSections[sectionId] !== false;
    },
    [expandedSections]
  );

  // Mark celebration as shown
  const markCelebrationShown = useCallback(() => {
    setCelebrationShown(true);
  }, [setCelebrationShown]);

  // Check if should show celebration
  const shouldShowCelebration = useMemo(() => {
    return stats.progress === 100 && !celebrationShown;
  }, [stats.progress, celebrationShown]);

  const value = {
    completedTopics,
    stats,
    toggleTopic,
    isTopicCompleted,
    expandedSections,
    toggleSection,
    isSectionExpanded,
    shouldShowCelebration,
    markCelebrationShown,
  };

  return (
    <RoadmapContext.Provider value={value}>
      {children}
    </RoadmapContext.Provider>
  );
}

/**
 * Hook to use the Roadmap context
 * Must be used within RoadmapProvider
 */
export function useRoadmap() {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error("useRoadmap must be used within a RoadmapProvider");
  }
  return context;
}
