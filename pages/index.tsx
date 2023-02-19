import Link from "next/link";
import Layout from "../components/Layout";
import { useState, MouseEvent } from "react";
import { useMutation } from "../convex/_generated/react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

const IndexPage = () => {
    const newGame = useMutation("newGame");
    const router = useRouter();

    async function createGame(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
        const game = await newGame();
        router.push(`/${game.slug}`);
    }

    return (
        <Layout title="Bluff">
            <p>
                <ul>
                    <li>
                        You need to have communicate with your friends through some other means (like a voice call in
                        Discord).
                    </li>
                    <li>
                        The program will only deal cards, you need to keep track of everything else yourself! (low
                        tech).
                    </li>
                    <li>
                        Game creator has UI to tell program who lost and should get one more card in the next round.
                    </li>
                    <li>To invite people, click "New game" and share the link from your url.</li>
                </ul>
                <div>
                    <a href="https://docs.google.com/presentation/d/10UGca0ijlXIk6Z8Rq39Llxjc96VLkaiQPICAeDnsSbc/edit#slide=id.p">
                        Full game rules
                    </a>
                </div>
                <Button onClick={(e) => createGame(e)}>New game</Button>
            </p>
        </Layout>
    );
};

export default IndexPage;
