'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createQuestion, editQuestion } from '@/lib/actions/question.action'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tinymce/tinymce-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  FC,
  HTMLAttributes,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { QuestionFormSchema } from './validation.schema'
import useTheme from '@/contexts/ThemeProvider'
import { IQuestion, ITag } from '@/types'
import { QuestionFormTypeEnum } from '@/types/shared'
import { toast } from '@/components/ui/use-toast'

interface QuestionFormProps extends HTMLAttributes<HTMLDivElement> {
  userId: string
  questionDetails?: IQuestion
  type?: QuestionFormTypeEnum
}

export const QuestionForm: FC<QuestionFormProps> = (props) => {
  const { questionDetails, userId, type } = props
  const editorRef = useRef(null)
  const { mode } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  // const type: string = 'create'

  // const questionDetails =
  //   questionDetails && JSON.parse(questionDetails || '')

  const groupTags = questionDetails?.tags?.map((tag: ITag) => tag.name)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: {
      title: questionDetails?.title || '',
      explanation: questionDetails?.content || '',
      tags: groupTags || [],
    },
  })

  const [mounte, setMounte] = useState(false)

  useEffect(() => setMounte(true), [])

  if (!mounte) {
    return null
  }

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    // make sure key event only function at tags
    if (e.key === 'Enter' && field.name === 'tags') {
      e.preventDefault()

      const tagInput = e.target as HTMLInputElement
      const tagValue = tagInput.value.trim()

      if (tagValue !== '') {
        if (tagValue.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must be less than 15 characters',
          })
        }

        // check the tag if is existed already within field
        if (!field.value.includes(tagValue as never)) {
          form.setValue('tags', [...field.value, tagValue])
          // reset
          tagInput.value = ''
          form.clearErrors('tags')
        } else {
          form.trigger() // Manually triggers form or input validation.
        }
      }
    }
  }

  const onSubmit = async (values: z.infer<typeof QuestionFormSchema>) => {
    setIsSubmitting(true)
    try {
      if (type === QuestionFormTypeEnum.EDIT && questionDetails) {
        const result = await editQuestion({
          // questionId: questionDetails._id,
          slug: questionDetails.slug,
          title: values.title,
          content: values.explanation,
          // tags: values.tags,
          // author: userId,
          path: pathname,
        })
        toast({
          title: 'You question has been successfully edited',
        })

        router.push(`/question/${result.slug}`)
      }
      if (type === QuestionFormTypeEnum.CREATE) {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: userId,
          path: pathname,
        })

        toast({
          title: 'Your question has been successfully added',
        })
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag)

    form.setValue('tags', newTags)
  }

  console.log('type', type)
  // TODO - сделать переключенлие темы реактивной,
  // что бы редактор переключался динамически

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800 font-bold">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="mt-0 no-focus paragraph-regular bg-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="mt-0 text-[0.8rem] dark:text-slate-400 body-regular text-light-500">
                Be specific and imagine youre asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-[0.8rem] text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800 font-bold">
                Detail explanation of your question?
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                  onInit={(evt, editor) =>
                    // @ts-ignore
                    (editorRef.current = editor)
                  }
                  onBlur={field.onBlur} // save value once exit
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={questionDetails?.content}
                  init={{
                    height: 350,
                    menubar: false,
                    skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                    content_css: mode === 'dark' ? 'dark' : 'light',

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
                    content_style: 'body { font-family:Inter; font-size:16px }',
                  }}
                />
              </FormControl>

              <FormMessage className="text-[0.8rem] text-red-500" />
              <FormDescription>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800 font-bold">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => handleInputKeyDown(e, field)}
                  disabled={type === QuestionFormTypeEnum.EDIT}
                  className="mt-0 no-focus paragraph-regular bg-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Tags..."
                />
              </FormControl>
              {field.value.length > 0 && (
                <div className="flex-start gap-2">
                  {field.value.map((tag: string) => (
                    <Badge
                      key={tag}
                      className="subtle-medium bg-light800_dark400 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                      onClick={() =>
                        type === QuestionFormTypeEnum.CREATE &&
                        handleTagRemove(tag, field)
                      }
                    >
                      {tag}
                      {type === QuestionFormTypeEnum.CREATE && (
                        <Image
                          src="/assets/icons/close.svg"
                          alt="Close icon"
                          width={12}
                          height={12}
                          className="cursor-pointer object-contain invert-0 dark:invert"
                        />
                      )}
                    </Badge>
                  ))}
                </div>
              )}
              <FormDescription className="mt-0 text-[0.8rem] dark:text-slate-400 body-regular text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-[0.8rem] text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === 'edit' ? 'Editing...' : ' Posting...'}</>
          ) : (
            <>{type === 'edit' ? 'Edit Question' : 'Ask a Question'}</>
          )}
        </Button>
      </form>
    </Form>
  )
}
