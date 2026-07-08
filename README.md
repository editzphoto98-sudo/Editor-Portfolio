# Yogita Singh - Video Editor & Designer Portfolio

<div align="center">

### Yogita Singh - Video Editor & Designer Portfolio
*A premium, responsive video editing portfolio built with modern web technologies.*

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

[**🌐 Live Website**](https://github.com/editzphoto98-sudo/Editor-Portfolio)

</div>

## ✨ Design Philosophy: Midnight Liquid Glass

This project implements a unique **"Midnight Liquid Glass"** aesthetic, focusing on deep blacks, neon accents, and organic fluidity.

-   **Frosted Glass 2.0**: Premium `backdrop-blur-3xl` with milky-white tint for distinct separation.
-   **Unified Liquid Navigation**: A shapeshifting navbar that fluidly expands to contain mobile menus.
-   **Dynamic Interactions**: Mouse-following gradients and spotlight effects.
-   **Day & Night Mode**: Switch between premium cinematic dark theme and professional high-contrast light theme.
-   **Video Integrations**: Playable video grids showcasing direct Google Drive/YouTube embeds without sluggish page loads.

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- pnpm or npm package manager

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/editzphoto98-sudo/Editor-Portfolio.git
    cd Editor-Portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    ```bash
    cp .env.example .env
    ```
    Add your environment variables:
    ```env
    RESEND_API_KEY=your_resend_api_key_here
    NEXT_PUBLIC_SITE_URL=https://github.com/editzphoto98-sudo/Editor-Portfolio
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open your browser**
    Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

## 📂 Project Structure

```plaintext
📦Editor-Portfolio
 ┣ 📂public
 ┃ ┣ 📂project-images
 ┃ ┣ 📂tools
 ┃ ┣ 📜yogitasingh.jpg
 ┃ ┗ 📜not-found.jpg
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂about
 ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┗ 📂send-email
 ┃ ┃ ┣ 📂contact
 ┃ ┃ ┣ 📂project
 ┃ ┃ ┣ 📂skills
 ┃ ┃ ┣ 📜globals.css
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂ui
 ┃ ┃ ┣ 📜CTASection.tsx
 ┃ ┃ ┣ 📜footer.tsx
 ┃ ┃ ┣ 📜glassmorphism-card.tsx
 ┃ ┃ ┣ 📜navbar.tsx
 ┃ ┃ ┗ 📜theme-provider.tsx
 ┃ ┣ 📂db
 ┃ ┃ ┣ 📜clients.ts
 ┃ ┃ ┗ 📜projects.ts
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📜helper.ts
 ┃ ┃ ┗ 📜utils.ts
 ┃ ┗ 📂types
 ┃ ┃ ┗ 📜videos.ts
```

### 📝 Adding New Video Projects

To add a new project, edit `src/db/projects.ts`:

```typescript
export const allVideoProjects: VideoProject[] = [
  {
    id: "unique-video-id",
    video_title: "Your Video Title",
    video_description: "Detailed description...",
    tags: ["Tag1", "Tag2"],
    cover_image: "/project-images/your-thumbnail.jpg",
    publish_date: "2026-07-08",
    client_name: "Client Name",
    client_image: "/yogitasingh.jpg",
    client_feedback: "Client testimonial...",
    video_link: "https://youtu.be/video-id",
    project_images: [],
    category: ["Event Highlight"],
    duration: "5:30",
    software_used: ["Adobe Premiere Pro", "Adobe After Effects"],
  },
];
```

## 🛠️ Tech Stack

-   **Core**: Next.js 15, TypeScript
-   **Styling**: Tailwind CSS, Shadcn/ui
-   **Animation**: Framer Motion
-   **Backend**: Resend (Email), Server Actions
