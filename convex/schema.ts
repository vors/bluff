import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
    games: defineTable({
        owner: s.number(),
        slug: s.string(),
        players: s.map(s.number(), s.string()),
        // created, started, openhands, finished
        state: s.string(),
        // cards is a map from playerId to their hand. Each card is represented as a string
        cards: s.map(s.number(), s.array(s.string())),
    }).index("by_slug", ["slug"]),
});
