const dotenv = require("dotenv");
const app = require("./index");
const mongoose = require("mongoose");
dotenv.config();

const PORT = process.env.PORT || 8080;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () =>
            console.log(`Server is running on port ${PORT}`)
        );
    })
    .catch((err) => {
        console.log(`${err} did not connect`);
    });
