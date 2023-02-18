import { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Row, Collapse } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { useQuery, useMutation } from "../convex/_generated/react";

type Props = {
    players: Map<number, string>;
    me: number;
    owner: number;
};

const Players = ({ players, me, owner }: Props) => {
    return (
        <div>
            <div>Players:</div>
            <ul>
                {players &&
                    Array.from(players, ([id, name]) => ({
                        id,
                        name,
                    })).map(({ id, name }) => {
                        return (
                            <li key={id.toString()}>
                                {id == me ? "👤" : ""}
                                {id == owner ? "👑" : ""}
                                {name}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Players;
