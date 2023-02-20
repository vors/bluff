import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export default mutation(async ({ db }, id: Id<"games">) => {
    await db.patch(id, { state: "openhands" });
});
