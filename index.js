const express = require("express");
const cors = require("cors");

const app = express();
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Origin not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/users", require("./routes/users"));
app.use("/orders", require("./routes/orders"));
app.use("/categories", require("./routes/categories"));
app.use("/products", require("./routes/products"));
app.use("/adresses", require("./routes/adresses"));
app.use("/reviews", require("./routes/reviews"));

module.exports = app;
