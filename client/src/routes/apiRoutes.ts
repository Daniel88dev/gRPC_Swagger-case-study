import { Router } from "express";
import { userClient } from "../grpcClient";

const router = Router();

// GET /api/users - returns Array of first 5 user ID's and email's
/**
 * @openapi
 * /api/users:
 *  get:
 *      tags:
 *        - Users
 *      summary: Default User's Array
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
/**
 * @openapi
 * /api/users/{offset}/{limit}:
 *  get:
 *    tags:
 *      - Users
 *    summary: Advanced User's Array
 *    description: >
 *      Responds with Array of user's ID, and email with limit (how many User objects will be returned),
 *      and offset (first returned user position in DB alphabetically ordered)
 *    parameters:
 *      - name: offset
 *        in: path
 *        description: first returned user position (minimum 1)
 *        required: true
 *        schema:
 *          type: integer
 *      - name: limit
 *        in: path
 *        description: how many User objects can be returned at once (5, 10, 25)
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Returns Array of Users
 *      500:
 *        description: Returns error with description
 */
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
/**
 * @openapi
 * /api/user/create:
 *   post:
 *      tags:
 *        - User
 *      summary: Register a user
 *      description: New User registration handler
 *      requestBody:
 *        description: User details for registration
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - firstName
 *                - lastName
 *                - company
 *                - email
 *                - password
 *              properties:
 *                firstName:
 *                  type: string
 *                  default: Daniel
 *                lastName:
 *                  type: string
 *                  default: Hrynusiw
 *                company:
 *                  type: string
 *                  default: Hyundai
 *                email:
 *                  type: string
 *                  default: daniel@hrynusiw.cz
 *                password:
 *                  type: string
 *                  default: heslo123
 *      responses:
 *        201:
 *          description: Returns user generated ID
 *        500:
 *          description: Returns error with description
 */
router.post("/user/create", (req, res) => {
  const { firstName, lastName, company, email, password } = req.body;
  userClient.CreateUser(
    { firstName, lastName, company, email, password },
    (err, response) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(response);
    }
  );
});

// GET /api/user/:id - returns a user object with details about a related user (by ID)
/**
 * @openapi
 * /api/user/{userId}:
 *  get:
 *    tags:
 *      - User
 *    summary: User Details
 *    description: Returns a User object with details about that user.
 *    parameters:
 *      - name: userId
 *        in: path
 *        description: user ID generated during user registration
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Returns User data
 *      500:
 *        description: Returns error with description
 */
router.get("/user/:id", (req, res) => {
  userClient.GetUserById({ id: req.params.id }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
});
// POST /api/login - return JWT token if successfully authenticated
/**
 * @openapi
 * /api/login:
 *   post:
 *      tags:
 *        - User
 *      summary: User Login
 *      description: Authentication of User
 *      requestBody:
 *        description: User details for authentication
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  default: daniel@hrynusiw.cz
 *                password:
 *                  type: string
 *                  default: heslo123
 *      responses:
 *        201:
 *          description: Returns generated JWT token
 *        500:
 *          description: Returns error with description
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  userClient.LoginUser({ email, password }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(response);
  });
});

export default router;
