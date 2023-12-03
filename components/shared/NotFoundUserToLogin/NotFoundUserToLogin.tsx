import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

interface NotFoundUserToLoginProps extends HTMLAttributes<HTMLDivElement> {}

export const NotFoundUserToLogin: FC<NotFoundUserToLoginProps> = (props) => {
  return (
    <div className="paragraph-regular text-dark200_light800 mx-auto flex h-full max-w-4xl flex-col justify-center gap-6 text-center">
      <div className="flex flex-col gap-4">
        <p>You are not loggined</p>
        <div className="flex items-center justify-center gap-2">
          <Button type="submit" className="primary-gradient">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button
            type="submit"
            className="btn light-border-2 flex min-h-[36px] items-center justify-center border"
          >
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
