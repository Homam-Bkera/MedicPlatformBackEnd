const router = require("express").Router();
const controller = require("../controllers/category");
const apiHandler = require("../helpers/wrappers/api-handler");
const { verifyUserToken, verifyAdminToken } = require("../middleware/auth");


router.post("/", apiHandler(verifyAdminToken), apiHandler(controller.add));
router.put("/", apiHandler(verifyAdminToken), apiHandler(controller.update));
router.delete("/", apiHandler(verifyAdminToken), apiHandler(controller.delete));
router.get("/all", apiHandler(controller.getAll));
router.get("/one", apiHandler(controller.getOne));

module.exports = router;