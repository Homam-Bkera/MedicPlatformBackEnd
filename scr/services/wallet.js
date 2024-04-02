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
        return await Wallet.update({ cash: parseFloat(userWallet.cash) + parseFloat(this.cash) }, { where: { userId: this.userId } });
    }
    async buy(amount) {
        const userWallet = await Wallet.findOne({ where: { userId: this.userId } });
        return await Wallet.update({ cash: parseFloat(userWallet.cash) - parseFloat(amount) }, { where: { userId: this.userId } });
    }
    async getWallet() {
        return await Wallet.findOne({ where: { userId: this.userId } });
    }
}
module.exports = walletService