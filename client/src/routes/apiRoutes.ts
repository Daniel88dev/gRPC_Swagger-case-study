import { Router } from "express";
import { userClient } from "../grpcClient";

const router = Router();

// GET /api/users - returns Array of first 5 user ID's and email's
/**
 * @openapi
 * /api/users:
 *  get:
 *      tag:
 *      - Registered user Array
 *      description: Responds with Array of user's ID, and email
 *      responses:
 *        200:
 *          description: Returns first 5 users alphabetically ordered
 *        500:
 *          description: Returns error with description
 */
router.get("/users", (req, res) => {
  userClient.GetUsers({ offset: 1, limit: 5 }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response?.users);
  });
});

// GET /api/users/:offset/:limit - returns Arrays of users to display up to (limit) users starting from offset (ordered by email)
router.get("/users/:offset/:limit", (req, res) => {
  const { offset, limit } = req.params;
  userClient.GetUsers(
    { offset: parseInt(offset), limit: parseInt(limit) },
    (err, response) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(response?.users);
    }
  );
});

// POST /api/user/create - registration of user. Returns new user ID
router.post("/user/create", (req, res) => {
  const { firstName, lastName, company, email, password } = req.body;
  userClient.CreateUser(
    { firstName, lastName, company, email, password },
    (err, response) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(response);
    }
  );
});

// GET /api/user/:id - returns a user object with details about a related user (by ID)
router.get("/user/:id", (req, res) => {
  userClient.GetUserById({ id: req.params.id }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
});
// POST /api/login - return JWT token if successfully authenticated
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  userClient.LoginUser({ email, password }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
});

export default router;
