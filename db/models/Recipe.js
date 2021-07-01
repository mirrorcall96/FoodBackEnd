const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const myModel = sequelize.define(
    "Recipe",
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
  myModel.associate = (models) => {
    models.Ingredient.belongsToMany(myModel, {
      through: "Recipe_Ingredient",
      foreignKey: "ingredientId",
    });
    myModel.belongsToMany(models.Ingredient, {
      through: "Recipe_Ingredient",
      foreignKey: "recipeId",
    });
  };
  return myModel;
};
