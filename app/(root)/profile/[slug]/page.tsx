import { AnswerTab } from '@/components/shared/AnswerTab/AnswerTab'
import { NotFoundUser } from '@/components/shared/NotFoundUser/NotFoundUser'
import { NotFoundUserToLogin } from '@/components/shared/NotFoundUserToLogin/NotFoundUserToLogin'
import { ProfileLink } from '@/components/shared/ProfileLink/ProfileLink'
import { QuestionTab } from '@/components/shared/QuestionTab/QuestionTab'
import { Stats } from '@/components/shared/Stats/Stats'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getBadge } from '@/lib/actions/badge.action'
import {
  getUserAnswers,
  getUserByClerkId,
  getUserProfileBySlug,
  getUserQuestions,
} from '@/lib/actions/user.action'
import { getJoinedDate } from '@/lib/utils'
import { SignedIn, auth } from '@clerk/nextjs'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface ProfilePageProps {
  params: {
    slug: string
  }
  // searchParams?: ISearchParam
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { user: userProfile } = await getUserProfileBySlug(params.slug)
  const username =
    userProfile.username.charAt(0).toUpperCase() + userProfile.username.slice(1)

  return {
    title: `${username} | Dev Overflow`,
    description: userProfile.bio,
    openGraph: {
      images: [userProfile.picture],
    },
  }
}

const ProfilePage = async (props: ProfilePageProps) => {
  const { params } = props
  const { slug } = params
  const { userId } = auth()
  // const { user: profile } = await getUserProfileBySlug(slug)

  if (!userId) {
    return <NotFoundUserToLogin />
  }

  const userActual = await getUserByClerkId(userId)
  if (!userActual) {
    return <NotFoundUser />
  }
  const badge = await getBadge(userActual?._id)

  const {
    user: userProfile,
    totalAnswers,
    totalQuestions,
  } = await getUserProfileBySlug(slug)

  if (!userProfile) {
    return <NotFoundUser />
  }

  const { questions } = await getUserQuestions({
    userId: userProfile._id,
    page: 1,
  })

  const { answers } = await getUserAnswers({ userId: userProfile._id, page: 1 })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userProfile.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h2 className="h2-bold text-dark100_light900">
                {userProfile.name}
              </h2>
              <p className="paragraph-regular text-dark200_light800">
                @{userProfile.username}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-4">
              {userProfile.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={userProfile.portfolioWebsite}
                  title="Website"
                />
              )}

              {userProfile.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={userProfile.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(userProfile.joinedAt)}
              />
            </div>

            {userProfile.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {userProfile.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {userId === userProfile.clerkId && (
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
      <Stats
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        badge={badge}
        score={userProfile.reputation}
      />

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
                userId={userActual?._id}
                // pageCurrent={}
                // hasNextPage={}
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
                userId={userActual?._id}
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
    </div>
  )
}

export default ProfilePage
