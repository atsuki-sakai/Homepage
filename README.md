# Kondax Inc. Corporate Website

This is the official corporate website for Kondax Inc., a modern, responsive, and multilingual web application.

## ✨ Features

-   **Internationalization (i18n)**: Fully supports English and Japanese.
-   **Content Management**: Headless CMS powered by [Sanity](https://www.sanity.io/) for easy content updates.
-   **MDX Support**: Blog posts and case studies are written in MDX, allowing for rich content and embedded components.
-   **Responsive Design**: Optimized for all screen sizes, from mobile to desktop.
-   **SEO Optimized**: Pre-configured with `next-sitemap` for automatic sitemap generation.

## 🚀 Technologies Used

-   **Framework**: [Next.js 15](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **CMS**: [Sanity](https://www.sanity.io/)
-   **i18n**: [next-intl](https://next-intl-docs.vercel.app/)

## 📦 Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Set up your environment variables by creating a `.env` file from the `.env.example`. You will need to add your Sanity project details.

### Development

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🛠️ Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production and generates a sitemap.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the code using ESLint.

## 📂 Project Structure

```
.
├── sanity-cms/         # Sanity Studio project for content management
├── src/
│   ├── app/
│   │   └── [locale]/   # Internationalized pages (en, ja)
│   ├── components/     # Reusable React components
│   ├── i18n/           # Internationalization configuration
│   ├── lib/            # Helper functions and utilities (Sanity client, etc.)
│   └── styles/         # Global CSS styles
└── public/             # Static assets
```

## Sanity CMS

The content for this website is managed using Sanity. The Sanity Studio is a separate project located in the `sanity-cms` directory.

To run the Sanity Studio locally:

1.  Navigate to the `sanity-cms` directory:
    ```bash
    cd sanity-cms
    ```
2.  Install its dependencies:
    ```bash
    npm install
    ```
3.  Start the Sanity Studio development server:
    ```bash
    npm run dev
    ```

## 📄 License

This project is the property of Kondax Inc.
