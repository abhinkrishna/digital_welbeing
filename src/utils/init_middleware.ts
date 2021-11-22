import { Router } from "express";

export type MiddlewareRouter = ((serverRouter: Router) => Promise<void> | void)

const initMiddlewares = (middlewares: MiddlewareRouter[], serverRouter: Router) => {
    // iterate and add every middlewares
    for (const each of middlewares) {
        each(serverRouter);
    }
}

export default initMiddlewares;