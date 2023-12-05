import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

interface LoginBarProps extends HTMLAttributes<HTMLDivElement> {
  classLinkText?: string
  classIcon?: string
}

export const LoginBar: FC<LoginBarProps> = (props) => {
  const { classLinkText, classIcon } = props
  const clsTextLogin = cn(classLinkText)
  const clsTextSignUp = cn(classLinkText, '')

  const clsIcon = cn(classIcon, 'invert-colors lg:hidden')
  return (
    <div>
      <div className="my-auto flex flex-col gap-3">
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants(),
            'primary-gradient min-h-[40px] px-4 py-3 text-light-900 transition-all duration-200 max-sm:w-full'
          )}
        >
          {/* <Button className="small-medium light-border-2 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"> */}
          <Image
            src="/assets/icons/account.svg"
            alt="login"
            width={20}
            height={20}
            className={clsIcon}
          />
          <span className={clsTextLogin}>Log In</span>
          {/* </Button> */}
        </Link>

        <Link
          href="/sign-up"
          className={cn(
            buttonVariants(),
            'small-medium light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none hover:bg-light-700 dark:bg-dark-400 dark:text-light-700 dark:hover:bg-dark-300'
          )}
        >
          {/* <Button className="small-medium light-border-2 btn-tertiary text-dark300_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"> */}
          <Image
            src="/assets/icons/sign-up.svg"
            alt="signUp"
            width={20}
            height={20}
            className={clsIcon}
          />
          <span className={clsTextSignUp}>Sign Up</span>
          {/* </Button> */}
        </Link>
      </div>
    </div>
  )
}
