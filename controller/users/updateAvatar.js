const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  const resultUpload = path.join(avatarDir, imageName);

  try {
    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250).writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);

    const avatarUrl = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.status(200).json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;