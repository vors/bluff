import Layout from "../components/Layout";

import { useRouter } from "next/router";
import Game from "../components/Game";
import { useState } from "react";

const ProjectPage = () => {
    const router = useRouter();
    const slug = router.query.slug as string;

    return (
        <Layout title={"Game " + slug}>
            <Game slug={slug} />
        </Layout>
    );
};

export default ProjectPage;
