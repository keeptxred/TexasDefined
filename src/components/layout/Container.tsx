import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type ContainerWidth = "prose" | "narrow" | "content" | "default" | "wide";

export function Container({
  children,
  className,
  width = "default",
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  width?: ContainerWidth;
  as?: "div" | "section" | "header" | "footer" | "article" | "nav" | "main";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "mx-auto w-full px-5 sm:px-8 xl:px-10 2xl:px-12",
        width === "prose" && "max-w-[52rem]",
        width === "narrow" && "max-w-3xl",
        width === "content" && "max-w-6xl",
        width === "default" && "max-w-[96rem]",
        width === "wide" && "max-w-[108rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
