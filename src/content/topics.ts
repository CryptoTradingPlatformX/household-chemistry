import { BATHROOM } from "./bathroom";
import { CLEANING } from "./cleaning";
import { HOUSE } from "./house";
import { KITCHEN } from "./kitchen";
import type { RoomId, Topic } from "./types";

export const TOPICS: readonly Topic[] = [...KITCHEN, ...CLEANING, ...BATHROOM, ...HOUSE];

const byId = new Map(TOPICS.map((topic) => [topic.id, topic]));

export function topicById(id: string): Topic | undefined {
  return byId.get(id);
}

export function topicsInRoom(room: RoomId): Topic[] {
  return TOPICS.filter((topic) => topic.room === room);
}
