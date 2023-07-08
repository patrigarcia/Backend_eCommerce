const { Order, Product } = require("../models/index.js");

const OrderController = {
    async insert(req, res) {
        try {
            const order = await Order.create(req.body);

            // me guardo el producto que corresponde al productId
            const product = await Product.findByPk(req.body.productId);

            // verifico si el producto existe
            if (!product) {
                return res.status(404).send({ message: "No se encontró el producto" });
            }

            // asocio el producto al pedido
            await order.addProduct(product, {
                through: {
                    quantity: req.body.quantity, //agrego el quantity
                },
            });

            res.send(order);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Hubo un error al crear el pedido" });
        }
    },

    async update(req, res) {
        try {
            await Order.update(req.body, { where: { name: req.params.name } });
            res.send({ message: "El pedido fue actualizado" });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Hubo un error al actualizar el pedido" });
        }
    },

    async getAll(req, res) {
        try {
            const order = await Order.findAll();
            res.status(200).send(order);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Hubo un error al devolver todos los pedidos" });
        }
    },
};

module.exports = OrderController;
