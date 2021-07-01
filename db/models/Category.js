const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const myModel = sequelize.define(
    "Category",
    {
      slug: { type: DataTypes.STRING, unique: true },
      name: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING },
    },
    { createdAt: false, updatedAt: false }
  );
  SequelizeSlugify.slugifyModel(myModel, {
    source: ["name"],
  });
  return myModel;
};
