import React, { useState, useEffect, MouseEvent } from "react";
import { Button, Col, Form, Row, Collapse } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { useQuery, useMutation } from "../convex/_generated/react";
import Players from "./Players";

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

    async function handleStartGame(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
        await startGame(game._id);
    }

    const canChangeName = game && game.players.has(userId) && game.state == "created";
    const showStartGameButton = game && game.players.size > 1 && game.state == "created";
    const gameStarted = game && game.state == "started";

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

                    <Players players={game.players} me={userId} owner={game.owner} />

                    {game && userId == game.owner && (
                        <div>
                            <Button onClick={(e) => handleStartGame(e)} disabled={!showStartGameButton}>
                                Start game (people will not be able to join after that)
                            </Button>
                        </div>
                    )}

                    {gameStarted && <div>GAME IS ON</div>}
                </div>
            )}
        </div>
    );
};

export default Game;
