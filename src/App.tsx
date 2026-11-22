import { lazy, Suspense, useEffect, useState } from "react";
import { HomePage } from "./pages/HomePage";
import { topicIdFromPath } from "./lib/route";

const TopicPage = lazy(() => import("./pages/TopicPage"));

function usePath(): string {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return path;
}

export function App() {
  const id = topicIdFromPath(usePath());
  return (
    <>
      <a className="skip" href={id ? "#topic-title" : "#rooms"}>
        Skip to content
      </a>
      {id ? (
        <Suspense fallback={<p className="loading">Loading this page…</p>}>
          <TopicPage id={id} />
        </Suspense>
      ) : (
        <HomePage />
      )}
    </>
  );
}
