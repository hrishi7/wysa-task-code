exports.validateOnRegister = async (req, res, next) => {
  /* Check if email was provided*/
 
  if (!req.body.nickname) {
    return res.status(400).json({
      success: false,
      message: "You must provide a your nickname",
    }); // Return error
  }
  // if (passwordLengthChecker(req.body.password) == false) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Password must be at least 8 characters but no more than 35",
  //   }); // Return error
  // }
  // if (validPassword(req.body.password) == false) {
  //   return res.status(400).json({
  //     success: false,
  //     message:
  //       "Must have at least one uppercase, lowercase, special character, and number",
  //   });
  // }
  next();
};


// Validate Function to check password length
let passwordLengthChecker = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Check password length
    if (password.length < 8 || password.length > 50) {
      return false; // Return error if passord length requirement is not met
    } else {
      return true; // Return password as valid
    }
  }
};

// Validate Function to check if valid password format
let validPassword = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Regular Expression to test if password is valid format
    const regExp = new RegExp(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/
    );
    return regExp.test(password); // Return regular expression test result (true or false)
  }
};
