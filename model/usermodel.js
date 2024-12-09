const User = require("../model/usermodel");
const { dbHelper } = require("../helper");
module.exports = {
  findUserEmail: async (email, next) => {
    try {
      return await User.findOne({ email });
    } catch (err) {
      console.error("Error finding user by email:", err);
      next(err);
    }
  },
  findUserByName: async (name, next) => {
    try {
      return await User.findOne({ name });
    } catch (err) {
      console.error("Error finding user by name:", err);
      next(err);
    }
  },

  findUserById: async (id, next) => {
    return await dbHelper.findOne(User, { _id: id }, {}, next);
  },
  createUser: async (body, next) => {
    return await dbHelper.create(User, body, next);
  },
  updateUser: async (body, name, next) => {
    try {
      const filter = { name };
      return await User.findOneAndUpdate(filter, body, { new: true });
    } catch (error) {
      next(error);
    }
  },
  findAllUsers: async (next) => {
    try {
      return await User.find({});
    } catch (err) {
      console.error("Error retrieving all users:", err);
      next(err);
    }
  },
  deleteUser: async (userId, next) => {
    try {
      await User.findByIdAndDelete(userId);
    } catch (err) {
      console.error("Error deleting user:", err);
      next(err);
    }
  },
};
