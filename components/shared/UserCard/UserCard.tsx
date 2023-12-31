import Link from 'next/link'
import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'
import { IUser } from '@/types'
// import { fetchTagsByUserId } from '@/lib/actions/tag.action'
import { Badge } from '@/components/ui/badge'
import { Tag } from '../Tag/Tag'
import { getTopInteractedTags } from '@/lib/actions/tag.action'

interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
  user: IUser
}

export const UserCard: FC<UserCardProps> = async (props) => {
  const { user } = props
  const tagList = await getTopInteractedTags({ userId: user._id })
  return (
    <div className="bg-light900_dark200 light-border shadow-light100_darknone flex w-full flex-col gap-8 rounded-2xl border px-4 py-8 max-xs:min-w-full">
      <article className="w-full">
        <Link
          href={`/profile/${user.username}`}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={user.picture}
            alt="user profile picture"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark200_light900 line-clamp-1">
              {user.name}
            </h3>
            <span className="body-regular text-dark500_light500 mt-2">
              @{user.username}
            </span>
          </div>
        </Link>
      </article>

      <div className="flex justify-center">
        {tagList.length > 0 ? (
          <div className="flex items-center gap-2">
            {tagList.map((tag) => (
              <Tag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                slug={tag.slug}
              />
            ))}
          </div>
        ) : (
          <Badge className="subtle-medium bg-light800_dark400 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize">
            No tags yet
          </Badge>
        )}
      </div>
    </div>
  )
}
