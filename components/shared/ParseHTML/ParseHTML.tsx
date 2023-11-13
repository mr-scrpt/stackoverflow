'use client'
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import Prism from 'prismjs'
import parse from 'html-react-parser'

import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-aspnet'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-solidity'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-r'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-mongodb'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

interface ParseHTMLProps extends HTMLAttributes<HTMLDivElement> {
  data: string
}

export const ParseHTML: FC<ParseHTMLProps> = (props) => {
  const { data } = props
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  if (!mounted) {
    return null
  }

  return <div className={`markdown w-full min-f-full`}>{parse(data)}</div>
}
