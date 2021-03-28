"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cartproduct = /** @class */ (function () {
    function Cartproduct(itemId, productId, productName, productPrice, productQuantity) {
        if (itemId === void 0) { itemId = 0; }
        this.itemId = itemId;
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productQuantity = productQuantity;
    }
    return Cartproduct;
}());
exports.Cartproduct = Cartproduct;
//# sourceMappingURL=cartproduct.js.map