import express from "express";
import { userClient } from "./grpcClient";
import path from "path";
//import { runSequence } from "./initial";

const app = express();
const PORT = 8091;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));
app.use(express.urlencoded({ extended: true }));

// GET /users - display users table for first 5 users in email alphabetical order
app.get("/users", (req, res) => {
  userClient.GetUsers({ offset: 1, limit: 5 }, (err: any, response: any) => {
    if (err) return res.status(500).render("error", { message: err.message });
    res.render("users", { users: response.users });
  });
});

// GET /users/:offset/:limit - display users table with offset and limit parameters
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

// GET /user/:id - display user details
app.get("/user/:id", (req, res) => {
  userClient.GetUserById({ id: req.params.id }, (err: any, response: any) => {
    if (err) return res.status(404).render("error", { message: err.message });
    res.render("userDetail", { user: response });
  });
});

// GET /login - display login form
app.get("/login", (req, res) => {
  res.render("login");
});

// POST /login - login post request
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  userClient.LoginUser({ email, password }, (err: any, response: any) => {
    if (err) return res.render("login", { error: err.message });
    res.render("loginResult", { token: response.token });
  });
});

// GET /create-user - display registration form
app.get("/create-user", (req, res) => {
  res.render("createUser");
});

// POST /create-user - registration post request
app.post("/create-user", (req, res) => {
  const { firstName, lastName, company, email, password } = req.body;

  userClient.CreateUser(
    { firstName, lastName, company, email, password },
    (err: any, response: any) => {
      if (err) return res.render("createUser", { error: err.message });
      res.redirect(`/user/${response.id}`);
    }
  );
});

// GET / - display menu page
app.get("/", (_, res) => {
  res.send(`
    <h2>gRPC Client is running</h2>
    <ul>
      <li><a href="/create-user">User Registration</a></li>
      <li><a href="/users">Load users</a></li>
      <li><a href="/login">Login user</a></li>
    </ul>
  `);
});

app.listen(PORT, () => {
  //runSequence();

  console.log(`Client server running on http://localhost:${PORT}`);
});
