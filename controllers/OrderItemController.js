const { OrderItem } = require("../models/index.js");

const OrderItemController = {
    async create(req, res) {
        try {
            const orderitem = await OrderItem.create(req.body);
            res.status(201).send({ message: "Datos de pedido creados con éxito", orderitem });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error al crear los datos del pedido" });
        }
    },
};

module.exports = OrderItemController;
