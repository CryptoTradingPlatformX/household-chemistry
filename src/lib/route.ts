export function siteHref(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (path === "/" || path === "") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function topicIdFromPath(pathname: string): string | null {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  let rest = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  if (!rest.startsWith("/")) rest = `/${rest}`;
  const match = rest.match(/^\/t\/([a-z0-9-]+)\/?$/);
  return match?.[1] ?? null;
}

export function navigate(href: string): void {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}
