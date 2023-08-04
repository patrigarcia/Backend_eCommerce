"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, { foreignKey: "userId" });
            Order.belongsToMany(models.Product, { through: models.OrderItem });
            Order.hasMany(models.OrderItem);
        }
    }
    Order.init(
        {
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
