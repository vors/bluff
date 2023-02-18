import { query } from "./_generated/server";
import { Document, Id } from "./_generated/dataModel";

// Get project by slug
export default query(async ({ db, auth }, slug: string): Promise<Document<"games"> | null> => {
    if (!slug) {
        return null;
    }
    return await db
        .query("games")
        .filter((q) => q.eq(q.field("slug"), slug))
        .unique();
});
