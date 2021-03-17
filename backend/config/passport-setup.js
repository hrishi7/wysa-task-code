const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "nickname"
    },
    (nickname, password, done) => {
        User.findOne({ nickname: nickname }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect nickname" });
          }
          if (!user.comparePassword(password)) {
            return done(null, false, { message: "Incorrect Password" });
          }
          return done(null, user);
        });
     
      
    }
  )
);
