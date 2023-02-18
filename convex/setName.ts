import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export default mutation(async ({ db }, game_id: Id<"games">, userId: number, userName: string) => {
    const game = (await db.get(game_id))!;
    let players = game.players;
    if (!players.has(userId)) {
        return;
    }
    players.set(userId, userName);
    await db.patch(game_id, { players: players });
});
