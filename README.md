# Bluff

A simple implementation of game [Bluff](https://docs.google.com/presentation/d/10UGca0ijlXIk6Z8Rq39Llxjc96VLkaiQPICAeDnsSbc/edit#slide=id.p).

Game is available on https://bluff-three.vercel.app/

## Development

One-time setup

```
npm i
npx convex init
```

## Run frontend and backend

```bash
# in one tab
npm run dev
```

```bash
# in another tab
npx convex dev
```

The website is now accessible at [http://localhost:3000](http://localhost:3000).

We use Convex to host the database. "Convex functions" read and write data from/to the database. These functions are written in TypeScript and deployed to Convex.

Getting started with Convex: https://docs.convex.dev/tutorial/welcome-to-convex

Run local "background" server, which listens to file changes and re-deploys the Convex functions:
