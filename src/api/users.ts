import type { Request, Response } from "express";
import { respondWithJSON } from "./json.js";
import { createUser, resetUsers } from "../db/queries/users.js";

export async function handlerCreateUser(req: Request, res: Response) {
    type parameters = {
        email: string;
  };

  const params: parameters = req.body;

  const newUser = await createUser({email: params.email});

  respondWithJSON(res, 201, newUser);
}