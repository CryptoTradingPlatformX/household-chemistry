import { useState } from "react";
import { LINES, explainTerm, type Line, type LineId, type RelationPart, type TermRef } from "../content/lines";

function FormulaText({ text }: { text: string }) {
  const parts = text.split(/(_[a-z0-9]+)/);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("_") ? <sub key={index}>{part.slice(1)}</sub> : <span key={index}>{part}</span>,
      )}
    </>
  );
}

function TermButton({ term, open, onToggle }: { term: TermRef; open: string | null; onToggle: (id: string) => void }) {
  const info = explainTerm(term.id);
  const expanded = open === term.id;
  return (
    <button type="button" className="term" aria-expanded={expanded} onClick={() => onToggle(term.id)}>
      <FormulaText text={term.label ?? info?.label ?? term.id} />
    </button>
  );
}

function Side({ terms, open, onToggle }: { terms: TermRef[]; open: string | null; onToggle: (id: string) => void }) {
  return terms.map((term, index) => (
    <span className="eq-piece" key={`${term.id}-${term.label ?? ""}-${index}`}>
      {index > 0 && <span className="eq-op">+</span>}
      {(term.count ?? 1) > 1 && <span className="eq-count">{term.count}</span>}
      <TermButton term={term} open={open} onToggle={onToggle} />
    </span>
  ));
}

function RelationButton({ part, open, onToggle }: { part: RelationPart & { id: string }; open: string | null; onToggle: (id: string) => void }) {
  const info = explainTerm(part.id);
  const expanded = open === part.id;
  return (
    <button type="button" className="term" aria-expanded={expanded} onClick={() => onToggle(part.id)}>
      <FormulaText text={info?.label ?? part.id} />
    </button>
  );
}

function LineView({ line, open, onToggle }: { line: Line; open: string | null; onToggle: (id: string) => void }) {
  return (
    <div className="equation-item">
      <div className="equation-line">
        <div className="equation" role="group" aria-label={line.reading}>
          {line.kind === "reaction" ? (
            <>
              <Side terms={line.left} open={open} onToggle={onToggle} />
              <span className="eq-arrow" aria-hidden="true">
                {line.catalyst && <span className="eq-catalyst">{line.catalyst}</span>}
                {line.reversible ? "⇌" : "→"}
              </span>
              <Side terms={line.right} open={open} onToggle={onToggle} />
              {line.suffix && <span className="eq-times">{line.suffix}</span>}
            </>
          ) : (
            line.parts.map((part, index) =>
              "id" in part ? (
                <RelationButton key={part.id} part={part} open={open} onToggle={onToggle} />
              ) : (
                <span key={`${part.text}-${index}`} className="eq-op">
                  {part.text}
                </span>
              ),
            )
          )}
          {line.simplified && <span className="simplified">Simplified</span>}
        </div>
      </div>
      <p className="equation-reading">{line.reading}</p>
      {line.kind === "relation" && <p className="math-example">{line.example}</p>}
      {line.aside && <p className="equation-aside">{line.aside}</p>}
    </div>
  );
}

export function StepEquations({ ids }: { ids: readonly LineId[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const info = open ? explainTerm(open) : undefined;

  function toggle(id: string) {
    setOpen((current) => (current === id ? null : id));
  }

  return (
    <div className="equation-block">
      <p className="equation-hint">Tap a term. The sentence under the line is the plain reading.</p>
      {ids.map((id) => (
        <LineView key={id} line={LINES[id]} open={open} onToggle={toggle} />
      ))}
      {info && (
        <p className="explain" role="region">
          <strong>{info.label}.</strong> {info.plain}
        </p>
      )}
    </div>
  );
}
