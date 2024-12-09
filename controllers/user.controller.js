const { userService } = require("../services");
const bcrypt = require("bcryptjs");
const { token } = require("../helper");

module.exports = {
  loginForm: (req, res) => {
    res.render("form/loginpage");
  },
  signupForm: (req, res) => {
    res.render("form/signuppage");
  },
  profileView: async (req, res, next) => {
    try {
      const userId = req.userId;
      const user = await userService.findUserById(userId, next);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.render("form/viewprofile", {
        user: user,
        token: token,
      });
    } catch (err) {
      console.error("Error during profile view rendering:", err);
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userService.findUserEmail(email, next);
      if (!user) {
        res.locals.message =
          "Account doesnt exists with this account.Please try creating new account";
        return res.redirect("/api/auth/login");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.locals.message = "Invalid credentials. Please try again.";
        return res.redirect("/api/auth/login");
      }
      const userId = user._id;
      const authToken = await token.signUp({ userId }, next);
      user.token = authToken;
      await userService.updateUser(user, userId, next);
      res.cookie("token", authToken, { httpOnly: true, maxAge: 3600000 });
      console.log(user.token);
      return res.status(200).json({
        name: user.name,
        email: user.email,
        membership_type: user.membership_type,
        password: user.password,
        token: authToken,
      });
    } catch (err) {
      console.error("Error during login:", err);
      next(err);
    }
  },
  register: async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const user = await userService.findUserEmail(email, next);
      if (user) {
        return res
          .status(400)
          .json({ message: "Account already exists with this email." });
      }
      const pwd = await bcrypt.hash(password, 10);
      req.body.password = pwd;
      await userService.createUser(req.body, next);
      return res.render("form/accountCreated", { email, name });
    } catch (err) {
      console.error("Error during signup:", err);
      next(err);
    }
  },
  viewAllUsers: async (req, res, next) => {
    try {
      const users = await userService.findAllUsers(next);
      return res.json(users);
    } catch (err) {
      console.error("Error retrieving users:", err);
      next(err);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const userName = req.params.name;
      const updatedData = req.body;

      const user = await userService.findUserByName(userName, next);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const updatedUser = await userService.updateUser(
        updatedData,
        userName,
        next
      );
      return res.status(200).json({
        message: "User updated successfully",
        updatedUser,
      });
    } catch (err) {
      console.error("Error during updating user:", err);
      next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const userName = req.params.name;
      const user = await userService.findUserByName(userName, next);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await userService.deleteUser(user._id, next);
      return res.json({ message: `User ${userName} deleted successfully` });
    } catch (err) {
      console.error("Error deleting user:", err);
      next(err);
    }
  },
};
