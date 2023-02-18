import { mutation } from "./_generated/server";
import { Document } from "./_generated/dataModel";

export default mutation(async ({ db }): Promise<Document<"games">> => {
    const game = { owner: -1, state: "created", slug: "", players: new Map() };
    const id = await db.insert("games", game);
    await db.patch(id, { slug: id.toString().toLowerCase() });
    return (await db.get(id))!;
});
