import * as React from "react";

import { cn } from "@/lib/utils";

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

const defaultClasses = "mx-auto w-full max-w-7xl px-4 md:px-6";

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
