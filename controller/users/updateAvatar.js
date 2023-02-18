const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const [, extention] = originalname.split(".");
  const imageName = `${id}.${extention}`;
  const resultUpload = path.join(avatarDir, imageName);

  try {
    const image = await Jimp.read(tempUpload);
    await image
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);

    const avatarUrl = `/avatars/${imageName}`;

    await User.findByIdAndUpdate(id, { avatarUrl });
    res.status(200).json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
