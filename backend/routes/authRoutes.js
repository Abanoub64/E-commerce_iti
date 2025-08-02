const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup_post);
router.get("/admin/users", authController.getAllUsers);

router.get("/logout", authController.logout_get);
router.post("/login", authController.login_post);
router.delete("/users/:id", authController.deleteUser);
module.exports = router;
