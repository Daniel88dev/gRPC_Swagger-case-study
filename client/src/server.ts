import express from "express";
import path from "path";
import userRoutes from "./routes/userRoutes";
import loginRoutes from "./routes/loginRoutes";
import usersRoutes from "./routes/usersRoutes";
import apiRoutes from "./routes/apiRoutes";
import swaggerDocs from "./utils/swagger";
//import { runSequence } from "./initial";

//middleware
const app = express();
const PORT = 8091;
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// handle routes
app.use("/users", usersRoutes);
app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/api", apiRoutes);

// GET / - display menu page
app.get("/", (_, res) => {
  res.render("home");
});

app.listen(PORT, async () => {
  //await runSequence();

  swaggerDocs(app, PORT);

  console.log(`Client server running on http://localhost:${PORT}`);
});
