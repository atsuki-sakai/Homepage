import { getLightHighlighter } from './CodeBlock'

export default async function InlineCode({ text }: { text: string }) {
  // <br> を改行に正規化し、複数行を許容
  const normalized = text.replace(/<br\s*\/?>/gi, '\n')
  const lang = /<\/?[a-zA-Z]/.test(normalized) ? 'html' : 'text'
  const highlighter = await getLightHighlighter()
  const html = highlighter.codeToHtml(normalized, { lang })
  // Shiki の出力は <pre class="shiki"><code>…</code></pre>
  let inner = html.match(/<code[^>]*>([\s\S]*?)<\/code>/)?.[1] ?? normalized
  // 行スパンを改行に変換（インライン表示で行を保つ）
  inner = inner.replace(/<span class=\"line\">([\s\S]*?)<\/span>/g, '$1\n')
  return (
    <code className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: inner }} />
  )
}
