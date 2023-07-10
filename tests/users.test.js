const request = require("supertest");
const app = require("../index.js");

const { User } = require("../models/index.js");

let token;

describe("API test for users", () => {
    test("Count user on empty database", async () => {
        let usersCount = await User.count();
        expect(usersCount).toBe(0);
    });

    test("Create a user", async () => {
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
        usersCount = await User.count();
        expect(usersCount).toBe(1);
    });

    test("Login user", async () => {
        const res = await request(app).post("/users/login").send({ email: "zeusgato@gmail.com", password: "1233" }).expect(200);
        token = res.body.token;
    });

    test("Get users", async () => {
        console.log(token);
        const res = await request(app).get("/users").set({ Authorization: token }).expect(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    test("Update user", async () => {
        const updateUser = { name: "Updated name" };
        const res = await request(app).put("/users/Zeus").send(updateUser).set({ Authorization: token }).expect(200);
        expect(res.body.message).toBe("El usuario se ha actualizado");
    });

    test("Logout a user record", async () => {
        const res = await request(app).delete("/users/logout").set({ Authorization: token }).expect(200);
        expect(res.body.message).toBe("Desconectado con éxito");
    });

    afterAll(() => {
        return User.destroy({ where: {}, truncate: true });
    });
});
