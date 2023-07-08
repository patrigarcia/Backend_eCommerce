const express = require("express");
const app = express();
const PORT = 3000;

//middleware
app.use(express.json());

//rutas prefijo
// app.use("/users", require("./routes/users"));

// app.use("/orders", require("./routes/orders"));

// app.use("/categories", require("./routes/categories"));

// app.use("/products", require("./routes/products"));

app.listen(PORT, () => console.log(`Servidor levantado con éxito en el puerto ${PORT}`));
