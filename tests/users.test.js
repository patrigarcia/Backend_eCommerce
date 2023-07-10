const request = require("supertest");
const app = require("../index.js");

const { User } = require("../models/index.js");

const SERVER_OK = 200;
const CREATED = 201;

let token;

describe("API test for users", () => {
    beforeAll(() => {
        return User.destroy({ where: {}, truncate: true });
    });

    test("Create a user", async () => {
        const user = {
            name: "Zeus",
            surname: "Perezoso",
            description: "cliente 1",
            mail: "zeus@gmail.com",
            address: "Calle 11",
            tel: 1234567880,
            role: "admin",
            password: "1233",
        };

        await request(app).post("/users").send(user).expect(CREATED);
        usersCount = await User.count();
        expect(usersCount).toBe(1);
    });

    test("Login user", async () => {
        const res = await request(app).post("/users/login").send({ email: "zeus@gmail.com", password: "1233" }).expect(SERVER_OK);
        token = res.body.token;
    });

    test("Get users", async () => {
        const res = await request(app).get("/users").set({ Authorization: token }).expect(SERVER_OK);
        expect(res.body).toBeInstanceOf(Array);
    });

    test("Update user", async () => {
        const updateUser = { name: "Updated name" };
        const res = await request(app).put("/users/Zeus").send(updateUser).set({ Authorization: token }).expect(SERVER_OK);
        expect(res.body.message).toBe("El usuario se ha actualizado");
    });

    test("Logout a user record", async () => {
        const res = await request(app).delete("/users/logout").set({ Authorization: token }).expect(SERVER_OK);
        expect(res.body.message).toBe("Desconectado con éxito");
    });

    afterAll(() => {
        return User.destroy({ where: {}, truncate: true });
    });
});
