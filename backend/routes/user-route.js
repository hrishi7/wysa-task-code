const router = require("express").Router();
const authCheck = require("../middleware/check-auth");

/**controller funtions of user */
const {
  getloggedInUserInfo,
  registerUser,
  logoutUser,
  checkNicknameExist,
} = require("../controllers/user");

const { validateOnRegister } = require("./validation/authentication");

/**
 * @description   this route is used to create a new user
 * @route   POST      /user/
 * @access  Private
 */
router.post("/", validateOnRegister, registerUser);

/**
 * @description   this route is used to get loggedin user info
 * @route   GET      /user/
 * @access  Private
 */
router.get("/", authCheck, getloggedInUserInfo);

/**
 * @description   this route is used to check for username exist
 * @route   GET      /user/user-exist/:username
 * @access  Private
 */
router.get("/user-exist/nickname/:nickname", checkNicknameExist);

/**
 * @description   this route is used to logout
 * @route   POST      /user/logout
 * @access  Private
 */
router.post("/logout", authCheck, logoutUser);

module.exports = router;
