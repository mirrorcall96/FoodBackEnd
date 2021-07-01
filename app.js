const express = require("express");
const cors = require("cors");
const db = require("./db/models");

const categoriesRoute = require("./routes/categoriesRoute");
const ingredientsRoute = require("./routes/ingredientsRoute");
const recipesRoute = require("./routes/recipesRoute");

const app = express();

app.use(cors());
app.use(express.json());
db.sequelize.sync({ alter: true });

app.use("/media", express.static("media"));

app.use("/categories", categoriesRoute);
app.use("/ingredients", ingredientsRoute);
app.use("/recipes", recipesRoute);

app.use((req, res, next) =>
  res.status(404).json({ message: "Path Not Found" })
);
app.use((err, req, res, next) =>
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" })
);

app.listen(8000);
