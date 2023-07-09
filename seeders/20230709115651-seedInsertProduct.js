"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        return queryInterface.bulkInsert("Products", [
            { name: "Auriculares", description: "blancos", price: 10.5, stock: 800, categoryId: 3 },
            { name: "Zapatillas", description: "Converse", price: 100, stock: 80, categoryId: 2 },
            { name: "Ramen", description: "fideos chinos", price: 1.5, stock: 1800, categoryId: 1 },
            { name: "Iphone", description: "14 - negro", price: 960.5, stock: 40, categoryId: 4 },
            { name: "Chocolate", description: "con almendras", price: 4.2, stock: 4500, categoryId: 1 },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
