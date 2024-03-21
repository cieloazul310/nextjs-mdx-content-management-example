import type { PropsWithChildren } from "react";

export default function MDXPageLayout({ children }: PropsWithChildren) {
  return <article className="article">{children}</article>;
}
