import dotenv from "dotenv";
import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({
//   path: path.join(__dirname, ".env"),
// });

// app.use(express.static(path.join(__dirname, "dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});


console.log("ENV LOADED");
console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
