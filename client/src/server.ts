import express from "express";
import path from "path";
import userRoutes from "./routes/userRoutes";
import loginRoutes from "./routes/loginRoutes";
import usersRoutes from "./routes/usersRoutes";
import apiRoutes from "./routes/apiRoutes";
//import { runSequence } from "./initial";

//middleware
const app = express();
const PORT = 8091;
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle routes
app.use("/users", usersRoutes);
app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/api", apiRoutes);

// GET / - display menu page
app.get("/", (_, res) => {
  res.send(`
    <h2>gRPC Client is running</h2>
    <ul>
      <li><a href="/user/create">User Registration</a></li>
      <li><a href="/users">Load users</a></li>
      <li><a href="/login">Login user</a></li>
    </ul>
  `);
});

app.listen(PORT, () => {
  //runSequence();

  console.log(`Client server running on http://localhost:${PORT}`);
});
