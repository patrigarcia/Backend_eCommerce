const { Order, Product } = require("../models/index.js");

const OrderController = {
    async insert(req, res) {
        try {
            if (!req.user) {
                return res.status(401).send({ message: "Por favor, inicia sesión para hacer un pedido" });
            }

            const order = await Order.create({ status: req.body.status, userId: req.user.id, productIds: req.body.productIds });

            // me guardo en una constante todos los id de productos que ingresa el usuario en el body en un array
            const products = await Product.findAll({ where: { id: req.body.productIds } });

            // hago la verificación de que todos los productos que pide existan
            if (products.length !== req.body.productIds.length) {
                return res.status(404).send({ message: "No se encontró uno o más productos" });
            }

            // hago la asociación de cada producto con el pedido
            for (const product of products) {
                await order.addProduct(product, {
                    through: {
                        status: req.body.status, // Agregar el estado del pedido
                    },
                });
            }

            res.send({ message: "El pedido fue creado exitosamente", order });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Hubo un error al crear el pedido" });
        }
    },

    async update(req, res) {
        try {
            await Order.update(req.body, { where: { Id: req.params.Id } });
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

    async deleteOrder(req, res) {
        try {
            const orderId = req.params.id;

            const order = await Order.findOne({ where: { id: orderId } });
            if (!order) {
                return res.status(404).send({ message: "No se encontró el pedido" });
            }

            await Order.destroy({ where: { id: orderId } });

            res.send({ message: "El pedido fue eliminado exitosamente" });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Hubo un error al eliminar el pedido" });
        }
    },
};

module.exports = OrderController;
