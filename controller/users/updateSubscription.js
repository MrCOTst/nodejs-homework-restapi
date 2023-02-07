const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscriptions = async (req, res) => {
  const { _id: userId } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    userId,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`User with id=${userId} not found`);
  }
  res.status(200).json({
    user: {
      subscription,
    },
  });
};

module.exports = updateSubscriptions;
