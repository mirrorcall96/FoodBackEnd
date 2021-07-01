const express = require("express");
const upload = require("../middleware/multer");
const {
  recipesList,
  recipeCreate,
  recipeDelete,
  recipeDetail,
  recipeFetch,
  recipeUpdate,
} = require("../controllers/recipesController");
const router = express.Router();

router.param("recipeId", async (req, res, next, recipeId) => {
  const myRecipe = await recipeFetch(recipeId);
  if (!myRecipe) next({ message: "Recipe not found", status: 404 });
  req.myRecipe = myRecipe;
  next();
});

router.post("/", upload.single("image"), recipeCreate);
router.delete("/:recipeId", recipeDelete);
router.post("/:recipeId", upload.single("image"), recipeUpdate);
router.get("/:recipeId", recipeDetail);
router.get("/", recipesList);

module.exports = router;
