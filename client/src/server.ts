import express from "express";
import { runSequence } from "./initial";

const app = express();
const PORT = 8091;

app.get("/", (_, res) => {
  res.send(`
    <h2>gRPC Client is running</h2>
    <ul>
      <li><a href="/status">Status</a></li>
      <li><a href="/users">Load users</a></li>
      <li><a href="/login">Login test user</a></li>
    </ul>
  `);
});

app.listen(PORT, () => {
  //runSequence();

  console.log(`Client server running on http://localhost:${PORT}`);
});
