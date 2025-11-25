import express from "express";

import { handlerReadiness } from "./api/readiness.js";
import { handleGetFileserverHits, handleResetFileserverHits } from "./api/metrics.js";
import { middlewareLogResponse, middlewareMetricsInc } from "./api/middleware.js";

const app = express();
const PORT = 8080;

app.use(middlewareLogResponse);
app.use("/app", middlewareMetricsInc);
app.use("/app", express.static("./src/app"));
app.use("/api/metrics", handleGetFileserverHits);
app.use("/api/reset", handleResetFileserverHits);
app.get("/api/healthz", handlerReadiness);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
