import { Router, Request, Response } from "express";

export const mapsRouter: Router = Router()

/* returns list of all maps. includes id, name and src route*/
mapsRouter.get('/maps', (_: Request, res: Response) => {
    res.send([]);
});