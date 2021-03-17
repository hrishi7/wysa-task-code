const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../config/database");

exports.loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      
      res.json({ success: false, message: err });
    } else if (!user) {
      res.json({ success: false, message: info.message });
    } else {
      const token = jwt.sign({ userId: user._id }, config.secret, {
        expiresIn: "30d",
      });

      res.status(200).json({
        success: true,
        token: token,
        user: user._id,
        nickname: user.nickname,
        message: "Login Successfull",
      });
    }
  })(req, res, next);
};