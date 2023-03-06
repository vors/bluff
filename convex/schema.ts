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
        // cards in the deck
        closedDeck: s.union(s.null(), s.array(s.string())),
        // cards that we draw from the deck to see who lost
        openDeck: s.union(s.null(), s.array(s.string())),
    }).index("by_slug", ["slug"]),
});
