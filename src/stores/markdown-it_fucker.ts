import { defineStore } from 'pinia'
import MarkdownIt from 'markdown-it'
import mdHighlight from 'markdown-it-highlightjs'
import anchor from 'markdown-it-anchor'
import hljs from 'highlight.js'
import { computed } from 'vue'

export const userMarkDownFucker = defineStore('mdFucker', {
  state() {
    return {
      mdParser: new MarkdownIt({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true,
        highlight: (str, lang) => {
          // 代码高光配置语言显示
          if (lang && hljs.getLanguage(lang)) {
            return `<pre><code class="hljs language-${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`
          } else {
            return `<pre><code class="hljs">${str}</code></pre>`
          }
        },
      })
        .use(mdHighlight, {
          hljs: hljs,
        })
        .use(anchor, {
          slugify: (str) => {
            str = str.replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            // console.log(str);
            return str
          },
        }),
    }
  },

  actions: {
    reParseMarkDown() {
      const imageRender = this.mdParser.renderer.rules.image //图片
      const codelineRender = this.mdParser.renderer.rules.code_inline
      const codeblockRender = this.mdParser.renderer.rules.fence

      this.mdParser.renderer.rules.image = (tokens, idx, options, env, self) => {
        const image_ele = imageRender ? imageRender(tokens, idx, options, env, self) : ''

        const altText = tokens[idx].content || 'image'
        // return `<img src="${src}" alt="${alt}" />`;
        return `<div class = "markdown-image-container" data-alt="${altText}">${image_ele}<span>${altText}<span></div>` //还得自己包裹，真傻逼
      }

      // 行内代码
      this.mdParser.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        const code_ele = codelineRender ? codelineRender(tokens, idx, options, env, self) : ''

        return `<span class="inline-code">${code_ele}</span>`
      }

      // 代码块
      this.mdParser.renderer.rules.code_block = (tokens, idx, options, env, self) => {
        const codeblock_ele = codeblockRender
          ? codeblockRender(tokens, idx, options, env, self)
          : ''
        // const token = tokens[idx];
        // const lang = token.info ? token.info.trim() : 'plaintext';

        // token.attrJoin('class', 'code-block');

        // token.attrSet('data-lang', lang);

        // // 代码块html
        // console.log(lang)

        return `<div class="code-block"><div class="code-block-title"></div> ${codeblock_ele} </div>`
      }
      // 表格 拼装

      this.mdParser.renderer.rules.table_open = function (tokens, idx, options, env, self) {
        const token = tokens[idx]

        token.attrJoin('class', 'custom-table')

        const tableOpenTag = `<table${self.renderAttrs(token)}>`

        return `<div class="table-container">${tableOpenTag}`
      }

      this.mdParser.renderer.rules.table_close = function (tokens, idx, options, env, self) {
        return `</table></div>`
      }

      this.mdParser.renderer.rules.th_open = function (tokens, idx, options, env, self) {
        const token = tokens[idx]
        token.attrJoin('class', 'table-header-cell')

        return `<th${self.renderAttrs(token)}>`
      }

      //添加类名 + 对齐处理（逻辑不变）
      this.mdParser.renderer.rules.td_open = function (tokens, idx, options, env, self) {
        const token = tokens[idx]
        token.attrJoin('class', 'table-data-cell')

        const align = token.attrGet('align')
        if (align) {
          token.attrJoin('class', `align-${align}`)
        }

        return `<td${self.renderAttrs(token)}>`
      }
    },
    // 不使用
    computed: {
      getHtml(markdown: string) {
        return this.mdParser.render(markdown)
      },
    },
  },
})
