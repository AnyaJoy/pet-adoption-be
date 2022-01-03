const express = require("express");
const { postgrator } = require("./lib/db");
const app = express();
const cors = require("cors");
const PORT = process.env.PORTNODE;
require("dotenv").config();
const petsRoute = require("./routes/pets");
const usersRoute = require("./routes/users");

app.use(express.json());
app.use(cors());

app.use("/pets", petsRoute);
app.use("/users", usersRoute);

app.get("/", (req, res) => {
  res.send('Hello to Pet-Adoption API')
});

postgrator
  .migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(PORT, () => {
      console.log(`Running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
