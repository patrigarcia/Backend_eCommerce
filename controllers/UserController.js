const { User } = require("../models/index.js");

const UserController = {
    async create(req, res) {
        try {
            req.body.role = "user";
            const user = await User.create(req.body);
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
};

module.exports = UserController;
