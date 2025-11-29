import type { Request, Response } from "express";

import { respondWithJSON } from "./json.js";
import { BadRequestError } from "./errors.js";
import { addChirp, getChirps } from "../db/queries/chirps.js";

export async function handlerChirp(req: Request, res: Response) {
  type parameters = {
    body: string;
    userId: string;
  };

  const params: parameters = req.body;

  const maxChirpLength = 140;
  if (params.body.length > maxChirpLength) {
    throw new BadRequestError(
      `Chirp is too long. Max length is ${maxChirpLength}`,
    );
  }

  const words = params.body.split(" ");

  const badWords = ["kerfuffle", "sharbert", "fornax"];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const loweredWord = word.toLowerCase();
    if (badWords.includes(loweredWord)) {
      words[i] = "****";
    }
  }

  const cleaned = words.join(" ");

  const result = await addChirp({body: cleaned, userId: params.userId});

  respondWithJSON(res, 201, result);
}

export async function handlerGetChirps(_: Request, res: Response) {
  console.log("HELLO 1: handlerGetChirps")
  const chirps = await getChirps();
  console.log(chirps);
  respondWithJSON(res, 200, chirps);
}
