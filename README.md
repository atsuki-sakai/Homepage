# KONDAX Corporate Website

システム開発・AI導入・業務自動化を支援するKONDAXの公式コーポレートサイトです。
最新のNext.js技術とヘッドレスCMSを活用した高性能な多言語対応Webアプリケーションです。

## ✨ 主な機能

-   **多言語対応 (i18n)**: 日本語・英語の完全対応、URLベースの言語切り替え
-   **ヘッドレスCMS**: [Sanity](https://www.sanity.io/)による柔軟かつ多言語対応のコンテンツ管理
-   **MDXサポート**: ブログ記事・導入事例をMDXで記述、リッチコンテンツに対応
-   **レスポンシブデザイン**: モバイルからデスクトップまで最適化されたUI/UX
-   **SEO最適化**: `next-sitemap`による自動サイトマップ生成、メタデータ対応、GoogleAnalytics対応
-   **高性能**: Next.js App RouterとReact 19による最新アーキテクチャ

## 🚀 技術スタック

### フロントエンド
-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Library**: [React 19](https://react.dev/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)

### バックエンド・CMS
-   **CMS**: [Sanity](https://www.sanity.io/) (Project ID: t62e3xha)
-   **i18n**: [next-intl](https://next-intl-docs.vercel.app/)
-   **Email**: [Resend](https://resend.com/)

### 開発・ツール
-   **Code Quality**: ESLint + Prettier
-   **Content**: MDX with Shiki syntax highlighting
-   **Analytics**: Google Analytics 4

## 📦 開発環境セットアップ

### 前提条件

-   Node.js (v18以上推奨)
-   npm または yarn

### インストール

1.  リポジトリをクローン:
    ```bash
    git clone https://github.com/atsuki-sakai/kondax_hp.git
    cd kondax_hp
    ```

2.  依存関係をインストール:
    ```bash
    npm install
    ```

3.  環境変数を設定 (`.env`ファイルを作成):
    ```bash
    # Sanity CMS
    NEXT_PUBLIC_SANITY_PROJECT_ID='t62e3xha'
    NEXT_PUBLIC_SANITY_STUDIO_DATASET='production'
    NEXT_PUBLIC_SANITY_STUDIO_API_VERSION='2025-07-23'
    
    # その他の設定
    NEXT_PUBLIC_BASE_URL='https://kondax.com'
    RESEND_API_KEY='your-resend-api-key'
    NEXT_PUBLIC_GA_ID='your-ga-id'
    ```

### 開発サーバー起動

メインアプリケーション:
```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

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
