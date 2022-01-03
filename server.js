const express = require("express");
const { postgrator } = require("./lib/db");
const app = express();
const cors = require("cors");
const port = '3006';
require("dotenv").config();
const petsRoute = require('./routes/pets');
const usersRoute = require('./routes/users');

app.use(express.json());
app.use(cors());

app.use("/pets", petsRoute);
app.use("/users", usersRoute);

postgrator
  .migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  })
  .catch((error) => console.error(error));
