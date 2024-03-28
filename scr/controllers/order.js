const sequelize = require("../helpers/db/init");
const OrderService = require("../services/order");
const MedicineService = require("../services/medicine");
const OrderItemService = require("../services/orderItem");
const { responseSender } = require("../helpers/wrappers/response-sender");
const CustomError = require("../helpers/errors/custom-errors");
const errors = require("../helpers/errors/errors.json");
const WalletService = require("../services/wallet");
module.exports = {
    add: async (req, res) => {
        const transaction = await sequelize.transaction({ autocommit: false });
        try {
            let { body } = req;
            body.userId = req.userId;
            const order = await new OrderService({ ...body }).add(transaction);
            body.orderId = order.id;
            let totalPrice = 0;
            let items = [];
            for (let i = 0; i < body.meds.length; i++) {
                let med = await new MedicineService({}).getOne(body.meds[i].id);
                if (body.meds[i].qty > med.qty)
                    throw new CustomError(errors.You_Can_Not_Do_This);

                med.qty -= body.meds[i].qty
                await new MedicineService({}).updateQty(med.id, med.qty, transaction);
                let item = {
                    medicineId: med.id,
                    orderId: order.id,
                    qty: body.meds[i].qty
                };
                items.push(item);
                totalPrice += body.meds[i].qty * med.price;
            };
            await new OrderItemService({}).add(items, transaction);
            await new OrderService({}).addPrice(order.id, totalPrice, transaction);
            await transaction.commit();
            const result = await new OrderService({}).getOne(order.id);
            responseSender(res, result);
        } catch (err) {
            console.log(err);
            await transaction.rollback();
            throw new CustomError(errors.Internal_Server_Error);
        }
    },
    getOne: async (req, res) => {
        const { id } = req.query;
        const result = await new OrderService({}).getOne(id);
        responseSender(res, result);
    },
    getAllByUser: async (req, res) => {
        const userId = req.userId;
        const result = await new OrderService({}).getAllByUser(userId);
        responseSender(res, result);
    },
    getAllByAdmin: async (req, res) => {
        const storageId = req.storageId;
        const result = await new OrderService({}).getAllByAdmin(storageId);
        responseSender(res, result);
    },
    getAllStorageOrdersByStatus: async (req, res) => {
        const { status } = req.query;
        const storageId = req.storageId;
        const result = await new OrderService({}).getAllByStatus(storageId, status);
        responseSender(res, result);
    },
    acceptOrder: async (req, res) => {
        const { orderId } = req.query;
        const result = await new OrderService({}).accpetOrder(orderId);
        responseSender(res, result);
    },
    cancelOrderByUser: async (req, res) => {
        const { orderId } = req.query;
        const order = await new OrderService({}).getOne(orderId);
        if (order.status != 'pending')
            throw new CustomError(errors.You_Can_Not_Do_This);
        const result = await new OrderService({}).cancelOrder(orderId);
        responseSender(res, result);
    },
    completOrder: async (req, res) => {
        const { orderId } = req.query;
        const result = await new OrderService({}).completeOrder(orderId);
        responseSender(res, result);
    },
    rejectOrderByAdmin: async (req, res) => {
        const { orderId } = req.query;
        const order = await new OrderService({}).getOne(orderId);
        if (order.status != 'pending')
            throw new CustomError(errors.You_Can_Not_Do_This);
        const result = await new OrderService({}).rejectedOrder(orderId);
        responseSender(res, result);
    },
    shipOrderToUser: async (req, res) => {
        const { orderId } = req.query;
        const result = await new OrderService({}).shipOrder(orderId);
        responseSender(res, result);
    },
    payOrder: async (req, res) => {
        let { body } = req;
        body.userId = req.userId;
        const { orderId } = req.query;
        const userWallet = await new WalletService({ ...body }).getWallet();
        const order = await new OrderService({}).getOne(orderId);
        if (userWallet.cash < order.price)
            throw new CustomError(errors.You_Can_Not_Do_This);
        await new WalletService({ ...body }).buy(order.price);
        const result = await new OrderService({}).payForOrder(orderId);
        responseSender(res, result);
    }

}