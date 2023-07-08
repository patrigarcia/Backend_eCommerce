const { Product, Category } = require("../models/index.js");

const ProductController = {
    async create(req, res) {
        try {
            const product = await Product.create(req.body);
            res.status(201).send({ message: "Producto creado con éxito", product });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error al crear el producto" });
        }
    },
    async update(req, res) {
        try {
            await Product.update(req.body, { where: { name: req.params.name } });
            res.send({ message: "El producto se ha actualizado" });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error al actualizar el producto" });
        }
    },

    async getProductById(req, res) {
        const productId = req.params.id;
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).send({ message: "No se encontró ningún producto con el ID proporcionado" });
            }
            res.status(200).send(product);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error al obtener el producto por ID" });
        }
    },

    async delete(req, res) {
        try {
            await Product.destroy({ where: { name: req.params.name } });
            res.send({ message: "El producto fue eliminado" });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error al eliminar el producto" });
        }
    },

    async getAllProductsWithCategories(req, res) {
        try {
            const products = await Product.findAll({ include: Category });
            res.status(200).json(products);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Hubo un error al devolver los productos con sus categorías" });
        }
    },

    async getProductsByCategory(req, res) {
        const { categoryName } = req.params;

        try {
            const category = await Category.findOne({ where: { name: categoryName } });

            if (!category) {
                return res.status(404).send({ message: "La categoría no existe" });
            }

            const products = await Product.findAll({ where: { categoryId: category.id } });

            res.status(200).send(products);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Ha habido un error al obtener los productos por categoría" });
        }
    },

    async getProductsByName(req, res) {
        const { productName } = req.params;

        try {
            const products = await Product.findAll({ where: { name: productName } });

            if (products.length === 0) {
                return res.status(404).send({ message: "No hay productos con ese nombre" });
            }

            res.status(200).send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hubo un error al obtener los productos por su nombre" });
        }
    },

    async getProductsByPrice(req, res) {
        const { price } = req.params;

        try {
            const products = await Product.findAll({ where: { price: price } });

            if (products.length === 0) {
                return res.status(404).send({ message: "No hay productos con ese precio" });
            }

            res.status(200).send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Salio un error al obtener los productos por precio" });
        }
    },

    async getProductsByPriceSorted(req, res) {
        try {
            const products = await Product.findAll();

            //los ordeno de mayor a menor
            const sortedPrices = products.sort((a, b) => b.price - a.price);

            res.status(200).send({ message: "Los precios de los productos fueron ordenados exitosamente", prices: sortedPrices });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Hubo un error al ordenar los precios" });
        }
    },
};

module.exports = ProductController;
