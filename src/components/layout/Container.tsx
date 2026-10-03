import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

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
  const editorialWidth: CSSProperties | undefined = width === "narrow"
    ? undefined
    : { maxWidth: width === "wide" ? "100rem" : "82rem" };

  return (
    <Tag
      id={id}
      style={editorialWidth}
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        width === "narrow" && "max-w-3xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
