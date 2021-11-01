// get the instance of sequelize
const {
  connection,
  Restaurant,
  Menu,
  MenuItem,
} = require("./sequelize-connect");
const express = require("express");
const app = express();
const port = 3002;
// support req.body parsing
app.use(express.json());

app.post("/api/restaurants", async (req, res) => {
  try {
    // create a row in the database using sequelize create method
    const restaurant = await Restaurant.create(req.body);

    // 201 = created a resource
    res.status(201).send(restaurant);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.get("/api/restaurants", async (req, res) => {
  try {
    // create a row in the database using sequelize create method
    const restaurants = await Restaurant.findAll({});

    // 200 = success
    res.status(200).send(restaurants);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.delete("/api/restaurants/:id", async (req, res) => {

  const toDelete = await Restaurant.findByPk(req.params.id)
  await toDelete.destroy()
  res.status(201).send(toDelete)
});



// 2. create an endpoint that will update a restaurant by ID (HTTP Method = put)
app.update("/api/restaurants/:id", async (req, res) =>{
  const toUpdate = await Restaurant.findByPk(req.params.id)
  await toUpdate.update()
  res.status(202).send(toUpdate)
});
// 3. create a suite of menu and menu item routes that will CRUD each resource

// 4. find a way to relate the menu items to the menu and the menu to the restaurant

// 5. use Sequelize validation to validate the data being sent (you'll do this in the model)

/**
 * Synchronize all models with db
 */
async function start() {
  await connection.sync({
    logging: false, // don't log everything
    // force: true, // drop tables each time
  });
}

// run start and log any errors
start()
  .then(() => console.log("Sequelize connected"))
  .catch((e) => console.log(`Caught error: ${e}`));

app.listen(port, () => console.log(`Express server running on port ${port}`));
