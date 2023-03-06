import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export default mutation(async ({ db }, id: Id<"games">) => {
    const game = (await db.get(id))!;
    const deck = game.closedDeck!;
    const openDeck = game.openDeck || [];
    openDeck.push(deck.pop()!);
    await db.patch(id, { openDeck: openDeck, closedDeck: deck });
});
