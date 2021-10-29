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

// 1. create an endpoint that will delete a restaurant by ID (HTTP Method = delete)

// 2. create an endpoint that will update a restaurant by ID (HTTP Method = put)

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
/**
 * Runs all the functions
 */
async function main() {
  try {
    await start();
    const objects = await createRows();
    await runQueries(objects);
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * Synchronize all models with db
 */
async function start() {
  await connection.sync({
    logging: false, // don't log everything
    force: true, // drop tables each time
  });
}
/**
 * Creates the rows in the db
 * @returns array of objects
 */
async function createRows() {
  // create the objects (and rows!)

  const pizzaRestaurant = await Restaurant.create({
    name: "Pizza Hut",
    imagelink: "http://domain.myimagelink.jpg",
  });

  const theGreatCow = await Restaurant.create({
    name: "The Great Cow",
    imagelink:
      "https://i2-prod.derbytelegraph.co.uk/incoming/article5869593.ece/ALTERNATES/s615/0_TB_BM_300518cow101.jpg",
  });

  const pizzaRestaurantMenu = await Menu.create({
    title: "Pizza menu",
  });
  const pizzaRestaurantDrinksMenu = await Menu.create({
    title: "Drinks menu",
  });
  console.log(pizzaRestaurantDrinksMenu.toJSON());
  const greatCowMenu = await Menu.create({
    title: "The Great Cow's Menu",
  });

  const pizzaRestaurantMenuItem = await MenuItem.create({
    name: "Pizza",
    price: 6.99,
  });

  const greatCowMenuItems = await MenuItem.create({
    name: "Roast Beef",
    price: 13.99,
  });
  // add the associations (foreign keys) (these are sequelize specific functions)
  await pizzaRestaurant.addMenu(pizzaRestaurantMenu);
  await pizzaRestaurant.addMenu(pizzaRestaurantDrinksMenu);
  //await pizzaRestaurant.addMenu(testTheo);
  await pizzaRestaurantMenu.addMenuItem(pizzaRestaurantMenuItem);
  await theGreatCow.addMenu(greatCowMenu);
  await greatCowMenu.addMenuItems(greatCowMenuItems);

  return [
    pizzaRestaurant,
    theGreatCow,
    pizzaRestaurantMenu,
    greatCowMenu,
    pizzaRestaurantMenuItem,
    greatCowMenuItems,
    pizzaRestaurantDrinksMenu,
  ];
}

async function runQueries(objects) {
  [
    pizzaRestaurant,
    theGreatCow,
    pizzaRestaurantMenu,
    greatCowMenu,
    pizzaRestaurantMenuItem,
    greatCowMenuItems,
    pizzaRestaurantDrinksMenu,
  ] = objects; // objects[0], objects[1], objects[2]
  //console.log(objects);

  const restaurants = await Restaurant.findAll({}); // get all restaurants

  // get Menus that belong to a restaurant
  const menus = await pizzaRestaurant.getMenus();

  // Updates menu name
  await pizzaRestaurantDrinksMenu.update({
    title: "Evening Menu",
  });

  console.log(Object.keys(pizzaRestaurantDrinksMenu.rawAttributes));

  console.log(Object.values(pizzaRestaurantDrinksMenu.rawAttributes));

  //console.log(Pizza.title);

  // delete Menus that belong to a restaurant
  await pizzaRestaurantMenuItem.destroy(); // removes entry from the database

  // --> get menu items that belong to a menu here
  // const menuItem = await pizzaRestaurantMenu.getMenuItems();

 
  //   console.log(`**** Found all restos: ${JSON.stringify(restaurants)}`);
  //   console.log(`**** Found all menus: ${JSON.stringify(menus)}`);
  //console.log(`**** Found all menu items: ${JSON.stringify(menuItem)}`);

  console.log(pizzaRestaurantDrinksMenu.toJSON());
}

// run main and log any errors
main().catch((e) => console.log(`Caught error: ${e}`));
