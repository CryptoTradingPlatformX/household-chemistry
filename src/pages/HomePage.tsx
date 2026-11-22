import { useEffect } from "react";
import { SiteLink } from "../components/SiteLink";
import { topicsInRoom } from "../content/topics";
import { COPPER_SITE, DISCLAIMER, ROOMS } from "../content/types";

export function HomePage() {
  useEffect(() => {
    document.title = "Household Chemistry";
  }, []);

  return (
    <>
      <header className="hero">
        <p className="eyebrow">Around the house</p>
        <h1>Household Chemistry</h1>
        <div className="hero-copy">
          <p className="lede">
            The fizz in a glass, the brown on a steak, the crust in a kettle, the blue of a gas flame. Ordinary rooms, shown one molecule at a time.
          </p>
          <p className="lede-second">
            Made for people who last took chemistry a long time ago. Tap any formula. The sentence underneath is the translation. Nothing here is medical advice.
          </p>
          <a className="start" href="#rooms">
            Browse by room
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <svg className="shelf" viewBox="0 0 220 180">
            <rect x="18" y="150" width="184" height="8" rx="4" fill="#c9a27a" />
            <rect x="28" y="78" width="36" height="72" rx="8" fill="#f4e7c2" />
            <rect x="34" y="70" width="24" height="12" rx="3" fill="#e7d7b0" />
            <circle cx="46" cy="108" r="8" fill="#d94b3a" />
            <rect x="78" y="96" width="48" height="54" rx="10" fill="#7f93a8" />
            <path d="M86 96h32v8H86z" fill="#d9dde2" />
            <rect x="142" y="86" width="40" height="64" rx="12" fill="#3e6b4e" />
            <circle cx="162" cy="112" r="10" fill="#f4efe6" />
            <path d="M40 48c8-18 28-18 32 2" fill="none" stroke="#e15b4a" strokeWidth="4" />
            <circle cx="36" cy="46" r="7" fill="#e15b4a" />
            <circle cx="52" cy="34" r="6" fill="#f4f1ea" stroke="#3e4654" />
            <circle cx="70" cy="48" r="7" fill="#3d6fbe" />
          </svg>
        </div>
      </header>
      <aside className="danger-banner">
        <p className="eyebrow">Read this first</p>
        <h2>Never mix bleach</h2>
        <p>Bleach plus vinegar or other acids makes chlorine gas. Bleach plus ammonia makes chloramines. There is no useful reason to combine them, and this site will not tell you how.</p>
        <SiteLink to="/t/never-mix-bleach" className="start danger-start">
          Open the warning
        </SiteLink>
      </aside>
      <main id="rooms">
        {ROOMS.map((room) => (
          <section key={room.id} className={`room room-${room.id}`} aria-labelledby={`room-${room.id}`}>
            <h2 id={`room-${room.id}`}>{room.title}</h2>
            <p className="note">{room.blurb}</p>
            <div className="cards">
              {topicsInRoom(room.id).map((topic) => (
                <SiteLink key={topic.id} to={`/t/${topic.id}`} className={topic.danger ? "card danger-card" : "card"}>
                  {topic.danger && <span className="danger-flag">Danger</span>}
                  <h3>{topic.title}</h3>
                  <p>{topic.hook}</p>
                  <p className="sig">{topic.signature}</p>
                </SiteLink>
              ))}
            </div>
          </section>
        ))}
      </main>
      <section className="feature">
        <p className="eyebrow">Related</p>
        <h2>One bottle, closer up</h2>
        <p>The same kind of tour, about what water does to a bare copper bottle.</p>
        <a className="start" href={COPPER_SITE.href}>
          {COPPER_SITE.label}
        </a>
      </section>
      <footer className="footer">
        <div className="footer-inner">
          <aside className="disclaimer">
            <h2>Disclaimer</h2>
            <p>{DISCLAIMER}</p>
          </aside>
        </div>
      </footer>
    </>
  );
}
