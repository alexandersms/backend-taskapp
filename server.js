const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db =
  "mongodb+srv://alex-sms:170608@to-do-cluster-n266o.mongodb.net/to-do?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Successfully connected to database`.cyan.bold))
  .catch(() =>
    console.log(`Erreur de connexion à la base de données`.red.bold)
  );

const router = require("./routes/todos");

app.use("/api/v1/todo", router);

app.use((req, res, next) => {
  next(createError(404, "Non trouvée"));
});

app.listen(4000, () =>
  console.log(`Server is up runing on port 4000`.green.bold)
);
