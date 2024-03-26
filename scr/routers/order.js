const router = require("express").Router();
const controller = require("../controllers/order");
const apiHandler = require("../helpers/wrappers/api-handler");
const { verifyUserToken, verifyAdminToken } = require("../middleware/auth");


router.post("/", apiHandler(verifyUserToken), apiHandler(controller.add));
router.get("/one",apiHandler(controller.getOne));
router.get("/allUser",apiHandler(verifyUserToken),apiHandler(controller.getAllByUser));
router.get("/allAdmin",apiHandler(verifyAdminToken),apiHandler(controller.getAllByAdmin));
router.get("/allStorage",apiHandler(verifyAdminToken),apiHandler(controller.getAllStorageOrdersByStatus));
router.get("/cancel",apiHandler(verifyUserToken),apiHandler(controller.cancelOrderByUser));
router.get("/accept",apiHandler(verifyAdminToken),apiHandler(controller.acceptOrder));
router.get("/reject",apiHandler(verifyAdminToken),apiHandler(controller.rejectOrderByAdmin));
router.get("/pay",apiHandler(verifyUserToken),apiHandler(controller.payOrder));
router.get("/ship",apiHandler(verifyAdminToken),apiHandler(controller.shipOrderToUser));
router.get("/complete",apiHandler(verifyAdminToken),apiHandler(controller.completOrder));


module.exports = router;