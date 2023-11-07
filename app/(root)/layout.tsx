import { Navbar } from '@/components/shared/Navbar'
import { SidebarLeft } from '@/components/shared/SidebarLeft/SidebarLeft'
import { FC, HTMLAttributes } from 'react'

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props
  return (
    <main className="bg-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <SidebarLeft />
        <section className="flex flex-1 flex-col px-6 pb-6 pt-36 min-h-screen sm:px-14 max-md:pb-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <div>RightSide</div>
      </div>
    </main>
  )
}

export default Layout
