import { NextFunction, Request, Response } from "express";
import Method from "../../types/method";
import Route from "../../types/route";
import UserController from "./users.controller";
import { CreateUserDTO, UpdateUserDTO } from "./users.dto";

const userRoutes: Route[] = [
    {
        path: '/users',
        method: Method.post,
        validator: CreateUserDTO,
        controller: async (req: Request, res: Response, next: NextFunction) => {
            await new UserController(req, res, next).create();
        }
    },
    {
        path: '/users/:id',
        method: Method.patch,
        validator: UpdateUserDTO,
        controller: async (req: Request, res: Response, next: NextFunction) => {
            await new UserController(req, res, next).update();
        }
    },
    {
        path: '/users',
        method: Method.get,
        controller: async (req: Request, res: Response, next: NextFunction) => {
            await new UserController(req, res, next).readMany();
        }
    },
    {
        path: '/users/:id',
        method: Method.get,
        controller: async (req: Request, res: Response, next: NextFunction) => {
            await new UserController(req, res, next).readOne();
        }
    },
    {
        path: '/users/:id',
        method: Method.delete,
        controller: async (req: Request, res: Response, next: NextFunction) => {
            await new UserController(req, res, next).delete();
        }
    },
];

export default userRoutes;