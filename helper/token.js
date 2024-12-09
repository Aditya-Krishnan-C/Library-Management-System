const jwt = require("jsonwebtoken");
module.exports = {
  signUp: async (body, next) => {
    try {
      return jwt.sign(body, process.env.TOKEN_SECRET, { expiresIn: "1h" });
    } catch (err) {
      console.error("Token sign-up error:", err.message);
      next(err);
    }
  },
  decode: async (token, next) => {
    try {
      return await jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      console.error("Token decode error:", err.message);
      return null;
    }
  },
};
