"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Sparkles, PartyPopper } from "lucide-react";
import { useRoadmap } from "@/contexts/RoadmapContext";
import { motion } from "framer-motion";

/**
 * CompletionModal Component
 * Shows a celebration modal when 100% progress is reached
 * - Only displays once until progress changes
 * - Framer Motion celebration animation
 * - Confetti-like visual effects
 */
export default function CompletionModal() {
  const { shouldShowCelebration, markCelebrationShown, stats } = useRoadmap();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (shouldShowCelebration) {
      setIsOpen(true);
    }
  }, [shouldShowCelebration]);

  const handleClose = () => {
    setIsOpen(false);
    markCelebrationShown();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Roadmap Completed</DialogTitle>
          <DialogDescription className="sr-only">
            Congratulations on completing the learning roadmap!
          </DialogDescription>
        </DialogHeader>

        <div className="relative overflow-hidden">
          {/* Animated celebration elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{
                  x: "50%",
                  y: "50%",
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                {i % 3 === 0 ? "🎉" : i % 3 === 1 ? "✨" : "🎊"}
              </motion.div>
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-6 py-8">
            {/* Animated trophy */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="relative"
            >
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl shadow-yellow-500/50">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              
              {/* Sparkle effects around trophy */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="h-5 w-5 text-yellow-400" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              >
                <Sparkles className="h-5 w-5 text-orange-400" />
              </motion.div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <h2 className="text-3xl font-extrabold text-foreground flex items-center justify-center gap-2">
                <PartyPopper className="h-6 w-6 text-primary" />
                Congratulations!
                <PartyPopper className="h-6 w-6 text-primary" />
              </h2>
              <p className="text-muted-foreground text-base max-w-sm">
                You've completed the entire learning roadmap! You've mastered{" "}
                <span className="font-bold text-foreground">
                  {stats.totalTopics} topics
                </span>{" "}
                covering{" "}
                <span className="font-bold text-foreground">
                  {stats.totalHours} hours
                </span>{" "}
                of content.
              </p>
            </motion.div>

            {/* Motivational message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20"
            >
              <p className="text-sm text-foreground/90 font-medium">
                "The journey of a thousand miles begins with a single step. You've taken them all!" 🚀
              </p>
            </motion.div>

            {/* Close button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                onClick={handleClose}
                size="lg"
                className="rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
