const User = require("../models/User");

exports.registerUser = async (req, res, next) => {
  try {
    let { nickname, password, avatar } = req.body;
    let exist = await User.findOne({ nickname });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "Nickname already used" });
    }
    let addedUser = await new User({
      nickname,
      password,
      avatar
    }).save();
    res.status(200).json({
      success: true,
      user: addedUser,
      message: "Registration is done Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.getloggedInUserInfo = async (req, res, next) => {
  try {
    let result = await User.findById(req.userData.userId);
    res.status(200).json({ success: true, user: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    req.logout();
    res.status(200).json({ success: true, message: "logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.checkNicknameExist = async (req, res, next) => {
  try {
    const nickname = req.params.nickname;
    let result = await User.countDocuments({ email: email });
    if (result > 0) {
      res.status(200).json({ success: false, message: "Nickname already Exist" });
    } else {
      res.status(200).json({ success: true, message: "Nickname is available" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

