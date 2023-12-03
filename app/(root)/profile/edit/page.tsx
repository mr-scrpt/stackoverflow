import { ProfileFrom } from '@/components/shared/ProfileForm/ProfileFrom'
import { getUserByClerkId } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit Profile | Dev Overflow',
}

const ProfileEditPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return (
      <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
        <p>You are not loggined</p>
        <div className="flex items-center justify-center"></div>
        <Link href="/sign-in" className="mt-1 font-bold text-accent-blue">
          Sign in
        </Link>
        <Link href="/sign-up" className="mt-1 font-bold text-accent-blue">
          Or sign up
        </Link>
      </div>
    )
  }

  const userActual = await getUserByClerkId(userId)

  if (!userActual) {
    redirect('/sign-in')
  }

  return (
    <section className="flex flex-col">
      <h1 className="h1-bold text-dark100_light900">Edit question</h1>

      {/* <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center"></div> */}
      <div className="custom-scrollbar flex w-full flex-col flex-wrap items-center gap-6  overflow-y-auto md:flex-row md:justify-start">
        <ProfileFrom user={userActual} clerkId={userId} />
      </div>

      <div className="flex flex-col"></div>
    </section>
  )
}

export default ProfileEditPage
