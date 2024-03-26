const Medicine = require("../models/medicine");
const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const {Op} = require("sequelize");

class OrderService {
    constructor({ userId, storageId, price }) {
        this.userId = userId;
        this.storageId = storageId;
        this.price = price;
    }

    async add(transaction) {
        return await Order.create({
            userId: this.userId,
            storageId: this.storageId,
        }, { transaction: transaction });
    }
    async accpetOrder(id) {
        return await Order.update({ status: 'accepted' }, { where: { id: id } });
    }
    async completeOrder(id) {
        return await Order.update({ status: 'completed' }, { where: { id: id } });
    }
    async rejectedOrder(id) {
        return await Order.update({ status: 'rejected' }, { where: { id: id } });
    }
    async cancelOrder(id) {
        return await Order.update({ status: 'cancelled' }, { where: { id: id } });
    }
    async shipOrder(id) {
        return await Order.update({ status: 'shipping' }, { where: { id: id } });
    }
    async payForOrder(id) {
        return await Order.update({ status: 'paid' }, { where: { id: id } });
    }
    async addPrice(id, totalPrice, transaction) {
        return await Order.update({ price: totalPrice }, { where: { id: id } ,transaction: transaction});
    }
    async getOne(id) {
        return await Order.findByPk(id, { include: [{ model: OrderItem, required: true, include: { model: Medicine, required: true } }] });
    }
    async getAllByUser(userId) {
        return await Order.findAll({ where: { userId: userId }, order: [['createdAt', 'DESC']] });
    }
    async getAllByAdmin(storageId) {
        return await Order.findAll({ where: { storageId: storageId }, order: [['createdAt', 'DESC']] });
    }
    async getAllByStatus(storageId, status) {
        return await Order.findAll({ where: {[Op.and]: [{storageId: storageId}, {status: status}]}, order: [['createdAt', 'DESC']] });
    }
}
module.exports = OrderService;