const express = require("express");
const Router = express.Router();
const fetch = require("node-fetch");
const url = "http://localhost:3002/api/restaurants"; // http://localhost:3002/api/restaurants

Router.post("/", async (req, res, next) => {
  // adds a new restaurant
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

Router
  // READ
  .get("/", async (req, res, next) => {
    // gets all restaurants
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


  Router.get("/delete", async (req, res, next) => {
    try {
      res.render("deleteRestaurant");
    } catch (error) {
      return next(error);
    }
  })  
  
  
  .delete("/:id", async (req, res, next) => { // Deletes a restaurant based on its id

  });

module.exports = Router;
