let { Ingredient, Recipe, Category } = require("../db/models");

exports.ingredientFetch = async (ingredientId) => {
  const myIngredient = await Ingredient.findByPk(ingredientId);
  return myIngredient;
};

exports.ingredientDelete = async (req, res, next) => {
  try {
    await req.myIngredient.destroy();
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

exports.ingredientDetail = async (req, res, next) =>
  res.status(201).json(req.myIngredient);

exports.ingredientsList = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll({
      include: [Recipe, Category],
    });
    res.json(ingredients);
  } catch (e) {
    next(e);
  }
};
exports.ingredientUpdate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://localhost:8000/${req.file.path}`;
    await req.myIngredient.update(req.body);
    res.status(200).json(req.myIngredient);
  } catch (e) {
    next(e);
  }
};
exports.ingredientCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://localhost:8000/${req.file.path}`;
    const myIngredient = await Ingredient.create(req.body);
    res.status(201).json(myIngredient);
  } catch (e) {
    next(e);
  }
};
