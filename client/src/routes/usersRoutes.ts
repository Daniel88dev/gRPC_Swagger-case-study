import { Router } from "express";
import { userClient } from "../grpcClient";

const router = Router();

// GET /users - display user's table for first 5 users in email alphabetical order
router.get("/", (req, res) => {
  userClient.GetUsers({ offset: 1, limit: 5 }, (err, response) => {
    if (err) return res.status(500).render("error", { message: err.message });
    res.render("users", { users: response?.users });
  });
});

// GET /users/:offset/:limit - display users table with offset and limit parameters
router.get("/:offset/:limit", (req, res) => {
  const { offset, limit } = req.params;
  userClient.GetUsers(
    { offset: parseInt(offset), limit: parseInt(limit) },
    (err, response) => {
      if (err) return res.status(500).render("error", { message: err.message });
      res.render("users", { users: response?.users });
    }
  );
});

export default router;
