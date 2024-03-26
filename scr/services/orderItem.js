const OrderItem = require("../models/orderItem");
class OrderItemService {
    constructor({ orderId, medicineId, qty }) {
        this.orderId = orderId;
        this.medicineId = medicineId;
        this.qty = qty;
    }

    async add(items,transaction) {
        return await OrderItem.bulkCreate(items,{transaction:transaction});
    }
}
module.exports = OrderItemService;