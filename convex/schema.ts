import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
    //
    // Core
    //
    games: defineTable({
        owner: s.number(),
        slug: s.string(),
        players: s.map(s.number(), s.string()),
        // created, started, finished
        state: s.string(),
    }).index("by_slug", ["slug"]),
});
