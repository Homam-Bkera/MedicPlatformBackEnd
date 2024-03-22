const OrderItem = require("../models/orderItem");
class OrderItemService {
    constructor({ orderId, medicineId, qty }) {
        this.orderId = orderId;
        this.medicineId = medicineId;
        this.qty = qty;
    }

    async add(items, transaction) {
        await OrderItem.bulkCreate(items).then(() => {
            transaction.commit()
        }).catch((err) => {
            console.log(err);
            transaction.rollback();
        });
    }
}
module.exports = OrderItemService;