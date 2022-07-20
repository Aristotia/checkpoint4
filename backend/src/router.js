const express = require("express");

const { UserController } = require("./controllers");
const { authorization } = require("./controllers/UserController");

const router = express.Router();

router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
// router.get("/items", UserController.browse);
router.get("/users/:id", authorization, UserController.read);
// router.put("/items/:id", UserController.edit);
// router.post("/items", UserController.add);
// router.delete("/items/:id", UserController.delete);

// router.post("/movies", MovieController.add);

module.exports = router;
