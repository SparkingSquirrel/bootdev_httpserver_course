import { config } from "../config.js";
export async function handleGetFileserverHits(_, res) {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(`Hits: ${config.fileserverHits}`);
}
export async function handleResetFileserverHits(req, res, next) {
    config.fileserverHits = 0;
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(`Hit counter reset`);
}
