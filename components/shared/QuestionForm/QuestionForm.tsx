'use client'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { QuestionFormSchema } from './validation.schema'

interface QuestionFormProps extends HTMLAttributes<HTMLDivElement> {}

export const QuestionForm: FC<QuestionFormProps> = (props) => {
  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: {
      title: '',
      explanation: '',
      tags: [],
    },
  })

  const onSubmit = (values: z.infer<typeof QuestionFormSchema>) => {
    console.log(values)
  }
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
            <FormItem className="flex w-full flex-col gap-2">
              <FormLabel className="paragraph-semibold text-dark400_light800 font-bold">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                  className="mt-0 no-focus paragraph-regular bg-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="mt-0 text-[0.8rem] dark:text-slate-400 body-regular text-light-500">
                Be specific and imagine you're asking a question to another
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
            <FormItem className="flex w-full flex-col gap-2">
              <FormLabel className="paragraph-semibold text-dark400_light800 font-bold">
                Detail explanation of your question?
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>Editor</FormControl>

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
            <FormItem className="flex w-full flex-col gap-2">
              <FormLabel className="paragraph-semibold text-dark400_light800 font-bold">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="mt-0 no-focus paragraph-regular bg-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Tags..."
                />
              </FormControl>
              <FormDescription className="mt-0 text-[0.8rem] dark:text-slate-400 body-regular text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-[0.8rem] text-red-500" />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
