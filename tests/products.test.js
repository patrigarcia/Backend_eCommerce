const request = require("supertest");
const app = require("../index"); // Reemplaza con la ruta correcta a tu archivo principal de la aplicación
const { Product, Category } = require("../models"); // Asegúrate de importar correctamente los modelos

// Antes de ejecutar los tests, puedes añadir datos de prueba a la base de datos si lo necesitas
beforeAll(async () => {
    await Category.bulkCreate([{ name: "Category 1" }, { name: "Category 2" }, { name: "Category 3" }]);

    await Product.bulkCreate([
        { name: "Product 1", price: 10, categoryId: 1 },
        { name: "Product 2", price: 20, categoryId: 2 },
        { name: "Product 3", price: 30, categoryId: 3 },
    ]);
});

// Después de ejecutar los tests, puedes limpiar los datos de prueba de la base de datos si lo necesitas
afterAll(async () => {
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });
});

// Test para crear un producto
test("Create product", async () => {
    const newProduct = {
        name: "New Product",
        price: 40,
        categoryId: 1,
    };

    const response = await request(app).post("/products").send(newProduct).expect(201);

    const createdProduct = response.body.product;
    expect(createdProduct.name).toBe(newProduct.name);
    expect(createdProduct.price).toBe(newProduct.price);
    expect(createdProduct.categoryId).toBe(newProduct.categoryId);
});

// Test para actualizar un producto
test("Update product", async () => {
    const updatedProduct = {
        name: "Updated Product",
        price: 50,
        categoryId: 2,
    };

    await request(app).put("/products/Product 1").send(updatedProduct).expect(200);

    const updatedProductData = await Product.findOne({ where: { name: "Updated Product" } });
    expect(updatedProductData.price).toBe(updatedProduct.price);
    expect(updatedProductData.categoryId).toBe(updatedProduct.categoryId);
});

// Test para obtener un producto por su ID
test("Get product by ID", async () => {
    const product = await Product.findOne({ where: { name: "Product 1" } });

    const response = await request(app).get(`/products/${product.id}`).expect(200);

    const retrievedProduct = response.body;
    expect(retrievedProduct.name).toBe(product.name);
    expect(retrievedProduct.price).toBe(product.price);
    expect(retrievedProduct.categoryId).toBe(product.categoryId);
});

// Test para eliminar un producto
test("Delete product", async () => {
    await request(app).delete("/products/Product 1").expect(200);

    const deletedProduct = await Product.findOne({ where: { name: "Product 1" } });
    expect(deletedProduct).toBeNull();
});

// Test para obtener todos los productos con sus categorías
test("Get all products with categories", async () => {
    const response = await request(app).get("/products").expect(200);

    const productsWithCategories = response.body;
    expect(productsWithCategories).toBeInstanceOf(Array);
    expect(productsWithCategories.length).toBeGreaterThan(0);
    // Puedes agregar más expectativas según los datos que esperas recibir
});

// Test para obtener productos por categoría
test("Get products by category", async () => {
    const response = await request(app).get("/products/category/Category 1").expect(200);

    const products = response.body;
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
    // Puedes agregar más expectativas según los datos que esperas recibir
});

// Test para obtener productos por nombre
test("Get products by name", async () => {
    const response = await request(app).get("/products/name/Product 1").expect(200);

    const products = response.body;
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
    // Puedes agregar más expectativas según los datos que esperas recibir
});

// Test para obtener productos por precio
test("Get products by price", async () => {
    const response = await request(app).get("/products/price/10").expect(200);

    const products = response.body;
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
    // Puedes agregar más expectativas según los datos que esperas recibir
});

// Test para obtener productos ordenados por precio
test("Get products sorted by price", async () => {
    const response = await request(app).get("/products/sortedByPrice").expect(200);

    const sortedPrices = response.body.prices;
    expect(sortedPrices).toBeInstanceOf(Array);
    expect(sortedPrices.length).toBeGreaterThan(0);
    // Puedes agregar más expectativas según los datos que esperas recibir
});
