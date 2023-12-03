import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface LoginBarProps extends HTMLAttributes<HTMLDivElement> {
  classLinkText?: string
  classIcon?: string
}

export const LoginBar: FC<LoginBarProps> = (props) => {
  const { classLinkText, classIcon } = props
  const clsTextLogin = cn(classLinkText, 'primary-text-gradient')
  const clsTextSignUp = cn(classLinkText, '')

  const clsIcon = cn(classIcon, 'invert-colors lg:hidden')
  return (
    <div>
      <div className="my-auto flex flex-col gap-3">
        <Link href="/sign-in">
          <Button className="small-medium light-border-2 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
            <Image
              src="/assets/icons/account.svg"
              alt="login"
              width={20}
              height={20}
              className={clsIcon}
            />
            <span className={clsTextLogin}>Log In</span>
          </Button>
        </Link>

        <Link href="/sign-up">
          <Button className="small-medium light-border-2 btn-tertiary text-dark300_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
            <Image
              src="/assets/icons/sign-up.svg"
              alt="signUp"
              width={20}
              height={20}
              className={clsIcon}
            />
            <span className={clsTextSignUp}>Sign Up</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
