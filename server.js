const express = require("express");
const { postgrator } = require("./lib/db");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3006;
require("dotenv").config();
const petsRoute = require("./routes/pets");
const usersRoute = require("./routes/users");

app.use(express.json());
app.use(cors());

app.use("/pets", petsRoute);
app.use("/users", usersRoute);

app.get("/", (req, res) => {
  res.send("Pet-Adoption API live!");
});

if (process.env.MODE == "development") {
  postgrator
    .migrate()
    .then((result) => {
      console.log(`migrated db successfully:`, result);
      app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
      });
    })
    .catch((error) => console.error(error));
} else {
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
}
