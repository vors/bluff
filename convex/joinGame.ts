import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export default mutation(async ({ db }, game_id: Id<"games">, userId: number, userName: string | null) => {
    const game = (await db.get(game_id))!;
    let players = game.players;
    if (players.has(userId)) {
        return;
    }
    players.set(userId, userName || "Player" + userId.toString());
    await db.patch(game_id, { players: players });
    if (game.owner == -1) {
        // become owner
        db.patch(game_id, { owner: userId });
    }
});
