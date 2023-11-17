'use client'

import { ActionTypeEnum } from '@/types/shared'
import { FC, HTMLAttributes } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { deleteAnswer } from '@/lib/actions/answer.action'
import { deleteQuestion } from '@/lib/actions/question.action'

interface CardActionBarProps extends HTMLAttributes<HTMLDivElement> {
  type: ActionTypeEnum
  itemId: string
  slug?: string
}

export const CardActionBar: FC<CardActionBarProps> = (props) => {
  const { slug, itemId, type } = props
  const pathname = usePathname()
  // const router = useRouter()

  // function handleEdit() {
  //   router.push(`/question/edit/${JSON.parse(itemId)}`)
  // }
  //
  const handleDelete = async () => {
    if (type === ActionTypeEnum.QUESTION) {
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname })
    } else if (type === ActionTypeEnum.ANSWER) {
      await deleteAnswer({ answerId: JSON.parse(itemId), path: pathname })
    }
  }
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === ActionTypeEnum.QUESTION && (
        <Link href={`/question/edit/${slug}`}>
          <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            width={14}
            height={14}
            className="cursor-pointer object-contain"
          />
        </Link>
      )}

      <Image
        src="/assets/icons/trash.svg"
        alt="delete"
        width={14}
        height={14}
        onClick={handleDelete}
        className="cursor-pointer object-contain"
      />
    </div>
  )
}
