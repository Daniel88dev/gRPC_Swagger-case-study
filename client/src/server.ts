import express from "express";
import { userClient } from "./grpcClient";
import path from "path";
//import { runSequence } from "./initial";

const app = express();
const PORT = 8091;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  userClient.GetUsers({ offset: 1, limit: 5 }, (err: any, response: any) => {
    if (err) return res.status(500).render("error", { message: err.message });
    res.render("users", { users: response.users });
  });
});

app.get("/users/:offset/:limit", (req, res) => {
  const { offset, limit } = req.params;
  userClient.GetUsers(
    { offset: parseInt(offset), limit: parseInt(limit) },
    (err: any, response: any) => {
      if (err) return res.status(500).render("error", { message: err.message });
      res.render("users", { users: response.users });
    }
  );
});

app.get("/user/:id", (req, res) => {
  userClient.GetUserById({ id: req.params.id }, (err: any, response: any) => {
    if (err) return res.status(404).render("error", { message: err.message });
    res.render("userDetail", { user: response });
  });
});

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
