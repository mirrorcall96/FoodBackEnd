let { Category, Ingredient } = require("../db/models");

exports.categoryFetch = async (categoryId) => {
  const myCategory = await Category.findByPk(categoryId);
  return myCategory;
};

exports.categoryDelete = async (req, res, next) => {
  try {
    await req.myCategory.destroy();
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

exports.categoryDetail = async (req, res, next) =>
  res.status(201).json(req.myCategory);

exports.categoriesList = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: {
        model: Ingredient,
        attributes: ["id"],
      },
    });
    res.json(categories);
  } catch (e) {
    next(e);
  }
};
exports.categoryUpdate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://localhost:8000/${req.file.path}`;
    await req.myCategory.update(req.body);
    res.status(200).json(req.myCategory);
  } catch (e) {
    next(e);
  }
};
exports.categoryCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://localhost:8000/${req.file.path}`;
    const myCategory = await Category.create(req.body);
    res.status(201).json(myCategory);
  } catch (e) {
    next(e);
  }
};
exports.ingredientCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://localhost:8000/${req.file.path}`;
    req.body.categoryId = req.myCategory.id;
    const myIngredient = await Ingredient.create(req.body);
    res.status(201).json(myIngredient);
  } catch (e) {
    next(e);
  }
};
