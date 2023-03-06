import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { getShuffledDeck } from "./util/util";

export default mutation(async ({ db }, id: Id<"games">) => {
    await db.patch(id, { state: "started" });
    const game = (await db.get(id))!;
    const deck = getShuffledDeck();
    const cards = new Map<number, string[]>();
    for (const player of game.players.keys()) {
        const card = deck.pop()!;
        cards.set(player, [card]);
    }
    await db.patch(id, { closedDeck: deck, openDeck: null, cards });
    return cards;
});
