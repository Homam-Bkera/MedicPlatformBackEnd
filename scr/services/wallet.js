const Wallet = require("../models/wallet");
class walletService {
    constructor({ userId, cash }) {
        this.userId = userId;
        this.cash = cash;
    }
    async add() {
        return await Wallet.create({
            userId: this.userId,
            cash: this.cash
        });
    }
    async charge() {
        const userWallet = await Wallet.findOne({ where: { userId: this.userId } });
        return await Wallet.update({ cash: userWallet.cash + this.cash }, { where: { userId: this.userId } });
    }
    async buy(amount, transaction) {
        const userWallet = await Wallet.findOne({ where: { userId: this.userId } });
        return await Wallet.update({ cash: userWallet.cash - amount }, { where: { userId: this.userId } }, { transaction: transaction });
    }
    async getWallet(userId) {
        return await Wallet.findOne({ where: { userId: userId } });
    }
}
module.exports = walletService