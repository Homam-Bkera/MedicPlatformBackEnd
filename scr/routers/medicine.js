const router = require("express").Router();
const controller = require("../controllers/medicine");
const apiHandler = require("../helpers/wrappers/api-handler");
const { verifyUserToken, verifyAdminToken } = require("../middleware/auth");
const upload=require("../helpers/uploadSingleImage");

router.post("/", apiHandler(verifyAdminToken), upload.single('image'),apiHandler(controller.add));
router.put("/", apiHandler(verifyAdminToken), upload.single('image'),apiHandler(controller.update));
router.get("/one", apiHandler(controller.getOne));
router.get("/all", apiHandler(controller.getAll));

module.exports = router;