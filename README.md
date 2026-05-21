<h1 align="center">🧠💼 PathFinder AI</h1>

<p align="center">
  <strong>Your AI-Powered Career Coach & Resume Builder</strong>
</p>

<p align="center">
  Build professional resumes, generate tailored cover letters, prepare for interviews, and accelerate your career using AI-powered workflows.
</p>

<p align="center">
  <a href="https://pathfinder-ai.vercel.app">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-000000?style=for-the-badge" />
  </a>

  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
  </a>

  <img src="https://img.shields.io/badge/Open_Source-GSSoC'26-blueviolet?style=for-the-badge" />

  <img src="https://img.shields.io/badge/PRs-Welcome-orange?style=for-the-badge" />

  <img src="https://img.shields.io/badge/Maintained-Yes-success?style=for-the-badge" />
</p>

---

# 📸 Project Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/harshdwivediiiii/pathfinder-ai/main/public/pathfinder-ai.gif" alt="PathFinder AI Preview" width="100%" />
</p>

---

# 🌟 About PathFinder AI

PathFinder AI is an intelligent AI-powered career platform designed to help students, developers, and professionals create ATS-friendly resumes, generate personalized cover letters, and prepare for interviews with adaptive AI assistance.

Whether you're applying for internships, jobs, or career transitions, PathFinder AI acts as your personalized AI career companion.

---

# 🌐 Live Demo

<p align="center">
  <a href="https://pathfinder-ai.vercel.app">
    <img src="https://img.shields.io/badge/🚀_Launch_PathFinder_AI-black?style=for-the-badge" />
  </a>
</p>

---

# ✨ Core Features

## 📄 AI Resume Builder

Create modern, ATS-optimized resumes tailored to job descriptions and industry standards.

### Features
- AI-generated resume content
- ATS-friendly formatting
- Smart section generation
- Experience optimization
- Resume customization

---

## ✉️ AI Cover Letter Generator

Generate personalized cover letters using AI based on role, company, and tone preferences.

### Features
- Tone customization
- Role-specific generation
- AI-enhanced writing
- Personalized introductions
- Professional formatting

---

## 🎯 AI Interview Preparation

Practice technical and HR interview questions with adaptive AI-generated scenarios.

### Features
- Role-based interview questions
- Behavioral interview preparation
- Technical practice questions
- AI-generated feedback
- Personalized difficulty levels

---

## 📊 Industry Insights

Get career intelligence powered by AI and market trends.

### Features
- Salary insights
- Trending technologies
- In-demand skills
- Industry analysis
- Career recommendations

---

## 🔐 Secure Authentication

Secure user authentication and onboarding powered by Clerk.

### Features
- Clerk authentication
- Protected routes
- Session management
- Secure onboarding flow
- User dashboard access

---

# 🧩 Application Workflow

```text
User Input
   ↓
AI Processing (Gemini API)
   ↓
Resume / Cover Letter / Interview Generation
   ↓
Database Storage (PostgreSQL + Prisma)
   ↓
Dashboard Rendering
   ↓
Personalized Career Experience
```

---

# 🛠️ Tech Stack

| Category | Technology |
|----------|-------------|
| Framework | Next.js 14 (App Router) |
| Authentication | Clerk.dev |
| AI Engine | Gemini API (Google AI) |
| Database | PostgreSQL + Prisma ORM |
| Styling | TailwindCSS + ShadCN UI |
| Deployment | Vercel |
| Language | JavaScript / TypeScript |

---

# 🚀 Tech Badges

<p align="center">

<img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs" />

<img src="https://img.shields.io/badge/Gemini_API-Google_AI-red?style=for-the-badge&logo=google" />

<img src="https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" />

<img src="https://img.shields.io/badge/Prisma-ORM-3982CE?style=for-the-badge&logo=prisma&logoColor=white" />

<img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql" />

<img src="https://img.shields.io/badge/Clerk-Authentication-purple?style=for-the-badge" />

<img src="https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel" />

</p>

---

# 📂 Project Structure

```bash
pathfinder-ai/
│── app/
│── components/
│── lib/
│── prisma/
│── public/
│── styles/
│── utils/
│── hooks/
│── constants/
│── package.json
│── README.md
```

---

# ⚡ Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/harshdwivediiiii/pathfinder-ai.git
cd pathfinder-ai
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env.local` file in the root directory and add:

```env
DATABASE_URL=your_postgresql_connection_string

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=your_gemini_api_key
```

---

# 🧪 Developer Notes (Clerk Keyless Mode)

When developing locally, Clerk can run in keyless mode without authentication keys.

In this mode:
- Protected routes redirect safely
- Authentication won't crash locally
- Great for frontend development

For full functionality, configure:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

---

# 🗄️ Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

---

# ▶️ Start Development Server

```bash
npm run dev
```

Visit:

```bash
http://localhost:3000
```

---

# 🤖 AI Capabilities

PathFinder AI uses Gemini AI for:

- Resume bullet generation
- Cover letter writing
- Interview question generation
- Career recommendations
- Personalized AI workflows

AI prompts are dynamically optimized using:
- User input
- Role descriptions
- Tone preferences
- Industry context

---

# 📱 Responsive Design

PathFinder AI is fully optimized for:

- 💻 Desktop
- 📱 Mobile
- 📲 Tablets
- 🌐 Cross-browser support

---

# 🌟 Open Source & GSSoC'26

We warmly welcome contributors from all backgrounds ❤️

PathFinder AI actively supports:
- GSSoC 2026
- Open-source collaboration
- Beginner-friendly contributions
- Community-driven development

---

# 🤝 Contributing

We welcome all contributions 🚀

## Steps to Contribute

### 1️⃣ Fork the Repository

Click the **Fork** button at the top-right corner.

---

### 2️⃣ Clone Your Fork

```bash
git clone https://github.com/your-username/pathfinder-ai.git
```

---

### 3️⃣ Create a Branch

```bash
git checkout -b feature/your-feature-name
```

---

### 4️⃣ Make Changes

Follow the project structure and coding standards.

---

### 5️⃣ Commit Changes

```bash
git commit -m "feat: add amazing feature"
```

---

### 6️⃣ Push to GitHub

```bash
git push origin feature/your-feature-name
```

---

### 7️⃣ Create Pull Request

Open a PR with:
- Clear description
- Related issue
- Screenshots (if UI changes)

---

# 📌 Contribution Guidelines

Before submitting your PR:

- ✅ Ensure code quality
- ✅ Test your changes locally
- ✅ Maintain responsiveness
- ✅ Follow existing coding patterns
- ✅ Avoid unnecessary dependencies
- ✅ Update documentation if required

---

# 🏷️ GitHub Labels

| Label | Meaning |
|------|----------|
| good first issue | Beginner-friendly tasks |
| documentation | README/docs improvements |
| enhancement | Feature improvements |
| bug | Bug fixes |
| frontend | Frontend-related tasks |
| backend | Backend/API tasks |
| ai | AI-related improvements |
| help wanted | Maintainer needs help |

---

# 📖 Beginner-Friendly Contributions

New contributors can start with:

- Documentation improvements
- UI polishing
- Mobile responsiveness
- Accessibility fixes
- Error handling
- Loading skeletons
- AI prompt improvements
- Testing

---

# 🚀 Future Roadmap

- 📄 Resume PDF export improvements
- 🤖 Smarter AI recommendations
- 📊 Resume analytics dashboard
- 🌍 Multi-language support
- 📱 Mobile app version
- 🧠 AI career roadmap generator
- 🎥 AI mock interview simulation
- 📈 Performance optimizations
- 🔔 Real-time notifications

---

# 🏆 Contributor Recognition

All contributors are appreciated ❤️

## Contributors Receive

- README recognition
- Community mentions
- Open-source collaboration opportunities
- Potential collaborator roles

---

# ❤️ Contributors

<p align="center">
  <a href="https://github.com/harshdwivediiiii/pathfinder-ai/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=harshdwivediiiii/pathfinder-ai" />
  </a>
</p>

---

# 🤝 Code of Conduct

Please be respectful and collaborative.

We aim to maintain a welcoming, beginner-friendly, and inclusive open-source environment.

---

# 📄 License

This project is licensed under the MIT License.

---

# ✉️ Contact

## Maintainer

📧 harshvardhandwivedi18@gmail.com

---

# 🌐 Deployment

Deploy instantly on Vercel:

```bash
https://vercel.com/new
```

Next.js Deployment Documentation:

```bash
https://nextjs.org/docs/app/building-your-application/deploying
```

---

# 🌍 Support the Project

If you like PathFinder AI:

- ⭐ Star the repository
- 🍴 Fork the project
- 🧑‍💻 Contribute to open source
- 🚀 Join during GSSoC'26
- 📢 Share with developers

---

<h3 align="center">
✨ PathFinder AI — Smart Careers Start Here ✨
</h3>