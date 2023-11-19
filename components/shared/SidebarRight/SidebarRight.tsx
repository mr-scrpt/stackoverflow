import { getHotQuestions } from '@/lib/actions/question.action'
import { getPopularTags } from '@/lib/actions/tag.action'
import Image from 'next/image'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import { Tag } from '../Tag/Tag'

interface SidebarRightProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarRight: FC<SidebarRightProps> = async (props) => {
  const { className } = props
  const hotQuestion = await getHotQuestions()
  const popularTag = await getPopularTags()
  return (
    <aside className={className}>
      <div className="flex flex-col gap-7">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="flex w-full flex-col gap-[30px]">
          {hotQuestion.map((question) => {
            return (
              <Link
                href={`/question/${question.slug}`}
                key={question._id}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <span className="body-medium text-dark500_light700">
                  {question.title}
                </span>
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
          {popularTag.map((tag) => {
            return (
              <Tag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                slug={tag.slug}
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
