import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import Image from 'next/image'
import { HOT_NETWORKS, POPULAR_TAG } from '@/constants'
import { Tag } from '../Tag/Tag'

interface SidebarRightProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarRight: FC<SidebarRightProps> = (props) => {
  const { className } = props
  return (
    <aside className={className}>
      <div className="flex flex-col gap-7">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="flex w-full flex-col gap-[30px]">
          {HOT_NETWORKS.map((question) => {
            return (
              <Link
                href={`/question/${question._id}`}
                key={question._id}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {question.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <h3 className="h3-bold text-dark200_light900">Popular Tag</h3>
        <div className="flex flex-col gap-4">
          {POPULAR_TAG.map((tag) => {
            return (
              <Tag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount // show number or not
              />
            )
          })}
        </div>
      </div>
    </aside>
  )
}
