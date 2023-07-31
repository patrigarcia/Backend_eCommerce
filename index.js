const express = require("express");
const app = express();
const PORT = 9000;
//middleware
app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/orders", require("./routes/orders"));
app.use("/categories", require("./routes/categories"));
app.use("/products", require("./routes/products"));
app.use("/adresses", require("./routes/adresses"));

app.listen(PORT, () => console.log(`Servidor levantado con éxito en el puerto ${PORT}`));
module.exports = app;
