import Link from 'next/link'
import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'
import { IUser } from '@/types'
import { getTopInteractiveTags } from '@/lib/actions/tag.action'
import { Badge } from '@/components/ui/badge'
import { Tag } from '../Tag/Tag'

interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
  user: IUser
}

export const UserCard: FC<UserCardProps> = async (props) => {
  const { user } = props
  const tagList = await getTopInteractiveTags({ userId: user._id })
  return (
    <div className="bg-light900_dark200 rounded-2xl border light-border shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px] flex flex-col gap-4 p-4">
      <article className="w-full">
        <Link
          href={`/profile/${user.clerkId}`}
          className="flex flex-col justify-center items-center"
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
            <p className="body-regular text-dark500_light500 mt-2">
              @{user.username}
            </p>
          </div>
        </Link>
      </article>

      <div className="mt-5">
        {tagList.length > 0 ? (
          <div className="flex items-center gap-2">
            {tagList.map((tag) => (
              <Tag key={tag._id} _id={tag._id} name={tag.name} />
            ))}
          </div>
        ) : (
          <Badge>No tags yet</Badge>
        )}
      </div>
    </div>
  )
}
