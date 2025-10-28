import type MarkdownIt from 'markdown-it'
import type * as Katex from 'katex'

declare module 'markdown-it-texmath' {
  export interface Options {
    engine?: typeof Katex
    delimiters?: 'dollars' | 'brackets' | 'gitlab' | 'julia' | 'auto'
    [key: string]: unknown
  }

  const plugin: (md: MarkdownIt, options?: Options) => void
  export default plugin
}
