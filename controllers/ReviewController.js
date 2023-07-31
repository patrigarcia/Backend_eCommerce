const { Review } = require("../models");

const ReviewController = {
    // Crear una nueva reseña
    async createReview(req, res) {
        try {
            const { id_product, id_user, qualification, comment } = req.body;
            const newReview = await Review.create({
                id_product,
                id_user,
                qualification,
                comment,
            });

            return res.status(201).json({ message: "Review creada exitosamente", data: newReview });
        } catch (error) {
            return res.status(500).json({ error: "Error al crear la review" });
        }
    },

    // Obtener todas las reseñas
    async getAllReviews(req, res) {
        try {
            const reviews = await Review.findAll();
            return res.status(200).json({ data: reviews });
        } catch (error) {
            return res.status(500).json({ error: "Error al traer las reviews" });
        }
    },

    // Obtener una reseña por su ID
    async getReviewById(req, res) {
        try {
            const { id } = req.params;
            const review = await Review.findByPk(id);

            if (!review) {
                return res.status(404).json({ error: "Review no encontrada" });
            }

            return res.status(200).json({ data: review });
        } catch (error) {
            return res.status(500).json({ error: "Error al traer la review" });
        }
    },

    // Actualizar una reseña por su ID
    async updateReview(req, res) {
        try {
            const { id } = req.params;
            const { id_product, id_user, qualification, comment } = req.body;

            const review = await Review.findByPk(id);

            if (!review) {
                return res.status(404).json({ error: "Review no encontrada" });
            }

            // Actualizar los atributos de la reseña con los valores proporcionados
            review.id_product = id_product;
            review.id_user = id_user;
            review.qualification = qualification;
            review.comment = comment;

            await review.save();

            return res.status(200).json({ message: "Review actualizada correctamente", data: review });
        } catch (error) {
            return res.status(500).json({ error: "Error al actualizar la review" });
        }
    },

    // Eliminar una reseña por su ID
    async deleteReview(req, res) {
        try {
            const { id } = req.params;

            const review = await Review.findByPk(id);

            if (!review) {
                return res.status(404).json({ error: "Review no encontrada" });
            }

            await review.destroy();

            return res.status(200).json({ message: "La review ha sido eliminada" });
        } catch (error) {
            return res.status(500).json({ error: "Error al eliminar la review" });
        }
    },
};

module.exports = ReviewController;
