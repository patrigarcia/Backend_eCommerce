const request = require("supertest");
const app = require("../index.js");

const { Order, User } = require("../models/index.js");

const SERVER_OK = 200;
const CREATED = 201;

describe("OrderController", () => {
    beforeAll(async () => {
        const user = {
            name: "Tina",
            surname: "Tinita",
            description: "cliente 1",
            mail: "tina@gmail.com",
            address: "Calle 11",
            tel: 1234567880,
            role: "admin",
            password: "1253",
        };

        await request(app).post("/users").send(user).expect(CREATED);
        const loginRes = await request(app).post("/users/login").send({ email: "tina@gmail.com", password: "1253" }).expect(SERVER_OK);
        token = loginRes.body.token;
    });

    test("Create a order's product", async () => {
        const product = {
            name: "Product 9",
            description: "This is a product",
            price: 3,
            stock: 100,
        };

        const createProductRes = await request(app).post("/products").send(product).set({ Authorization: token }).expect(CREATED);

        const order = {
            productIds: [createProductRes.body.product.id],
            status: "Pending",
        };

        // Hacer la solicitud de creación del pedido
        await request(app).post("/orders/productId").set({ Authorization: token }).send(order).expect(SERVER_OK);

        // Verificar que se haya creado el pedido
        const countRes = await request(app).get("/orders").set({ Authorization: token }).expect(SERVER_OK);
        expect(countRes.body).toBeDefined();
    });

    afterAll(() => {
        return Order.destroy({ where: {}, truncate: true });
    });
});
