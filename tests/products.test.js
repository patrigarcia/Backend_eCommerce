const request = require("supertest");
const app = require("../index.js");

const { Product } = require("../models/index.js");

const SERVER_OK = 200;
const CREATED = 201;

describe("ProductController", () => {
    let token;

    // creo un usuario, hago login y obtengo el token
    beforeAll(async () => {
        const user = {
            name: "Zeus",
            surname: "Perezoso",
            description: "cliente 1",
            mail: "zeusgato@gmail.com",
            address: "Calle 11",
            tel: 1234567880,
            role: "admin",
            password: "1233",
        };

        await request(app).post("/users").send(user).expect(201);
        const loginRes = await request(app).post("/users/login").send({ email: "zeusgato@gmail.com", password: "1233" }).expect(SERVER_OK);
        token = loginRes.body.token;
    });

    test("Count products on empty database", async () => {
        let productsCount = await Product.count();
        expect(productsCount).toBe(0);
    });

    test("Create a product", async () => {
        const product = {
            name: "Product 1",
            description: "This is a product",
            price: 7,
            stock: 10,
        };

        await request(app).post("/products").send(product).set({ Authorization: token }).expect(CREATED);
        const productsCount = await Product.count();
        expect(productsCount).toBe(1);
    });

    test("Update a product", async () => {
        const updatedProduct = {
            name: "Product 2",
            description: "This is an updated product",
            price: 19,
            stock: 5,
        };

        const res = await request(app).put("/products/Product 1").send(updatedProduct).set({ Authorization: token }).expect(SERVER_OK);
        expect(res.body.message).toBe("El producto se ha actualizado");
    });

    test("Get product by ID", async () => {
        const product = {
            name: "Product 1",
            description: "This is a product",
            price: 8,
            stock: 10,
        };
        const createRes = await request(app).post("/products").send(product).set({ Authorization: token }).expect(CREATED);
        const productId = createRes.body.product.id;
        const res = await request(app).get(`/products/id/${productId}`).set({ Authorization: token }).expect(SERVER_OK);
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe("Product 1");
    });

    test("Get products by name", async () => {
        const product = {
            name: "Product 1",
            description: "This is a product",
            price: 7.5,
            stock: 10,
        };
        await request(app).post("/products").send(product).set({ Authorization: token }).expect(CREATED);
        const res = await request(app).get(`/products/name/${product.name}`).set({ Authorization: token }).expect(SERVER_OK);

        expect(res.body).toBeDefined();
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].name).toBe("Product 1");
    });

    test("Get products by price", async () => {
        const product = {
            name: "Product 4",
            description: "This is a product with price",
            price: 9.5,
            stock: 17,
        };

        await request(app).post("/products").send(product).set({ Authorization: token }).expect(CREATED);
        const res = await request(app).get(`/products/price/${product.price}`).set({ Authorization: token }).expect(SERVER_OK);

        expect(res.body).toBeDefined();
        expect(res.body[0].price).toBe("9.50");
    });

    const { arraySortedBy } = require("jest-extended");

    test("Get products by sorted price", async () => {
        // Crear productos con diferentes precios
        const products = [
            {
                name: "Product 1",
                description: "This is a product",
                price: 7.5,
                stock: 10,
            },
            {
                name: "Product 2",
                description: "This is another product",
                price: 10,
                stock: 5,
            },
            {
                name: "Product 3",
                description: "Yet another product",
                price: 5.99,
                stock: 15,
            },
        ];

        // Crear los productos
        for (const product of products) {
            await request(app).post("/products").send(product).set({ Authorization: token }).expect(CREATED);
        }

        // Obtener los productos ordenados por precio
        const res = await request(app).get("/products/sortedPrices").set({ Authorization: token }).expect(SERVER_OK);

        expect(res.body).toBeDefined();
        const sortedPrices = res.body.prices.map((product) => product.price);
        expect(sortedPrices).toEqual(sortedPrices.sort((a, b) => b - a));
    });

    

    afterAll(() => {
        return Product.destroy({ where: {}, truncate: true });
    });
});
