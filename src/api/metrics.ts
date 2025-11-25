import type { Request, Response, NextFunction } from "express";
import { config } from "../config.js";
import { nextTick } from "process";

export async function handleGetFileserverHits(_: Request, res: Response) {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send(`<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.fileserverHits} times!</p>
  </body>
</html>`);
}

export async function handleResetFileserverHits(req: Request, res: Response, next: NextFunction) {
    config.fileserverHits = 0;
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(`Hit counter reset`);
}
