const express = require("express");

const { UserController, MovieController } = require("./controllers");
// const { authorization } = require("./controllers/UserController");

const router = express.Router();

router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
router.get("/users/:id", UserController.read);
router.put("/users/:id", UserController.edit);
router.post("/movies", MovieController.add);
router.get("/movies", MovieController.browse);

// router.post("/items", UserController.add);
// router.delete("/items/:id", UserController.delete);

// router.post("/movies", MovieController.add);

module.exports = router;
