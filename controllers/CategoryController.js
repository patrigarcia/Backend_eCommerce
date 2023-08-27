const { Category, Product } = require("../models/index.js");

const CategoryController = {
    async create(req, res) {
        try {
            const category = await Category.create(req.body);
            res.status(201).send({ message: "Categoría creada con éxito", category });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error al crear la categoría" });
        }
    },

    async update(req, res) {
        await Category.update(req.body, { where: { name: req.params.name } });
        res.send({ message: "La categoría se ha actualizado con éxito" });
    },

    async getAll(req, res) {
        try {
            const categories = await Category.findAll();
            res.status(200).send(categories);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Ha habido un error al devolver todas las categorías" });
        }
    },

    async getAllAndProducts(req, res) {
        try {
            const categories = await Category.findAll({ include: Product });
            res.status(200).send(categories);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Ha habido un error al devolver todas las categorías junto a sus productos" });
        }
    },

    async getCategoryById(req, res) {
        const { id } = req.params;

        try {
            const categories = await Category.findAll({
                where: { id: id },
                include: {
                    model: Product,
                },
            });

            res.status(200).send(categories);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hubo un error al obtener las categorías por su nombre" });
        }
    },

    async delete(req, res) {
        const entityDeleted = await Category.destroy({ where: { name: req.params.name } });
        if (entityDeleted == 0) {
            return res.status(404).send({ message: "No existe una categoría con ese nombre" });
        }
        res.send({ message: "La categoría se ha eliminado con éxito" });
    },
};

module.exports = CategoryController;
