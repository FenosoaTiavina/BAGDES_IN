import { initEdgeStore } from "@edgestore/server";
import {
    CreateContextOptions,
    createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";
import { z } from "zod";

type Context = {
    userId: string;
    userRole: "admin" | "user";
};

function createContext({ req }: CreateContextOptions): Context {
    // get the session from your auth provider
    // const session = getSession(req);
    return {
        userId: "1234",
        userRole: "user",
    };
}

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
    publicImages: es
        .imageBucket({})
});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
    createContext,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;