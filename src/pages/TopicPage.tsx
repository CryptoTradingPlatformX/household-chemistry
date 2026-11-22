import { useEffect, useState } from "react";
import { StepEquations } from "../components/Equation";
import { Legend } from "../components/Legend";
import { SceneCanvas } from "../components/SceneCanvas";
import { SiteLink } from "../components/SiteLink";
import { ELEMENT_COLORS } from "../content/colors";
import { LINES } from "../content/lines";
import { SPECIES, type ElementSymbol } from "../content/species";
import { topicById, topicsInRoom } from "../content/topics";
import { DISCLAIMER, ROOMS, type Topic } from "../content/types";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { siteHref } from "../lib/route";
import type { Viz } from "../viz/types";

const LOADERS = {
  kitchen: () => import("../viz/rooms/kitchen"),
  cleaning: () => import("../viz/rooms/cleaning"),
  bathroom: () => import("../viz/rooms/bathroom"),
  house: () => import("../viz/rooms/house"),
};

function elementsFor(topic: Topic): ElementSymbol[] {
  const found = new Set<ElementSymbol>();
  for (const step of topic.steps) {
    for (const id of step.equations) {
      const line = LINES[id];
      if (line.kind !== "reaction") continue;
      for (const term of [...line.left, ...line.right]) {
        const atoms = SPECIES[term.id].atoms;
        for (const key of Object.keys(atoms) as ElementSymbol[]) {
          if ((atoms[key] ?? 0) > 0) found.add(key);
        }
      }
    }
  }
  return (Object.keys(ELEMENT_COLORS) as ElementSymbol[]).filter((symbol) => found.has(symbol));
}

export default function TopicPage({ id }: { id: string }) {
  const topic = topicById(id);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(!reduced);
  const [viz, setViz] = useState<Viz<unknown> | null>(null);

  useEffect(() => {
    setStep(0);
    setViz(null);
  }, [id]);

  useEffect(() => {
    setPlaying(!reduced);
  }, [id, reduced]);

  useEffect(() => {
    if (!topic) return;
    document.title = `${topic.title} · Household Chemistry`;
  }, [topic]);

  useEffect(() => {
    if (!topic) return;
    let cancel = false;
    void LOADERS[topic.room]().then((mod) => {
      if (!cancel) setViz(mod.getViz(topic.id));
    });
    return () => {
      cancel = true;
    };
  }, [topic]);

  useEffect(() => {
    if (!topic || !reduced || !playing) return;
    const timer = window.setInterval(() => {
      setStep((value) => (value + 1) % topic.steps.length);
    }, 7500);
    return () => window.clearInterval(timer);
  }, [topic, reduced, playing]);

  if (!topic) {
    return (
      <main className="missing">
        <h1>That page is not on the shelf</h1>
        <SiteLink to="/" className="start">
          Back to all rooms
        </SiteLink>
      </main>
    );
  }

  const current = topic.steps[step];
  const room = ROOMS.find((item) => item.id === topic.room);
  const playLabel = reduced ? (playing ? "Pause step advance" : "Play step advance") : playing ? "Pause animation" : "Play animation";

  return (
    <>
      <header className="topic-bar">
        <SiteLink to="/" className="back">
          All rooms
        </SiteLink>
        <p className="kicker">{room?.title}</p>
      </header>
      <main className={topic.danger ? "topic danger-topic" : "topic"}>
        <p className="eyebrow">{topic.danger ? "Danger" : "Household chemistry"}</p>
        <h1 id="topic-title">
          {topic.title}
        </h1>
        <p className="lede">{topic.hook}</p>
        {viz ? (
          <SceneCanvas
            viz={viz}
            step={step}
            playing={playing}
            reduced={reduced}
            label={`${topic.title}. ${current.title}. ${current.caption}`}
          />
        ) : (
          <div className="stage-frame stage-loading" role="status">
            Loading the picture…
          </div>
        )}
        <div className="controls" role="group" aria-label={`${topic.title} playback`}>
          <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
            Previous
          </button>
          <button type="button" className="primary" aria-pressed={playing} aria-label={playLabel} onClick={() => setPlaying((value) => !value)}>
            {playing ? "Pause" : "Play"}
          </button>
          <button type="button" onClick={() => setStep((value) => Math.min(topic.steps.length - 1, value + 1))} disabled={step === topic.steps.length - 1}>
            Next
          </button>
          <p className="step-count">
            Step {step + 1} of {topic.steps.length}
          </p>
        </div>
        <div className="dots">
          {topic.steps.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={index === step ? "dot on" : "dot"}
              aria-current={index === step ? "step" : undefined}
              aria-label={`Step ${index + 1}: ${item.title}`}
              onClick={() => setStep(index)}
            />
          ))}
        </div>
        {reduced && <p className="note">Motion is reduced on this device. Play steps through the still pictures.</p>}
        <h2>{current.title}</h2>
        <p className="caption">{current.caption}</p>
        {current.note && <p className="note">{current.note}</p>}
        <StepEquations ids={current.equations} />
        <Legend symbols={elementsFor(topic)} />
        <aside className={topic.practice.safe ? "practice" : "practice practice-stop"}>
          <h2>{topic.practice.title}</h2>
          <p>{topic.practice.body}</p>
        </aside>
        {topic.related && (
          <p className="related">
            {topic.related.topicId ? (
              <SiteLink to={`/t/${topic.related.topicId}`}>{topic.related.label}</SiteLink>
            ) : (
              <a href={topic.related.href}>{topic.related.label}</a>
            )}
          </p>
        )}
        <section className="sources-block" aria-labelledby="sources-title">
          <h2 id="sources-title">Sources</h2>
          <ol className="sources">
            {topic.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href}>{source.title}</a>
                <p>{source.detail}</p>
              </li>
            ))}
          </ol>
        </section>
        <nav className="siblings" aria-label="More in this room">
          {topicsInRoom(topic.room).map((item) => (
            <SiteLink key={item.id} to={`/t/${item.id}`} className={item.id === topic.id ? "chip current" : "chip"}>
              {item.title}
            </SiteLink>
          ))}
        </nav>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <aside className="disclaimer">
            <h2>Disclaimer</h2>
            <p>{DISCLAIMER}</p>
          </aside>
          <p className="note">
            <a href={siteHref("/")}>All rooms</a>
          </p>
        </div>
      </footer>
    </>
  );
}
