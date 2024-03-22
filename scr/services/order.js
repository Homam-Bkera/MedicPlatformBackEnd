const Medicine = require("../models/medicine");
const Order = require("../models/order");
const OrderItem = require("../models/orderItem");

class OrderService {
    constructor({ userId, price }) {
        this.userId = userId;
        this.price = price;
    }

    async add(transaction) {
        return await Order.create({
            userId: this.userId,
        }, { transaction: transaction });
    }
    async addPrice(id, price, transaction) {
        return await Order.update({ price: price }, { where: { id: id } }, { transaction: transaction });
    }
    async getOne(id){
        return await Order.findByPk(id,{include:[{model:OrderItem,required:true,include:{model:Medicine,required:true}}]});
    }
    async getAllByUser(userId){
        return await Order.findAll({where:{userId:userId}});
    }
}
module.exports = OrderService;