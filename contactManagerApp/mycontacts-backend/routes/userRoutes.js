const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
// these above are public

router.get("/current",validateToken, currentUser); 
// if it is private , we use jwt token as parameter

module.exports = router;