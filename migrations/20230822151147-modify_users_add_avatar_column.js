"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn("Users", "avatar", {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "michael.png",
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([queryInterface.removeColumn("Users", "avatar")]);
    },
};
