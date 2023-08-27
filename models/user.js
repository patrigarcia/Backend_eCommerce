"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Order, { foreignKey: "userId" });
            User.hasMany(models.Adress, { foreignKey: "idUser" });
        }
    }
    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Por favor introduce tu nombre",
                    },
                },
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mail: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notNull: { msg: "Por favor introduce tu correo" },
                    isEmail: { msg: "Por favor introduce un correo valido" },
                },
            },
            tel: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            password: DataTypes.STRING,
            role: DataTypes.STRING,
            avatar: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
