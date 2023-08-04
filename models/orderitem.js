"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        static associate(models) {
            OrderItem.belongsTo(models.Order, { foreignKey: "orderId" });
        }
    }
    OrderItem.init(
        {},
        {
            sequelize,
            modelName: "OrderItem",
        }
    );
    return OrderItem;
};
