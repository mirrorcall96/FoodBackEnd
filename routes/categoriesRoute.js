const express = require("express");
const upload = require("../middleware/multer");
const {
  categoriesList,
  categoryCreate,
  categoryDelete,
  categoryDetail,
  categoryFetch,
  categoryUpdate,
  ingredientCreate,
} = require("../controllers/categoriesController");
const router = express.Router();

router.param("categoryId", async (req, res, next, categoryId) => {
  const myCategory = await categoryFetch(categoryId);
  if (!myCategory) next({ message: "Category not found", status: 404 });
  req.myCategory = myCategory;
  next();
});

router.post("/", upload.single("image"), categoryCreate);
router.delete("/:categoryId", categoryDelete);
router.post("/:categoryId", upload.single("image"), categoryUpdate);
router.get("/:categoryId", categoryDetail);
router.post(
  "/:categoryId/ingredient",
  upload.single("image"),
  ingredientCreate
);

router.get("/", categoriesList);

module.exports = router;
