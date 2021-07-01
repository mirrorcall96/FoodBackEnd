let { Recipe, Category, Ingredient } = require("../db/models");

exports.recipeFetch = async (recipeId) => {
  const myRecipe = await Recipe.findByPk(recipeId);
  return myRecipe;
};

exports.recipeDelete = async (req, res, next) => {
  try {
    await req.myRecipe.destroy();
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

exports.recipeDetail = async (req, res, next) =>
  res.status(201).json(req.myRecipe);

exports.recipesList = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      include: {
        model: Ingredient,
      },
    });
    res.json(recipes);
  } catch (e) {
    next(e);
  }
};
exports.recipeUpdate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://localhost:8000/${req.file.path}`;
    await req.myRecipe.update(req.body);
    res.status(200).json(req.myRecipe);
  } catch (e) {
    next(e);
  }
};
exports.recipeCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://localhost:8000/${req.file.path}`;
    const myRecipe = await Recipe.create(req.body);
    let myIngrediants = await Ingredient.findAll({
      where: {
        id: req.body.ingredients.split(","),
      },
    });

    myRecipe.setIngredients(myIngrediants, myIngrediants);
    myRecipe.dataValues.Ingredients = myIngrediants;
    res.status(201).json(myRecipe);
  } catch (e) {
    next(e);
  }
};
