const jwt = require("jsonwebtoken");
const userModel = require("../../models/user-model");

const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.flash("error", "you need to login first");
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "something went wrong");
    res.redirect("/");
  }
};

module.exports = isLoggedIn;