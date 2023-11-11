import { Navbar } from '@/components/shared/Navbar'
import { SidebarLeft } from '@/components/shared/SidebarLeft/SidebarLeft'
import { SidebarRight } from '@/components/shared/SidebarRight/SidebarRight'
import { cn } from '@/lib/utils'
import { FC, HTMLAttributes } from 'react'

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props

  const clsSidebarCommon =
    'bg-light800_dark300 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col  overflow-y-auto p-6 pt-36 shadow-light-300 dark:shadow-none gap-2'

  const clsLeftSide = cn(
    clsSidebarCommon,
    'left-0 lg:w-[266px] justify-between border-r max-sm:hidden'
  )

  const clsRightSide = cn(
    clsSidebarCommon,
    'right-0 w-[350px] border-l max-xl:hidden gap-16'
  )

  const clsContent =
    'flex flex-1 flex-col px-6 pb-6 pt-36 min-h-screen sm:px-14 max-md:pb-14'

  return (
    <main className="bg-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <SidebarLeft className={clsLeftSide} />
        <section className={clsContent}>
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <SidebarRight className={clsRightSide} />
      </div>
    </main>
  )
}

export default Layout
