const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    product:{ type : mongoose.Schema.Types.ObjectId, ref : 'product',required:true},
    quantity:{ type : Number, default: 1 }
    
    
})

module.exports = mongoose.model('Order', orderSchema)
module.exports = function Cart(oldCart) {
    this.items = oldCart.items;
    this.totalQty = oldCart.totalQty;
    this.totalPrice = oldCart.totalPrice;

    this.add = function (item, id) {
        let storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item:item, qty: 0, price: 0};

        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.price;
        
    }
    this.generateProductIdArray = function () {
        let arrayOfId = [];
        for (let id in this.items){
            arrayOfId.push(this.items[id]);
        }
        return arrayOfId;
        
    }
    
}