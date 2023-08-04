"use strict";
module.exports = (sequelize, DataTypes) => {
    const Adress = sequelize.define(
        "Adress",
        {
            idUser: DataTypes.INTEGER,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER,
            zipcode: DataTypes.INTEGER,
            city: DataTypes.STRING,
            other: DataTypes.STRING,
        },
        {}
    );
    Adress.associate = function (models) {
        Adress.belongsTo(models.User, { foreignKey: "idUser" });
    };
    return Adress;
};
