import app from './app.js';
import connectionToDb from "./Config/dbConn.js";

const PORT = process.env.PORT || 5500;

app.listen(PORT, async () => {
  // Connect to DB
  await connectionToDb();
  console.log(`App is running at http://localhost:${PORT}`);
});
