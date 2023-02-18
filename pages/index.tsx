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
                <Button onClick={(e) => createGame(e)}>New game</Button>
            </p>
        </Layout>
    );
};

export default IndexPage;
