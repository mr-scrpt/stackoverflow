'use client'
import { IUser } from '@/types'
import { usePathname, useRouter } from 'next/navigation'
import { FC, HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ProfileFormSchema } from './validation.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { updateUser } from '@/lib/actions/user.action'

interface ProfileFromProps extends HTMLAttributes<HTMLDivElement> {
  user: IUser
  clerkId: string
}

export const ProfileFrom: FC<ProfileFromProps> = (props) => {
  const { user, clerkId } = props
  // const user = JSON.parse(user)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: user.name || '',
      username: user.username || '',
      portfolioWebsite: user.portfolioWebsite || '',
      location: user.location || '',
      bio: user.bio || '',
    },
  })

  async function onSubmit(values: z.infer<typeof ProfileFormSchema>) {
    setIsSubmitting(true)

    try {
      const updatedUser = await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      })

      router.push(`/profile/${updatedUser.slug}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-9 mt-9"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Full Name<span className="text-primary-500">*</span>
                </FormLabel>

                <FormControl className="mt-3.5">
                  <Input
                    {...field}
                    className="no-focus paragraph-regular bg-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Your name"
                  />
                </FormControl>

                {/* error msg */}
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Username<span className="text-primary-500">*</span>
                </FormLabel>

                <FormControl className="mt-3.5">
                  <Input
                    {...field}
                    className="no-focus paragraph-regular bg-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Your username"
                  />
                </FormControl>

                {/* error msg */}
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolioWebsite"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Portfolio Link
                </FormLabel>

                {/* FormControl only accept single child Element */}
                <FormControl className="mt-3.5">
                  <>
                    <Input
                      type="url"
                      className="no-focus paragraph-regular bg-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      placeholder="Your portfolio URL"
                      {...field}
                    />
                  </>
                </FormControl>

                {/* error msg */}
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Location<span className="text-primary-500">*</span>
                </FormLabel>

                {/* FormControl only accept single child Element */}
                <FormControl className="mt-3.5">
                  <>
                    <Input
                      className="no-focus paragraph-regular bg-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      placeholder="Where are you from"
                      {...field}
                    />
                  </>
                </FormControl>

                {/* error msg */}
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Bio<span className="text-primary-500">*</span>
                </FormLabel>

                {/* FormControl only accept single child Element */}
                <FormControl className="mt-3.5">
                  <>
                    <Textarea
                      className="no-focus paragraph-regular bg-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      placeholder="What's special about you?"
                      rows={4}
                      {...field}
                    />
                  </>
                </FormControl>

                {/* error msg */}
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-7 primary-gradient w-fit !text-light-900 ml-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving' : 'Save'}
          </Button>
        </form>
      </Form>
    </>
  )
}
