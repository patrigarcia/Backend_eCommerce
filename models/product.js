"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.belongsTo(models.Category, { foreignKey: "categoryId" });

            Product.belongsToMany(models.Order, { through: models.OrderItem });
        }
    }
    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
                validate: {
                    notNull: {
                        msg: "Por favor introduce el nombre del producto",
                    },
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "El producto debe tener una descripción",
                    },
                },
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Por favor introduce el precio",
                    },
                },
            },

            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Debe introducir el stock disponible",
                    },
                },
            },
            imagePath: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Debe introducir una imagen",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Product",
            timestamps: false,
        }
    );
    return Product;
};
