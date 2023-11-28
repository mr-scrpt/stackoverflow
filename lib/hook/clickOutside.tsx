import { RefObject, useEffect } from 'react'
interface UseClickOutsideProps {
  ref: RefObject<HTMLElement>
  callback: () => void
  paramsToRremove?: Array<string>
}

export const useOutsideClick = (props: UseClickOutsideProps) => {
  const { ref, callback, paramsToRemove } = props

  const handleOutsideClick = (event: any) => {
    const anchor = event.target.closest('a')
    setSearch('')
    setIsOpen(false)
    if (!anchor) {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['global', 'type'],
      })

      router.replace(newUrl, { scroll: false })
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
