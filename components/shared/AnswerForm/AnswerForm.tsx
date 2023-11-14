'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import useTheme from '@/contexts/ThemeProvider'
import { createAnswer } from '@/lib/actions/answer.action'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname } from 'next/navigation'
import { FC, HTMLAttributes, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AnswerFormSchema } from './validation.schema'
import Image from 'next/image'
import { Editor } from '@tinymce/tinymce-react'

interface AnswerFormProps extends HTMLAttributes<HTMLDivElement> {
  question: string
  questionId: string
  authorId: string
}

export const AnswerForm: FC<AnswerFormProps> = (props) => {
  const { questionId, authorId } = props
  const editorRef = useRef(null)
  const { mode } = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pathname = usePathname()

  const form = useForm<z.infer<typeof AnswerFormSchema>>({
    resolver: zodResolver(AnswerFormSchema),
    defaultValues: {
      answer: '',
    },
  })

  const handleCreateAnswer = async (
    values: z.infer<typeof AnswerFormSchema>
  ) => {
    setIsSubmitting(true)

    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      })

      form.reset()

      if (editorRef.current) {
        const editor = editorRef.current as any

        editor.setContent('')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>

        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={() => {}}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an AI Answer
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor
                    }}
                    onBlur={field.onBlur} // save value once exit
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'codesample',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                      ],
                      toolbar:
                        'undo redo | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist',
                      content_style:
                        'body { font-family:Inter; font-size:16px }',
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: mode === 'dark' ? 'dark' : 'light',
                    }}
                  />
                </FormControl>

                {/* error msg */}
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              className="primary-gradient w-fit text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
