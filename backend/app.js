const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const express = require("express");

const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const port = 3078;
const routes = require("./routes/routes");

app.use(cors());
app.use(express.json());
app.use("./sounds", express.static(path.join(__dirname, "sounds")));
app.use("/api", routes);

mongoose
  .connect(
    `mongodb+srv://${process.env.PSEUDO}:${process.env.PASSWORD}@cluster0.cyx9yex.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("Connexion MongoDb OK"))
  .catch(console.log("Connexion MongoDb Ratée"));

app.listen(3078, () => console.log(`App is running on port ${port}`));
