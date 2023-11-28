import { RefObject, useEffect } from 'react'
import { removeKeysFromQuery } from '../utils'
import { useRouter } from 'next/navigation'
interface UseClickOutsideProps {
  ref: RefObject<HTMLElement>
  callback: () => void
  keysToRemove?: Array<string>
  params?: string
}

export const useOutsideClick = (props: UseClickOutsideProps) => {
  const { ref, callback, keysToRemove, params } = props
  const router = useRouter()

  const handleOutsideClick = (e: any) => {
    const anchor = e.target.closest('a')
    const r = ref.current
    const isOutside = !r.contains(e.target) || null
    if (isOutside) {
      callback()
      if (!anchor && params && keysToRemove) {
        const newUrl = removeKeysFromQuery({
          params,
          keysToRemove,
        })

        router.replace(newUrl, { scroll: false })
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])
}

//
// interface UseClickOutsideProps {
//   ref: RefObject<HTMLElement>
//   callback: () => void
// }
//
// export const useOutsideClick = ({ ref, callback }: UseClickOutsideProps) => {
//   useEffect(() => {
//     const handleOutsideClick = (e: MouseEvent) => {
//       const target = e.target as Node
//
//       if (ref.current && !ref.current.contains(target)) {
//         callback()
//       }
//     }
//
//     document.addEventListener('click', handleOutsideClick)
//
//     return () => document.removeEventListener('click', handleOutsideClick)
//   }, [ref, callback])
// }
