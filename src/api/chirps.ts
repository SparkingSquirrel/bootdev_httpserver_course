import type { Request, Response } from "express";

import { respondWithJSON, respondWithError } from "./json.js";

export async function handlerChirpsValidate(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body;

  const maxChirpLength = 140;
  if (params.body.length > maxChirpLength) {
    respondWithError(res, 400, "Chirp is too long");
    return;
  }

  let words = params.body.split(" ");
  const badWords = ["kerfuffle", "sharbert", "fornax"];
  words.forEach((word, index) => {
    if (badWords.includes(word.toLowerCase())){
      words[index] = "****";
    }
  })

  const cleanedBody = words.join(" ");

  respondWithJSON(res, 200, {
    cleanedBody: cleanedBody,
  });
}
