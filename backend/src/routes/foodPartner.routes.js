const express = require('express')
const foodPartnerController = require('../controllers/foodPartner.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();

router.get(
  "/food-partner/:id",
  authMiddleware.authUserMiddleware,
  foodPartnerController.getFoodPartnerById,
);

module.exports = router;