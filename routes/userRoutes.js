const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");

// Define the user routes:
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

router.post("/", validationMiddleware, userController.createUser);

module.exports = router;