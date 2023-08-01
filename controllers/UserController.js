const { User, Token, Sequelize } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;

const UserController = {
    async create(req, res) {
        try {
            const password = bcrypt.hashSync(req.body.password, 10);
            const user = await User.create({ ...req.body, password: password });
            res.status(201).send({ message: "Usuario creado con éxito", user });
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
            const users = await User.findAll();
            res.status(200).send(users);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error al devolver todos los usuarios" });
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
};

module.exports = UserController;
