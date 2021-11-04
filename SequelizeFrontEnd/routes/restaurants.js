const express = require("express");
const Router = express.Router();
const fetch = require("node-fetch");
const url = "http://localhost:3002/api/restaurants"; // http://localhost:3002/api/restaurants
  
// adds a new restaurant
Router.post("/", async (req, res, next) => {
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });
    res.redirect("/restaurants");
  } catch (error) {
    return next(error);
  }
})
  .get("/create", async (req, res, next) => {
    try {
      res.render("newRestaurant");
    } catch (error) {
      return next(error);
    }
  })
  .get("/", async (req, res, next) => {
    try {
      const response = await fetch(url);
      const restaurants = await response.json();
      res.render("restaurants", { restaurants });
    } catch (error) {
      return next(error);
    }
  });

// Adds a New Menu
  Router.post("/", async (req, res, next) => {
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "application/json" },
      });
      res.redirect("/restaurants");
    } catch (error) {
      return next(error);
    }
  })
    .get("/:id/add", async (req, res, next) => {
      try {
        res.render("newMenu");
      } catch (error) {
        return next(error);
      }
    })
    .get("/:id", async (req, res, next) => {
      try {
        const response = await fetch(url);
        const restaurants = await response.json();
        res.render("restaurants", { restaurants });
      } catch (error) {
        return next(error);
      }
    });
// gets all restaurants
Router
  .get("/", async (req, res, next) => {
    try {
      const response = await fetch(url);
      const restaurants = await response.json();
      res.render("restaurants", { restaurants });
    } catch (error) {
      return next(error);
    }
  })
  .get("/:id", async (req, res, next) => {
    // gets one restaurant based on its ID
    try {
      const response = await fetch(
        `http://localhost:3002/api/restaurants/${req.params.id}`
      );
      const restaurant = await response.json();
      res.render("restaurant", { restaurant });
    } catch (error) {
      return next(error);
    }
  });

// Updates Restaurant
Router.get('/:id/edit', (req, res) => { // render the update form

  res.render("updateRestaurant", {restaurantId: req.params.id});
});

// Gets Menu's relating to restaurant id
// gets one menu based on its foreign key relationship with the Restaurant

Router.get('/:id', async (req, res, next) => {
  try {
    const response = await fetch(
      `http://localhost:3002/api/restaurants/${req.params.id}`
    );
    const restaurant = await response.json();
    res.render("restaurant", { restaurant });
  } catch (error) {
    return next(error);
  }
});


module.exports = Router;
