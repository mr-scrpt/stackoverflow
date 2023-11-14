'use client'

import { usePathname, useRouter } from 'next/navigation'
import { FC, HTMLAttributes, useEffect } from 'react'
import Image from 'next/image'
import { formatNumber } from '@/lib/utils'
import {
  downVoteQuestion,
  toggleSaveQuestion,
  upVoteQuestion,
} from '@/lib/actions/question.action'
import { downVoteAnswer, upVoteAnswer } from '@/lib/actions/answer.action'
import { viewQuestion } from '@/lib/actions/interaction.action'
import { VoteDirectionEnum, VoteTypeEnum } from '@/types/shared'

interface VoteBarProps extends HTMLAttributes<HTMLDivElement> {
  type: VoteTypeEnum
  itemId: string
  userId: string
  upVotes: number
  downVotes: number
  hasUpVoted: boolean
  hasDownVoted: boolean
  hasSaved?: boolean
}

export const VoteBar: FC<VoteBarProps> = (props) => {
  const {
    itemId,
    userId,
    type,
    upVotes,
    downVotes,
    hasUpVoted,
    hasDownVoted,
    hasSaved,
  } = props
  // check if user is logined
  const pathname = usePathname()
  const router = useRouter()

  const handleSave = async () => {
    console.log('click')
    await toggleSaveQuestion({
      userId,
      questionId: itemId,
      path: pathname,
    })
  }

  const handleVote = async (vote: string) => {
    // check if user is logined
    if (!userId) return

    if (vote === VoteDirectionEnum.UP) {
      if (type === VoteTypeEnum.QUESTION) {
        await upVoteQuestion({
          questionId: itemId,
          userId,
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        })
      } else if (type === VoteTypeEnum.ANSWER) {
        await upVoteAnswer({
          answerId: itemId,
          userId,
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        })
      }
    }

    if (vote === VoteDirectionEnum.DOWN) {
      if (type === VoteTypeEnum.QUESTION) {
        await downVoteQuestion({
          questionId: itemId,
          userId,
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        })
      } else if (type === VoteTypeEnum.ANSWER) {
        await downVoteAnswer({
          answerId: itemId,
          userId,
          hasupVoted: hasUpVoted,
          hasdownVoted: hasDownVoted,
          path: pathname,
        })
      }
    }
  }

  // view interaction
  useEffect(() => {
    viewQuestion({
      questionId: itemId,
      userId,
    })
  }, [itemId, userId, pathname, router])

  console.log('hasSaved =', hasSaved)
  return (
    <div className="flex gap-5 ">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5 ">
          <Image
            src={`/assets/icons/${hasUpVoted ? 'upvoted' : 'upvote'}.svg`}
            alt="upvote icon"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote(VoteDirectionEnum.UP)}
          />
          <div className="flex-center  background-light700_dark400 p-1 rounded-sm min-w-[18px] ">
            <p className="text-dark400_light900 subtle-medium text-center uppercase">
              {formatNumber(upVotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5 ">
          <Image
            src={`/assets/icons/${hasDownVoted ? 'downvoted' : 'downvote'}.svg`}
            alt="downvote icon"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote(VoteDirectionEnum.DOWN)}
          />
          <div className="flex-center  background-light700_dark400 p-1 rounded-sm min-w-[18px] ">
            <p className="text-dark400_light900 subtle-medium text-center uppercase">
              {formatNumber(downVotes)}
            </p>
          </div>
        </div>
      </div>

      {type === VoteTypeEnum.QUESTION && (
        <Image
          src={`/assets/icons/${hasSaved ? 'star-filled' : 'star-red'}.svg`}
          alt="star icon"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  )
}
