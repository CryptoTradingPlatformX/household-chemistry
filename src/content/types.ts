import type { LineId } from "./lines";

export type RoomId = "kitchen" | "cleaning" | "bathroom" | "house";

export interface TopicStep {
  title: string;
  caption: string;
  note?: string;
  equations: readonly LineId[];
}

export interface SourceRef {
  title: string;
  href: string;
  detail: string;
}

export interface Topic {
  id: string;
  room: RoomId;
  title: string;
  hook: string;
  signature: string;
  danger?: boolean;
  steps: readonly TopicStep[];
  practice: { title: string; body: string; safe: boolean };
  sources: readonly SourceRef[];
  related?: { label: string; topicId?: string; href?: string };
}

export interface Room {
  id: RoomId;
  title: string;
  blurb: string;
}

export const ROOMS: readonly Room[] = [
  {
    id: "kitchen",
    title: "Kitchen",
    blurb: "Fizz, crust, browning, and the quiet chemistry of a pot of water.",
  },
  {
    id: "cleaning",
    title: "Cleaning",
    blurb: "Soap, stains, rust, and one combination that should never happen.",
  },
  {
    id: "bathroom",
    title: "Bathroom & Body",
    blurb: "Teeth, sweat, hair, and sunlight, without the health hype.",
  },
  {
    id: "house",
    title: "Around the House",
    blurb: "Flames, batteries, ice, glow, and the plastics that shed tiny pieces.",
  },
];

export const DISCLAIMER =
  "This is educational, not medical, nutritional, or safety-engineering advice. It will not tell you how to treat a wound, a poisoning, or a gas leak. If someone may have breathed chlorine, chloramines, or carbon monoxide, get them to fresh air and contact emergency services or a poison center. Follow product labels. Do not mix household chemicals to see what happens.";

export const COPPER_SITE = {
  href: "https://cryptotradingplatformx.github.io/copper-bottle-chemistry/",
  label: "Copper bottle chemistry",
  detail: "A sibling tour of one metal water bottle, molecule by molecule, from the same kind of page.",
};
