const { User, Order, Product, Adress, Token, Sequelize } = require("../models/index.js");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const USER_ROLE = "user";

const UserController = {
    async create(req, res) {
        try {
            const password = bcrypt.hashSync(req.body.password, 10);
            const newUser = { ...req.body, password: password, role: USER_ROLE };
            const resultUser = await User.create(newUser);
            res.status(201).send({ message: "Usuario creado con éxito", user: resultUser });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error al crear el usuario" });
        }
    },

    async update(req, res) {
        try {
            await User.update(req.body, { where: { name: req.params.name } });
            res.send({ message: "El usuario se ha actualizado" });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error al actualizar el usuario" });
        }
    },

    async getAll(req, res) {
        try {
            const users = await User.findAll({
                include: [Adress],
            });
            res.status(200).send(users);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error al devolver todos los usuarios" });
        }
    },

    async login(req, res) {
        try {
            console.log(req.body);
            const user = await User.findOne({ where: { mail: req.body.mail } });
            if (!user) {
                return res.status(400).send({ message: "Usuario o contraseña incorrecta" });
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({ message: "Usuario o contraseña incorrecta" });
            }
            const token = jwt.sign({ id: user.id }, jwt_secret);
            Token.create({ token, UserId: user.id });
            res.send({ message: "Bienvenid@ " + user.name, user, token });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error autenticando al usuario" });
        }
    },

    async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [{ UserId: req.user.id }, { token: req.headers.authorization }],
                },
            });
            res.send({ message: "Desconectado con éxito" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Hubo un problema al tratar de desconectarte" });
        }
    },

    async getUserOrders(req, res) {
        try {
            if (!req.user) {
                return res.status(401).send({ message: "Por favor, inicia sesión para acceder a los pedidos" });
            }

            const user = req.user;

            const userOrders = await Order.findAll({
                where: { userId: user.id },
                include: [
                    {
                        model: Product,
                        attributes: ["id", "name", "price"],
                    },
                ],
            });

            const userData = {
                id: user.id,
                name: user.name,
                orders: userOrders.map((order) => ({
                    id: order.id,
                    products: order.Products.map((product) => ({ productId: product.id, productName: product.name, productPrice: product.price })),
                })),
            };

            res.status(200).send(userData);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Hubo un error al obtener los pedidos del usuario" });
        }
    },
    async delete(req, res) {
        try {
            await User.destroy({ where: { mail: req.params.mail } });
            res.send({ message: "El usuario fue eliminado" });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error al eliminar el usuario" });
        }
    },
};

module.exports = UserController;
