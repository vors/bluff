import React, { useState, useEffect, MouseEvent } from "react";
import { Button, Col, Form, Row, Collapse } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { useQuery, useMutation } from "../convex/_generated/react";

type Props = {
    slug: string;
};

// This is trick to use `localStorage` on the client to handle the refreshes gracefully
// This is mostly useful to prevent "dead" players creation on window refresh
function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
        if (typeof window === "undefined") {
            console.log("we are running on the server");
            return defaultValue;
        }
        const stickyValue = localStorage.getItem(key);
        return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });
    React.useEffect(() => {
        if (typeof window === "undefined") {
            console.log("we are running on the server");
            return;
        }
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

const Game = ({ slug }: Props) => {
    const [joined, setJoined] = useState(false);
    const [userId, _setUserId] = useStickyState(Math.floor(Math.random() * 1000000), "bluff-userId");
    const setName = useMutation("setName");
    const game = useQuery("getGameBySlug", slug || null) || null;
    const joinGame = useMutation("joinGame");
    const lost = useMutation("lost");
    const openHands = useMutation("openHands");
    useEffect(() => {
        if (typeof window === "undefined") {
            console.log("we are running on the server");
            return;
        }
        if (game && game.state == "created" && !joined) {
            joinGame(game._id, userId, null);
            setJoined(true);
        }
    }, [joined, game]);

    const handleChangeName = (e) => {
        setName(game._id, userId, e.target.value);
    };

    const startGame = useMutation("startGame");
    const openCardFromDeck = useMutation("openCardFromDeck");

    async function handleStartGame(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
        await startGame(game._id);
    }

    const canChangeName = game && game.players.has(userId) && game.state == "created";
    const showStartGameButton = game && game.players.size > 1 && game.state == "created";
    const gameStarted = game && (game.state == "started" || game.state == "openhands");
    const gameFinished = game && game.state == "finished";

    async function handleLost(e: MouseEvent<HTMLElement>, player: number) {
        e.preventDefault();
        await lost(game._id, player);
    }

    async function handleShowOneMoreCard(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
        await openCardFromDeck(game._id);
    }

    return (
        <div>
            {game == null && <div>Game {slug} not found</div>}
            {game != null && (
                <div>
                    <div>Game {game._id.toString()}</div>
                    <div>
                        <p>Your name:</p>
                        <input
                            type="text"
                            value={game.players[userId]}
                            onChange={handleChangeName}
                            disabled={!canChangeName}
                        />
                    </div>
                    <div>
                        {/* uncomment to debug */}
                        {/* {game && <div>{JSON.stringify(game)}</div>} */}
                        <div>Players:</div>
                        <ul>
                            {game.players &&
                                Array.from(game.players, ([id, name]) => ({
                                    id,
                                    name,
                                })).map(({ id, name }) => {
                                    const isMe = id == userId;
                                    const lost = !game.cards.get(id);
                                    return (
                                        <li key={id.toString()}>
                                            {id == userId ? "????" : ""}
                                            {id == game.owner ? "????" : ""}
                                            {name} ---{" "}
                                            {gameStarted &&
                                                !lost &&
                                                JSON.stringify(
                                                    isMe || game.state == "openhands"
                                                        ? game.cards.get(id)
                                                        : Array(game.cards.get(id).length).fill("xx")
                                                )}
                                            {gameStarted &&
                                                userId == game.owner &&
                                                !lost &&
                                                game.state == "openhands" && (
                                                    <Button onClick={(e) => handleLost(e, id)}>Lost</Button>
                                                )}
                                            {gameFinished && <b>{game.cards.get(id) && " WINNER"}</b>}
                                        </li>
                                    );
                                })}
                        </ul>
                        <div>
                            <p>Open from deck:</p>
                            {game.openDeck && JSON.stringify(game.openDeck)}
                        </div>
                        {gameStarted && userId == game.owner && (
                            <Button onClick={(e) => openHands(game._id)}>Open Hands</Button>
                        )}
                        {gameStarted && userId == game.owner && game.state == "openhands" && (
                            <Button onClick={(e) => handleShowOneMoreCard(e)}>Show one more card from the deck</Button>
                        )}
                    </div>

                    {game && userId == game.owner && (
                        <div>
                            <Button onClick={(e) => handleStartGame(e)} disabled={!showStartGameButton}>
                                Start game (people will not be able to join after that)
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Game;
