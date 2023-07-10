const request = require("supertest");
const app = require("../index.js");

const { Category } = require("../models/index.js");

const SERVER_OK = 200;
const CREATED = 201;

describe("CategoryController", () => {
    let token;

    // creo un usuario, hago login y obtengo el token
    beforeAll(async () => {
        const user = {
            name: "Zeus",
            surname: "Perezoso",
            description: "cliente 1",
            mail: "niñozeus@gmail.com",
            address: "Calle 11",
            tel: 1234567880,
            role: "admin",
            password: "1233",
        };

        await request(app).post("/users").send(user).expect(201);
        const loginRes = await request(app).post("/users/login").send({ email: "niñozeus@gmail.com", password: "1233" }).expect(SERVER_OK);
        token = loginRes.body.token;
    });

    test("Count categories on empty database", async () => {
        let categoriesCount = await Category.count();
        expect(categoriesCount).toBe(0);
    });

    test("Create a category", async () => {
        const category = {
            name: "Category 1",
        };

        await request(app).post("/categories").send(category).set({ Authorization: token }).expect(CREATED);
        const categoriesCount = await Category.count();
        expect(categoriesCount).toBe(1);
    });

    test("Update a category", async () => {
        const updatedCategory = {
            name: "Updated Category",
        };

        const res = await request(app).put("/categories/update/Category 1").send(updatedCategory).set({ Authorization: token }).expect(200);

        expect(res.body.message).toBe("La categoría se ha actualizado con éxito");
    });

    test("Get category by ID", async () => {
        const category = {
            name: "Category 1",
        };
        const createRes = await request(app).post("/categories").send(category).set({ Authorization: token }).expect(CREATED);
        const categoryId = createRes.body.category.id;
        const res = await request(app).get(`/categories/id/${categoryId}`).set({ Authorization: token }).expect(SERVER_OK);
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe("Category 1");
    });

    test("Get categories by name", async () => {
        const category = {
            name: "Category 2",
        };
        await request(app).post("/categories").send(category).set({ Authorization: token }).expect(CREATED);
        const res = await request(app).get(`/categories/name/${category.name}`).set({ Authorization: token }).expect(SERVER_OK);

        expect(res.body).toBeDefined();
        expect(res.body.length).toBeGreaterThan(0);// verifico que haya elementos en el body
        expect(res.body[0].name).toBe("Category 2");// verifico que el nombre sea igual
    });

    test("Delete category by name", async () => {
        const category = {
            name: "Category 4",
        };
        await request(app).post("/categories").send(category).set({ Authorization: token }).expect(CREATED);
        const res = await request(app).delete(`/categories/delete/${category.name}`).set({ Authorization: token }).expect(SERVER_OK);

        expect(res.body.message).toBe("La categoría se ha eliminado con éxito");
    });

    afterAll(() => {
        return Category.destroy({ where: {}, truncate: true });
    });
});
