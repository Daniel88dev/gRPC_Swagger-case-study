import { Router } from "express";
import { userClient } from "../grpcClient";

const router = Router();

// GET /login - display login form
router.get("/", (req, res) => {
  res.render("login");
});

// POST /login - login post request
router.post("/", (req, res) => {
  const { email, password } = req.body;

  userClient.LoginUser({ email, password }, (err, response) => {
    if (err) return res.render("login", { error: err.message });
    res.render("loginResult", { token: response?.token });
  });
});

export default router;
