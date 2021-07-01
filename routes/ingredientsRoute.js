const express = require("express");
const upload = require("../middleware/multer");
const {
  ingredientsList,
  ingredientCreate,
  ingredientDelete,
  ingredientDetail,
  ingredientFetch,
  ingredientUpdate,
} = require("../controllers/ingredientsController");
const router = express.Router();

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const myIngredient = await ingredientFetch(ingredientId);
  if (!myIngredient) next({ message: "Ingredient not found", status: 404 });
  req.myIngredient = myIngredient;
  next();
});

router.post("/", upload.single("image"), ingredientCreate);
router.delete("/:ingredientId", ingredientDelete);
router.post("/:ingredientId", upload.single("image"), ingredientUpdate);
router.get("/:ingredientId", ingredientDetail);
router.get("/", ingredientsList);

module.exports = router;
