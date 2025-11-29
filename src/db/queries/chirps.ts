import { db } from "../index.js";
import { chirps, NewChirp } from "../schema.js";
import { eq } from "drizzle-orm";

export async function addChirp(chirp: NewChirp){
    const [result] = await db
        .insert(chirps)
        .values(chirp)
        .onConflictDoNothing()
        .returning();
    return result;
}

export async function resetChirps() {
  const [result] = await db
    .delete(chirps);

  return result;
}

export async function getChirps() {
  const result = await db
    .select()
    .from(chirps); 
  return result;
}

export async function getChirp(chirpId: string) {
  const [result] = await db
    .select()
    .from(chirps)
    .where(eq(chirps.id, chirpId)); 
  return result;
}