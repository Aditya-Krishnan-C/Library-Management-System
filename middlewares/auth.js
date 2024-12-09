const { token } = require("../helper");

module.exports = {
  auth: async (req, res, next) => {
    try {
      const tokenFromCookie = req.cookies["token"];
      console.log("Token from cookie:", tokenFromCookie);
      if (!tokenFromCookie) {
        return res.status(401).json({ message: "Please login to continue" });
      }
      const decoded = await token.decode(tokenFromCookie);
      if (!decoded || !decoded.userId) {
        return res
          .status(401)
          .json({ message: "Invalid or expired token. Please login again." });
      }
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error("Authentication error:", error.message);
      return res.status(500).json({
        message:
          "An error occurred during authentication. Please try logging in again.",
      });
    }
  },
};
