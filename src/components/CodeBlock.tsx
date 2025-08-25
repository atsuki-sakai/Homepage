import { getHighlighter, type Highlighter } from 'shiki'

let darkHighlighterPromise: Promise<Highlighter> | null = null
let lightHighlighterPromise: Promise<Highlighter> | null = null

export function getDarkHighlighter() {
  if (!darkHighlighterPromise) {
    darkHighlighterPromise = getHighlighter({ theme: 'github-dark' })
  }
  return darkHighlighterPromise
}

export function getLightHighlighter() {
  if (!lightHighlighterPromise) {
    lightHighlighterPromise = getHighlighter({ theme: 'github-light' })
  }
  return lightHighlighterPromise
}

export default async function CodeBlock({
  code,
  language,
}: {
  code?: string
  language?: string
}) {
  const highlighter = await getDarkHighlighter()
  const html = highlighter.codeToHtml(code ?? '', { lang: language ?? 'text' })

  return (
    // Shiki は <pre class="shiki">... を返すので、そのまま埋め込み
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}
