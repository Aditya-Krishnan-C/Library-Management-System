module.exports = {
  find: async (Model, filter, options = {}, next) => {
    try {
      return await Model.find(filter, options);
    } catch (err) {
      console.error("Error in find method:", err);
      next(err);
    }
  },
  findOne: async (Model, filter, options = {}, next) => {
    try {
      return await Model.findOne(filter, options);
    } catch (err) {
      console.error("Error in findOne method:", err);
      next(err);
    }
  },
  findAll: async (Model, filter = {}, options = {}, next) => {
    return await Model.find(filter, options);
  },
  create: async (Model, body, next) => {
    try {
      return await Model.create(body);
    } catch (err) {
      console.error("Error in create method:", err);
      next(err);
    }
  },
  delete: async (Model, filter = {}, next) => {
    try {
      return await Model.findByIdAndDelete(filter._id);
    } catch (err) {
      console.error("Error in delete method:", err);
      next(err);
    }
  },
  update: async (Model, body, filter, next) => {
    try {
      return await Model.findOneAndUpdate(filter, body, { new: true });
    } catch (err) {
      console.error("Error in update method:", err);
      next(err);
    }
  },
};
