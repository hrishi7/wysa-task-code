const router = require("express").Router();

/**controller function */
const { loginUser } = require("../controllers/authentication");


/**
 * @description   this route is used to login a user
 * @route   POST      /api/authentication/login
 * @access  Public
 */
router.post("/login", loginUser);

module.exports = router;
