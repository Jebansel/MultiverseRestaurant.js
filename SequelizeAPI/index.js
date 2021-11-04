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

// Restaurant CRUD:

app
  .post("/api/restaurants", async (req, res) => {
    try {
      // create a row in the database using sequelize create method
      const restaurant = await Restaurant.create(req.body);

      // 201 = created a resource
      res.status(201).send(restaurant);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .get("/api/restaurants", async (req, res) => {
    try {
      // create a row in the database using sequelize create method
      const restaurants = await Restaurant.findAll({});

      // 200 = success
      res.status(200).send(restaurants);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .get("/api/restaurants/:id", async (req, res) => {
    try {
      // returning one restaurant 
      const restaurant = await Restaurant.findByPk(req.params.id);

      // 200 = success
      res.status(200).send(restaurant);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .delete("/api/restaurants/:id", async (req, res) => {
    const toDelete = await Restaurant.findByPk(req.params.id);
    await toDelete.destroy();
    res.status(201).send(toDelete);
  })
  
  // 2. create an endpoint that will update a restaurant by ID (HTTP Method = put)
  .put("/api/restaurants/:id", async (req, res) => {
    const toUpdate = await Restaurant.findByPk(req.params.id);
    await toUpdate.update(req.body);
    res.status(202).send(toUpdate);
  })
  .post("/api/restaurants", async (req, res) => {
    try {
      // create a row in the database using sequelize create method
      const restaurant = await Restaurant.create(req.body);

      // 201 = created a resource
      res.status(201).send(restaurant);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

// Menu CRUD:

app
  .post("/api/menu", async (req, res) => {
    try {
      // create a row in the database using sequelize create method
      const menu = await Menu.create(req.body);

      // 201 = created a resource
      res.status(201).send(menu);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .get("/api/menu", async (req, res) => {
    try {
      // create a row in the database using sequelize create method
      const menu = await Menu.findAll({});

      // 200 = success
      res.status(200).send(menu);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  // .get("/api/menu/:id", async (req, res) => {
  //   try {
  //     // returning one restaurant 
  //     const menu = await Menu.findByPk(req.params.id);

  //     // 200 = success
  //     res.status(200).send(menu);
  //   } catch (e) {
  //     res.status(400).send(e.message);
  //   }
  // })
  .delete("/api/menu/:id", async (req, res) => {
    const toDelete = await Menu.findByPk(req.params.id);
    await toDelete.destroy();
    res.status(201).send(toDelete);
  })
  .put("/api/menu/:id", async (req, res) => {
    const toUpdate = await Menu.findByPk(req.params.id);
    await toUpdate.update(req.body);
    res.status(202).send(toUpdate);
  })
  .post("/api/menu", async (req, res) => {
    try {
      // create a row in the database using sequelize create method
      const menu = await Menu.create(req.body);

      // 201 = created a resource
      res.status(201).send(menu);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

// Menu Items CRUD:

app
  .post("/api/menuItems", async (req, res) => {
    try {
      // create a row in the database using sequelize create method
      const menuItems = await MenuItem.create(req.body);

      // 201 = created a resource
      res.status(201).send(menuItems);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .get("/api/menuItems", async (req, res) => {
    try {
      // create a row in the database using sequelize create method
      const menuItems = await MenuItem.findAll({});

      // 200 = success
      res.status(200).send(menuItems);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .delete("/api/menuItems/:id", async (req, res) => {
    const toDelete = await MenuItem.findByPk(req.params.id);
    await toDelete.destroy();
    res.status(201).send(toDelete);
  })
  // 2. create an endpoint that will update a restaurant by ID (HTTP Method = put)
  .put("/api/menuItems/:id", async (req, res) => {
    const toUpdate = await MenuItem.findByPk(req.params.id);
    await toUpdate.update(req.body);
    res.status(202).send(toUpdate);
  })
  .post("/api/menuItems", async (req, res) => {
    try {
      // create a row in the database using sequelize create method
      const menuItems = await MenuItem.create(req.body);

      // 201 = created a resource
      res.status(201).send(menuItems);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

// 4. find a way to relate the menu items to the menu and the menu to the restaurant
//every time i submit a menu, I will know it belongs to a restaurant
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
