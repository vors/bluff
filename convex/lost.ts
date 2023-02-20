import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { getShuffledDeck } from "./util/util";

export default mutation(async ({ db }, id: Id<"games">, playerLost: number) => {
    await db.patch(id, { state: "started" });
    const game = (await db.get(id))!;
    const deck = getShuffledDeck();
    const cards = new Map<number, string[]>();
    for (const player of game.players.keys()) {
        // check do we need to drop this player from the game
        const oldCards = game.cards.get(player);
        if (!oldCards || (oldCards!.length == 5 && player == playerLost)) {
            game.players.delete(player);
            game.cards.delete(player);
            continue;
        }
        // deal k+1 cards to the player who lost
        let playerCards = [];
        if (player == playerLost) {
            playerCards.push(deck.pop()!);
        }
        for (const i of game.cards.get(player)!) {
            playerCards.push(deck.pop()!);
        }
        cards.set(player, playerCards);
    }
    await db.patch(id, { cards });
    return cards;
});
