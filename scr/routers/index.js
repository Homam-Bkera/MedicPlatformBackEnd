const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/category", require("./category"));
router.use("/storage", require("./storage"));
router.use('/medicine', require("./medicine"));
router.use("/order", require("./order"));



//should be in the end of all routers
router.use('*', (req, res) => {
    res.status(404).json({ message: 'The Page Not Found', httpStatusCode: 404 })
});
module.exports = router;
