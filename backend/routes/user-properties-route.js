const router = require("express").Router();
const authCheck = require("../middleware/check-auth");

/**controller funtions of user */
const {
  updateProperties,
  getStatus,
} = require("../controllers/user-properties");

/**
 * @description   this route is used to update user properties
 * @route   PATCH      /user-properties//nickname/:nickname
 * @param nickname - provide nickname of user
 * @access  Private
 */
router.patch("/nickname/:nickname", authCheck, updateProperties);

/**
 * @description   this route is used to update user properties
 * @route   GET      /user-properties//nickname/:nickname
 * @param nickname - provide nickname of user
 * @access  Private
 */
router.get("/nickname/:nickname", authCheck, getStatus);

module.exports = router;
