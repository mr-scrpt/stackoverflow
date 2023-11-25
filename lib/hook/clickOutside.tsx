import { RefObject, useEffect } from 'react'

interface UseClickOutsideProps {
  ref: RefObject<HTMLElement>
  callback: () => void
}

export const useOutsideClick = ({ ref, callback }: UseClickOutsideProps) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node

      if (ref.current && !ref.current.contains(target)) {
        callback()
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [ref, callback])
}
