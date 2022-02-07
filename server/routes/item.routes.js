const router = require('express').Router();
const itemController = require("../controllers/item.controller");

// router.get("/", itemController.selectAll);
router.post("/signUp",itemController.signUp)
router.post("/login",itemController.login)
router.put("/:email",itemController.update)

module.exports = router;
