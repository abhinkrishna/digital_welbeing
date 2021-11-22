import { NextFunction, Request, Response } from "express";
import Method from "../../types/method";
import Route from "../../types/route";
import RestrictionController from "./restriction.controller";
import { CreateRestrictionDTO, UpdateRestrictionDTO } from "./restriction.dto";

const restrictionRoutes: Route[] = [
    {
        path: '/restrictions',
        method: Method.post,
        validator: CreateRestrictionDTO,
        controller: async (req: Request, res: Response, next: NextFunction) => {
            await new RestrictionController(req, res, next).create();
        }
    },
    {
        path: '/restrictions/:id',
        method: Method.patch,
        validator: UpdateRestrictionDTO,
        controller: async (req: Request, res: Response, next: NextFunction) => {
            await new RestrictionController(req, res, next).update();
        }
    },
    {
        path: '/restrictions',
        method: Method.get,
        controller: async (req: Request, res: Response, next: NextFunction) => {
            await new RestrictionController(req, res, next).readMany();
        }
    },
    {
        path: '/restrictions/:id',
        method: Method.get,
        controller: async (req: Request, res: Response, next: NextFunction) => {
            await new RestrictionController(req, res, next).readOne();
        }
    },
    {
        path: '/restrictions/:id',
        method: Method.delete,
        controller: async (req: Request, res: Response, next: NextFunction) => {
            await new RestrictionController(req, res, next).delete();
        }
    },
];

export default restrictionRoutes;