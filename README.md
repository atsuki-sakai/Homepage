# Kondax Inc. Corporate Website

This is the official corporate website for Kondax Inc.

## Overview

This project is a modern, responsive corporate website built with the following technologies:

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **CMS**: [Sanity](https://www.sanity.io/)
-   **Internationalization (i18n)**: Supported for English and Japanese.

## Getting Started

### Prerequisites

-   Node.js
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Set up your environment variables. You will need to create a `.env` file and add the necessary Sanity and other environment variables.

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Sanity CMS

The content for this website is managed using Sanity. The Sanity Studio is located in the `sanity-cms` directory.

To run the Sanity Studio locally, navigate to the `sanity-cms` directory and run:

```bash
cd sanity-cms
npm install
sanity dev
```

## License

This project is the property of Kondax Inc.