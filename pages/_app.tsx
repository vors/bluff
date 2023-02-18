import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from "react";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

function MyApp({ Component, pageProps }) {
    return (
        <React.StrictMode>
            <ConvexProvider client={convex}>
                <Component {...pageProps} />
            </ConvexProvider>
        </React.StrictMode>
    );
}

export default MyApp;
