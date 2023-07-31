const { Adress } = require("../models");

const AdressController = {
    // Crear una nueva dirección
    async createAdress(req, res) {
        try {
            const { idUser, street, number, zipcode, city, other } = req.body;
            const newAdress = await Adress.create({
                idUser,
                street,
                number,
                zipcode,
                city,
                other,
            });

            return res.status(201).json({ message: "Dirección creada con exito!", data: newAdress });
        } catch (error) {
            return res.status(500).json({ error: "Error al crear la dirección" });
        }
    },

    // Obtener todas las direcciones
    async getAllAdresses(req, res) {
        try {
            const adresses = await Adress.findAll();
            return res.status(200).json({ data: adresses });
        } catch (error) {
            return res.status(500).json({ error: "Error al traer la dirección" });
        }
    },

    // Obtener una dirección por su ID
    async getAdressById(req, res) {
        try {
            const { id } = req.params;
            const adress = await Adress.findByPk(id);

            if (!adress) {
                return res.status(404).json({ error: "No se encontró la dirección" });
            }

            return res.status(200).json({ data: adress });
        } catch (error) {
            return res.status(500).json({ error: "Error al traer la dirección" });
        }
    },

    // Actualizar una dirección por su ID
    async updateAdress(req, res) {
        try {
            const { id } = req.params;
            const { idUser, street, number, zipcode, city, other } = req.body;

            const adress = await Adress.findByPk(id);

            if (!adress) {
                return res.status(404).json({ error: "Dirección no encontrada" });
            }

            // Actualizar los atributos de la dirección con los valores proporcionados
            adress.idUser = idUser;
            adress.street = street;
            adress.number = number;
            adress.zipcode = zipcode;
            adress.city = city;
            adress.other = other;

            await adress.save();

            return res.status(200).json({ message: "La dirección se actualizó correctamente", data: adress });
        } catch (error) {
            return res.status(500).json({ error: "Error al actualizar la dirección" });
        }
    },

    // Eliminar una dirección por su ID
    async deleteAdress(req, res) {
        try {
            const { id } = req.params;

            const adress = await Adress.findByPk(id);

            if (!adress) {
                return res.status(404).json({ error: "La dirección no fue encontrada" });
            }

            await adress.destroy();

            return res.status(200).json({ message: "La dirección ha sido eliminada" });
        } catch (error) {
            return res.status(500).json({ error: "Error al eliminar la dirección" });
        }
    },
};

module.exports = AdressController;
