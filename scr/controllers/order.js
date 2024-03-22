const sequelize = require("../helpers/db/init");
const OrderService = require("../services/order");
const MedicineService = require("../services/medicine");
const OrderItemService = require("../services/orderItem");
const responseSender = require("../helpers/wrappers/response-sender").responseSender;
const CustomError = require("../helpers/errors/custom-errors");
const errors = require("../helpers/errors/errors.json");
const WalletService = require("../services/wallet");
module.exports = {
    add: async (req, res) => {
        const transaction = await sequelize.transaction({ autocommit: false });
        try {
            const { body } = req;
            body.userId = req.userId;
            const order = await new OrderService({ ...body }).add(transaction);
            body.orderId = order.id;
            let totalPrice = 0;
            let items = [];
            for (let i = 0; i < body.meds.length(); i++) {
                let med = await new MedicineService({}).getOne(body.meds[i].medicineId);
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
            const userWallet = await new WalletService({ ...body }).getWallet();
            if (userWallet.cash < totalPrice)
                throw new CustomError(errors.You_Can_Not_Do_This);
            await new WalletService({ ...body }).buy(totalPrice, transaction);
            const completedOrder = await new OrderService({}).updatePrice(order.id, totalPrice, transaction);
            const orderItem = await new OrderItemService({}).add(items, transaction);

            await transaction.commit();
            const result = {
                order: completedOrder,
                info: orderItem
            };
            responseSender(res, result);
        } catch (err) {
            console.log(err);
            await transaction.rollback();
        }
    },
    getOne: async (req,res)=>{
        const {id} = req.query;
        const result = await new OrderService({}).getOne(id);
        responseSender(res,result);
    },
    getAllByUser:async (req,res)=>{
        const userId = req.userId;
        const result = await new OrderService({}).getAllByUser(userId);
        responseSender(res,result);
    }
    
}