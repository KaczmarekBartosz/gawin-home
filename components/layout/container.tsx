import * as React from "react";

import { cn } from "@/lib/utils";

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

const defaultClasses =
  "mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-10";

function Container<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? "div") as React.ElementType;
  return (
    <Component className={cn(defaultClasses, className)} {...props}>
      {children}
    </Component>
  );
}

export { Container };
