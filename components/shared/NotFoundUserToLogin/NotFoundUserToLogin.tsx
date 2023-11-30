import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

interface NotFoundUserToLoginProps extends HTMLAttributes<HTMLDivElement> {}

export const NotFoundUserToLogin: FC<NotFoundUserToLoginProps> = (props) => {
  return (
    <div className="flex flex-col justify-center h-full gap-6 paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
      <div className="flex flex-col gap-4">
        <p>You are not loggined</p>
        <div className="flex items-center justify-center gap-2">
          <Button type="submit" className="primary-gradient">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button
            type="submit"
            className="btn light-border-2 min-h-[36px] border flex items-center justify-center"
          >
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
