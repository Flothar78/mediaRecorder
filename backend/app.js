const express = require("express");
//const multer = require("multer");
const app = express();
const mongoose = require("mongoose");
const port = 3078;
const routes = require("./routes/routes");

app.use(express.json());
app.use("/api", routes);

//app.use(express.static("media")); // for serving the HTML file
//
//let upload = multer({ dest: __dirname + "/public/uploads/" });
//let type = upload.single("upl");

mongoose
  .connect(
    "mongodb+srv://Flothar78:lLnmCEXUTr7mPXTw@cluster0.cyx9yex.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      createIndex: true,
    }
  )
  .then(console.log("Connexion MongoDb OK"))
  .catch(console.log("Connexion MongoDb Ratée"));

app.listen(3078, () => console.log(`App is running on port ${port}/api`));
