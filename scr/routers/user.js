const router = require("express").Router();
const controller = require("../controllers/user");
const { verifyUserToken, verifyAdminToken } = require("../middleware/auth");
const apiHandler = require("../helpers/wrappers/api-handler");


router.post("/", apiHandler(controller.add));
router.post("/login", apiHandler(controller.login));
router.post("/chargeWallet", apiHandler(verifyUserToken), apiHandler(controller.chargeWallet));
router.put("/",apiHandler(verifyUserToken),apiHandler(controller.update));
router.get("/profile", apiHandler(verifyUserToken), apiHandler(controller.getById));
router.get("/wallet", apiHandler(verifyUserToken), apiHandler(controller.getUserWallet));
module.exports = router;
