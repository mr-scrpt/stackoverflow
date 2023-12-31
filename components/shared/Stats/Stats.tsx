import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'
import { formatNumber } from '@/lib/utils'
import { BadgeCounts } from '@/types'

interface StatsCardProps extends HTMLAttributes<HTMLDivElement> {
  imgUrl: string
  value: number
  title: string
}

export const StatsCard: FC<StatsCardProps> = (props) => {
  const { imgUrl, value, title } = props
  return (
    <div className="bg-light900_dark300 light-border flex flex-wrap items-center justify-start gap-3.5 rounded-md border px-6 py-5 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={title} width={40} height={50} className="" />
      <div>
        <p className="paragraph-semibold text-dark200_light900">{value}</p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  )
}

interface StatsProps extends HTMLAttributes<HTMLDivElement> {
  totalQuestions: number
  totalAnswers: number
  badge: BadgeCounts
  score?: number
}

export const Stats: FC<StatsProps> = (props) => {
  const { totalQuestions, totalAnswers, badge, score } = props
  return (
    <div>
      <h4 className=" text-dark200_light900">
        <span className="h3-semibold">Stats</span>
        {score && (
          <span className="text-[20px]">: {score} reputation score</span>
        )}
      </h4>

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="bg-light900_dark300 light-border flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div className="flex flex-col items-center">
            <span className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalQuestions)}
            </span>
            <span className="body-medium text-dark400_light700">Questions</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalAnswers)}
            </span>
            <span className="body-medium text-dark400_light700">Answers</span>
          </div>
        </div>

        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={badge.GOLD}
          title="Gold Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={badge.SILVER}
          title="Silver Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={badge.BRONZE}
          title="Bronze Badges"
        />
      </div>
    </div>
  )
}
