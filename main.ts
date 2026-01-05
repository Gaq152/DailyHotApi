import app from "./src/app.tsx";

const port = parseInt(Deno.env.get("PORT") || "6688");

console.log(`🔥 DailyHot API successfully runs on port ${port}`);
console.log(`🔗 Local: 👉 http://localhost:${port}`);

Deno.serve({ port }, app.fetch);
