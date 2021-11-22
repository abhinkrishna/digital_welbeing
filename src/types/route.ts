import { NextFunction, Request, Response } from "express";
import Method from "./method";

type Route = {
    path: string,
    method: Method,
    validator?: any,
    middlewares?: ((req: Request, res: Response, next: NextFunction) => any)[],
    controller: ((req: Request, res: Response, next: NextFunction) => Promise<void> | void)
}

export default Route;