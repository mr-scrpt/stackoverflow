import { Navbar } from '@/components/shared/Navbar'
import { SidebarLeft } from '@/components/shared/SidebarLeft/SidebarLeft'
import { SidebarRight } from '@/components/shared/SidebarRight/SidebarRight'
import { Toaster } from '@/components/ui/toaster'
import { getUserByClerkId } from '@/lib/actions/user.action'
import { cn } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import { ReactNode } from 'react'

const Layout = async (props: { children: ReactNode }) => {
  const { children } = props
  const { userId } = auth()

  const user = userId ? await getUserByClerkId(userId) : undefined

  const clsSidebarCommon =
    'bg-light800_dark300 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col  overflow-y-auto p-6 pt-32 shadow-light-300 dark:shadow-none gap-2'

  const clsLeftSide = cn(
    clsSidebarCommon,
    'left-0 lg:w-[266px] min-w-[52px] justify-between border-r max-sm:hidden'
  )

  const clsRightSide = cn(
    clsSidebarCommon,
    'right-0 w-[350px] border-l max-xl:hidden gap-16'
  )

  const clsContent =
    'flex flex-1 flex-col px-4 pb-6 pt-32 min-h-screen sm:px-10 max-md:pb-14'

  return (
    <main className="bg-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <SidebarLeft className={clsLeftSide} userSlug={user?.slug} />
        <section className={clsContent}>
          <div className="mx-auto w-full max-w-5xl h-full">{children}</div>
        </section>
        <SidebarRight className={clsRightSide} />
      </div>
      <Toaster />
    </main>
  )
}

export default Layout
