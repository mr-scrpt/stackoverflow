'use client'
import parse from 'html-react-parser'
import Prism from 'prismjs'
import { FC, HTMLAttributes, useEffect } from 'react'
import { Element } from 'domhandler'

import 'prismjs/components/prism-aspnet'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-mongodb'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-r'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-solidity'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-typescript'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'

interface ParseHTMLProps extends HTMLAttributes<HTMLDivElement> {
  data: string
  withOutCode?: boolean
}

export const ParseHTML: FC<ParseHTMLProps> = (props) => {
  const { data, withOutCode = false } = props

  // const [mounted, setMounted] = useState(false)

  const codeHTML = parse(data, {
    replace(domNode) {
      if (
        withOutCode &&
        domNode instanceof Element &&
        domNode.attribs &&
        domNode.attribs.class === 'language-markup'
      ) {
        return <></>
      }
    },
  })

  useEffect(() => {
    Prism.highlightAll()
  }, [codeHTML])

  return <div className="markdown w-full min-f-full">{codeHTML}</div>
}
