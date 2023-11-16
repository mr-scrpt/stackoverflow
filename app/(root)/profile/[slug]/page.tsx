import { Button } from '@/components/ui/button'
import { SignedIn, auth } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
import { ISearchParam } from '@/types'
import {
  getUserAnswers,
  getUserProfileBySlug,
  getUserQuestions,
} from '@/lib/actions/user.action'
import { ProfileLink } from '@/components/shared/ProfileLink/ProfileLink'
import { getJoinedDate } from '@/lib/utils'
import { Stats } from '@/components/shared/Stats/Stats'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { QuestionTab } from '@/components/shared/QuestionTab/QuestionTab'
import { AnswerTab } from '@/components/shared/AnswerTab/AnswerTab'

interface ProfilePageProps extends HTMLAttributes<HTMLDivElement> {
  params: {
    slug: string
  }
  searchParams?: ISearchParam
}

const ProfilePage = async (props: ProfilePageProps) => {
  const { params, searchParams } = props
  console.log('searchParams', searchParams)

  const { user, totalAnswers, totalQuestions } = await getUserProfileBySlug(
    params.slug
  )

  const { questions } = await getUserQuestions({
    userId: user._id,
    page: 1,
  })

  const { answers } = await getUserAnswers({ userId: user._id, page: 1 })
  // console.log('answers', answers)
  const { userId: clerkId } = auth()

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @{user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={user.portfolioWebsite}
                  title="Portfolio"
                />
              )}

              {user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={user.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(user.joinedAt)}
              />
            </div>

            {user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      {/* Stats */}
      <Stats totalQuestions={totalQuestions} totalAnswers={totalAnswers} />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-posts"
            className="mt-5 flex w-full flex-col gap-6"
          >
            {questions ? (
              <QuestionTab
                list={questions}
                // searchParams={searchParams}
                // clerkId={clerkId}
                // userId={userInfo.user._id}
              />
            ) : (
              <div>No questions eat</div>
            )}
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            {answers ? (
              <AnswerTab
                list={answers}
                // searchParams={searchParams}
                // clerkId={clerkId}
                // userId={userInfo.user._id}
              />
            ) : (
              <div>No answers eat</div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default ProfilePage
