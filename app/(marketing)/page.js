"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight, FileText, Target, Star, CheckCircle, TrendingUp, BarChart2, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import HeroStats from "@/components/HeroStats";
import { GlobalScrollTracker } from "@/components/GlobalScrollTracker";
import { ScrollStory } from "@/components/sections/ScrollStory";

import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { CTASection } from "@/components/sections/CTASection";
import { OpenSourceCommunity } from "@/components/sections/OpenSourceCommunity";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { TiltCard } from "@/components/motion/tilt-card";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { faqs } from "@/data/faqs";
import { Resume3DHero } from "@/components/landing/resume-3d-hero";
import { AnimatedBackground } from "@/components/landing/animated-background";
import { FeaturesGrid, PricingGrid, Testimonials, FAQ } from "@/components/landing/premium-sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollToTop from "@/components/ui/Scrolltotop";

export default function LandingPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.95]);

  const handleDashboard = () => {
    router.push(isSignedIn ? "/dashboard" : "/sign-in");
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatedBackground />
      <GlobalScrollTracker />
      
      {/* ------------- HERO SECTION ------------- */}
      <section id="hero" className="relative min-h-[100vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="w-full">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Column */}
              <div className="space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 shadow-sm"
                >
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/80 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-primary" />
                    AI-Powered Career Platform
                  </span>
                </motion.div>

                <div className="space-y-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-foreground"
                  >
                    Your Career,
                    <br />
                    <span className="text-gradient-primary">Amplified by AI.</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg"
                  >
                    From resume optimization to interview mastery, PathFinder AI gives you the tools to accelerate your career with artificial intelligence.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row items-start gap-4"
                >
                  <MagneticButton asChild>
                    <Button
                      size="lg"
                      onClick={handleDashboard}
                      className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40 font-bold group text-base"
                    >
                      Launch Your Career
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </MagneticButton>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="h-14 px-8 rounded-2xl glass hover:bg-muted/50 border-border/50 transition-all duration-300 font-bold group text-base"
                  >
                    Explore Features
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-6 text-xs text-muted-foreground"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-background bg-muted/50 flex items-center justify-center text-[10px] font-bold text-muted-foreground"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span>Trusted by 10,000+ professionals</span>
                </motion.div>
              </div>

              {/* Right Column - 3D Resume Card Hero */}
              <Resume3DHero />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ------------- SCROLL STORY ------------- */}
      <ScrollStory />

      {/* ------------- FEATURES SECTION ------------- */}
      <section id="features" className="relative py-20 md:py-32 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="max-w-4xl mx-auto text-center mb-24 space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary">
              <Sparkles className="h-3 w-3" />
              AI-Powered Tools
            </span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground">
              Everything You Need for{" "}
              <span className="text-gradient-primary">Career Success</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From resume optimization to interview mastery, our suite of AI tools gives you the competitive edge to land your dream role.
            </p>
          </FadeUp>

          <FeaturesGrid className="max-w-6xl mx-auto" />
        </div>
      </section>

      {/* The individual feature sections (Roadmap, Resume, Interview, SkillGap) have been unified into the ScrollStory component above. */}

      {/* ------------- HOW IT WORKS ------------- */}
      <section id="how-it-works" className="relative py-8 md:py-12 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="max-w-3xl mx-auto text-center mb-20 space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary">
              Process
            </span>
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-foreground">
              Four Steps to{" "}
              <span className="text-gradient-primary">Success</span>
            </h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 -z-10" />
            {howItWorks.map((step, i) => (
              <StaggerItem key={step.title}>
                <TiltCard tiltDegree={4} className="flex flex-col items-center text-center space-y-5">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-2xl bg-background border border-border/50 flex items-center justify-center shadow-lg">
                      <div className="text-primary">{step.icon}</div>
                    </div>
                    <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-lg border-2 border-background">
                      {i + 1}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold tracking-tight text-foreground">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px]">{step.description}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ------------- STATS SECTION ------------- */}
      <section id="stats" className="relative py-8 md:py-12 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp>
            <HeroStats />
          </FadeUp>
        </div>
      </section>

      {/* ------------- TESTIMONIALS ------------- */}
      <section id="testimonials" className="relative py-20 md:py-32 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="max-w-3xl mx-auto text-center mb-24 space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary">
              <Sparkles className="h-3 w-3" />
              Success Stories
            </span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground">
              Join 10,000+{" "}
              <span className="text-gradient-primary">Career Winners</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from professionals who transformed their careers with PathFinder AI.
            </p>
          </FadeUp>

          <Testimonials className="max-w-6xl mx-auto" />
        </div>
      </section>

      {/* ------------- PRICING ------------- */}
      <section id="pricing" className="relative py-20 md:py-32 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="max-w-3xl mx-auto text-center mb-24 space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary">
              <Sparkles className="h-3 w-3" />
              Pricing Plans
            </span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground">
              Choose Your{" "}
              <span className="text-gradient-primary">Perfect Plan</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free, upgrade as you grow. No credit card required.
            </p>
          </FadeUp>

          <PricingGrid className="max-w-6xl mx-auto" />
        </div>
      </section>

      <section
  id="about"
  className="relative py-20 scroll-mt-20"
>
  <div className="container mx-auto px-4 md:px-6">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6">
        About PathFinder AI
      </h2>

      <p className="text-muted-foreground text-lg">
        PathFinder AI is an AI-powered career platform
        that helps professionals optimize resumes,
        prepare for interviews, analyze skill gaps,
        and accelerate career growth.
      </p>
    </div>
  </div>
</section>

      {/* ------------- FAQ ------------- */}
      <section id="question" className="relative py-20 md:py-32 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="max-w-3xl mx-auto text-center mb-24 space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary">
              <Sparkles className="h-3 w-3" />
              FAQ
            </span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground">
              Common{" "}
              <span className="text-gradient-primary">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We&apos;ve got answers. Browse our most frequently asked questions below.
            </p>
          </FadeUp>

          <FAQ className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* ------------- CTA ------------- */}
      <CTASection />

      <OpenSourceCommunity />

      <ScrollToTop />
    </div>
  );
}
