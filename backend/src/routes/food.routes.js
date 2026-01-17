const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/foodPartner.middleware");

router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  foodController.createFood,
);

module.exports = router;
