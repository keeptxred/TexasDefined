import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  width = "default",
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  width?: "narrow" | "default" | "wide";
  as?: "div" | "section" | "header" | "footer" | "article" | "nav" | "main";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        width === "narrow" && "max-w-3xl",
        width === "default" && "max-w-6xl",
        width === "wide" && "max-w-[90rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
