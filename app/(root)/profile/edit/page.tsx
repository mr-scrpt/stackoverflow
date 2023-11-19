import { ProfileFrom } from '@/components/shared/ProfileForm/ProfileFrom'
import { getUserById } from '@/lib/actions/user.action'
import { ISearchParam } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { HTMLAttributes } from 'react'

// interface ProfileEdtiPageProps extends HTMLAttributes<HTMLDivElement> {
// params: {
//   slug: string
// }
// searchParams?: ISearchParam
// }

const ProfileEditPage = async () => {
  // const { params, searchParams } = props

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

  const userActual = await getUserById(userId)

  if (!userActual) {
    redirect('/sign-in')
  }

  // const {
  //   user: userProfile,
  //   totalAnswers,
  //   totalQuestions,
  // } = await getUserProfileBySlug(params.slug)

  // const { questions } = await getUserQuestions({
  //   userId: userProfile._id,
  //   page: 1,
  // })

  // const { answers } = await getUserAnswers({ userId: userProfile._id, page: 1 })
  // console.log('answers', answers)

  return (
    <section className="flex flex-col gap-8">
      <h1 className="h1-bold text-dark100_light900">Edit question</h1>

      {/* <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center"></div> */}
      <div className="custom-scrollbar flex flex-col items-center flex-wrap md:flex-row md:justify-start  w-full gap-6 overflow-y-auto">
        <ProfileFrom user={userActual} clerkId={userId} />
      </div>

      <div className="flex flex-col"></div>
    </section>
  )
}

export default ProfileEditPage
