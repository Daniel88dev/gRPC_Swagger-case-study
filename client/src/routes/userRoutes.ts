import { Router } from "express";
import { userClient } from "../grpcClient";

const router = Router();

// GET /user/create - display registration form
router.get("/create", (req, res) => {
  res.render("createUser");
});

// POST /user/create - registration post request
router.post("/create", (req, res) => {
  const { firstName, lastName, company, email, password } = req.body;

  userClient.CreateUser(
    { firstName, lastName, company, email, password },
    (err: any, response: any) => {
      if (err) return res.render("createUser", { error: err.message });
      res.redirect(`/user/${response.id}`);
    }
  );
});

// GET /user/:id - display user details
router.get("/:id", (req, res) => {
  userClient.GetUserById({ id: req.params.id }, (err: any, response: any) => {
    if (err) return res.status(404).render("error", { message: err.message });
    res.render("userDetail", { user: response });
  });
});

export default router;
