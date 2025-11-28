import type { Request, Response } from "express";
import { config } from "../config.js";
import { respondWithError } from "./json.js";
import { resetUsers } from "../db/queries/users.js";

export async function handlerReset(_: Request, res: Response) {
  if (config.api.platform != "DEV") {
    //DON'T DO THIS OUTSIDE OF DEV
    respondWithError(res, 403, "No permission to reset");
  }
  else {
    config.api.fileServerHits = 0;
    resetUsers();
    res.write("System reset. Users cleared. Hits reset to 0");
    res.end();
  }
}