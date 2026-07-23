/**
 * Learning Roadmap Data Structure
 * Each topic includes: id, title, estimated duration in hours
 * Categories are collapsible and include multiple topics
 */

export const learningRoadmapData = [
  {
    id: "html",
    title: "HTML Fundamentals",
    icon: "Code",
    topics: [
      { id: "html-1", title: "HTML Basics & Document Structure", duration: 2 },
      { id: "html-2", title: "Semantic HTML Elements", duration: 1.5 },
      { id: "html-3", title: "Forms and Input Types", duration: 2.5 },
      { id: "html-4", title: "HTML5 APIs & Features", duration: 2 },
      { id: "html-5", title: "Accessibility Best Practices", duration: 3 },
      { id: "html-6", title: "Meta Tags & SEO Basics", duration: 1.5 },
    ],
  },
  {
    id: "css",
    title: "CSS & Styling",
    icon: "Palette",
    topics: [
      { id: "css-1", title: "CSS Selectors & Specificity", duration: 2 },
      { id: "css-2", title: "Box Model & Positioning", duration: 3 },
      { id: "css-3", title: "Flexbox Layout", duration: 3 },
      { id: "css-4", title: "CSS Grid Layout", duration: 3.5 },
      { id: "css-5", title: "Responsive Design & Media Queries", duration: 4 },
      { id: "css-6", title: "CSS Animations & Transitions", duration: 3 },
      { id: "css-7", title: "CSS Variables & Custom Properties", duration: 2 },
      { id: "css-8", title: "Modern CSS (Container Queries, Subgrid)", duration: 3 },
      { id: "css-9", title: "CSS Preprocessors (Sass/SCSS)", duration: 2.5 },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript Fundamentals",
    icon: "Zap",
    topics: [
      { id: "js-1", title: "Variables, Data Types & Operators", duration: 3 },
      { id: "js-2", title: "Functions & Scope", duration: 3.5 },
      { id: "js-3", title: "Arrays & Array Methods", duration: 4 },
      { id: "js-4", title: "Objects & Prototypes", duration: 4 },
      { id: "js-5", title: "DOM Manipulation", duration: 4.5 },
      { id: "js-6", title: "Event Handling", duration: 3 },
      { id: "js-7", title: "Asynchronous JavaScript (Callbacks, Promises)", duration: 5 },
      { id: "js-8", title: "Async/Await & Fetch API", duration: 4 },
      { id: "js-9", title: "ES6+ Modern Features", duration: 4.5 },
      { id: "js-10", title: "Error Handling & Debugging", duration: 3 },
      { id: "js-11", title: "Modules (Import/Export)", duration: 2.5 },
      { id: "js-12", title: "Local Storage & Session Storage", duration: 2 },
    ],
  },
  {
    id: "react",
    title: "React.js",
    icon: "Atom",
    topics: [
      { id: "react-1", title: "React Components & JSX", duration: 4 },
      { id: "react-2", title: "Props & State Management", duration: 4.5 },
      { id: "react-3", title: "useState & useEffect Hooks", duration: 5 },
      { id: "react-4", title: "Event Handling in React", duration: 3 },
      { id: "react-5", title: "Conditional Rendering & Lists", duration: 3.5 },
      { id: "react-6", title: "Forms & Controlled Components", duration: 4 },
      { id: "react-7", title: "useContext & Context API", duration: 4.5 },
      { id: "react-8", title: "useReducer & Advanced State", duration: 4 },
      { id: "react-9", title: "Custom Hooks", duration: 5 },
      { id: "react-10", title: "React Router & Navigation", duration: 5 },
      { id: "react-11", title: "Performance Optimization (useMemo, useCallback)", duration: 4.5 },
      { id: "react-12", title: "React Testing Library", duration: 6 },
    ],
  },
  {
    id: "advanced-react",
    title: "Advanced React",
    icon: "Sparkles",
    topics: [
      { id: "adv-react-1", title: "Server Components (Next.js)", duration: 6 },
      { id: "adv-react-2", title: "State Management (Redux/Zustand)", duration: 8 },
      { id: "adv-react-3", title: "TypeScript with React", duration: 7 },
      { id: "adv-react-4", title: "React Query / SWR", duration: 5 },
      { id: "adv-react-5", title: "Suspense & Error Boundaries", duration: 4 },
      { id: "adv-react-6", title: "Code Splitting & Lazy Loading", duration: 3.5 },
    ],
  },
  {
    id: "tools",
    title: "Development Tools",
    icon: "Wrench",
    topics: [
      { id: "tools-1", title: "Git & Version Control", duration: 5 },
      { id: "tools-2", title: "Package Managers (npm/yarn)", duration: 2 },
      { id: "tools-3", title: "Webpack & Build Tools", duration: 6 },
      { id: "tools-4", title: "ESLint & Code Quality Tools", duration: 3 },
      { id: "tools-5", title: "Chrome DevTools & Debugging", duration: 4 },
      { id: "tools-6", title: "VS Code Extensions & Productivity", duration: 2 },
    ],
  },
  {
    id: "backend",
    title: "Backend Basics",
    icon: "Server",
    topics: [
      { id: "backend-1", title: "Node.js & Express.js Fundamentals", duration: 8 },
      { id: "backend-2", title: "RESTful API Design", duration: 6 },
      { id: "backend-3", title: "Database Basics (SQL & NoSQL)", duration: 10 },
      { id: "backend-4", title: "Authentication & Authorization", duration: 8 },
      { id: "backend-5", title: "API Security Best Practices", duration: 5 },
    ],
  },
  {
    id: "deployment",
    title: "Deployment & DevOps",
    icon: "Rocket",
    topics: [
      { id: "deploy-1", title: "Hosting & Deployment (Vercel, Netlify)", duration: 4 },
      { id: "deploy-2", title: "Environment Variables & Configuration", duration: 2.5 },
      { id: "deploy-3", title: "CI/CD Pipelines Basics", duration: 6 },
      { id: "deploy-4", title: "Docker Fundamentals", duration: 8 },
      { id: "deploy-5", title: "Cloud Platforms (AWS/Azure/GCP Intro)", duration: 10 },
    ],
  },
];

/**
 * Calculate total estimated hours for entire roadmap
 */
export function getTotalEstimatedHours() {
  return learningRoadmapData.reduce((total, category) => {
    return total + category.topics.reduce((sum, topic) => sum + topic.duration, 0);
  }, 0);
}

/**
 * Calculate remaining hours based on completed topics
 */
export function getRemainingHours(completedTopicIds = []) {
  return learningRoadmapData.reduce((total, category) => {
    return (
      total +
      category.topics.reduce((sum, topic) => {
        return completedTopicIds.includes(topic.id) ? sum : sum + topic.duration;
      }, 0)
    );
  }, 0);
}

/**
 * Get total number of topics
 */
export function getTotalTopicsCount() {
  return learningRoadmapData.reduce((total, category) => {
    return total + category.topics.length;
  }, 0);
}

/**
 * Get all topic IDs as a flat array
 */
export function getAllTopicIds() {
  return learningRoadmapData.flatMap((category) =>
    category.topics.map((topic) => topic.id)
  );
}
