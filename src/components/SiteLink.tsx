import type { ReactNode } from "react";
import { navigate, siteHref } from "../lib/route";

export function SiteLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: ReactNode;
}) {
  const external = to.startsWith("http");
  const href = external ? to : siteHref(to);
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (external || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}
