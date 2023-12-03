import { ToastActionElement, ToastProps } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { ReactNode } from 'react'

type ToasterToast = ToastProps & {
  id: string
  title?: ReactNode
  description?: ReactNode
  action?: ToastActionElement
}
type Toast = Omit<ToasterToast, 'id'>
// interface NoticeProps extends HTMLAttributes<HTMLDivElement> {}

export const notice = (props: Toast) => {
  const { className: skipClass, ...rest } = props
  const className =
    'text-dark100_light900 dark:border-light-700 dark:bg-dark-300 border-light-700 bg-light-900'
  return toast({ className, ...rest })
}
