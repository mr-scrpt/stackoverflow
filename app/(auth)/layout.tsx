import { FC, HTMLAttributes } from "react";

interface LayoutProps extends HTMLAttributes<HTMLElement> {}

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
