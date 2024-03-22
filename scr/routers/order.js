const router = require("express").Router();
const controller = require("../controllers/order");
const apiHandler = require("../helpers/wrappers/api-handler");
const { verifyUserToken } = require("../middleware/auth");


router.post("/", apiHandler(verifyUserToken), apiHandler(controller.add));
router.get("/one",apiHandler(verifyUserToken),apiHandler(controller.getOne));


module.exports = router;