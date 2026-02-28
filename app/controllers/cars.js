let CarModel = require('../models/cars');
const mongoose = require("mongoose");

module.exports.getCar = async function (req, res, next) {
  try {
    // Find one using the id sent in the parameter of the request
    let car = await CarModel.findById(req.params.id);

    if (!car) {
      throw new Error("Car not found.");
    }

    res.status(200);
    res.json({
      success: true,
      message: "Car retrieved successfully.",
      data: car
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.create = async function (req, res, next) {
  try {
    // Get input from the request
    let car = req.body;

    // Insert into the DB
    let result = await CarModel.create(car);
    console.log("Result: " + result);

    // Set the response status
    res.status(200);
    // Send a response
    res.json(
      {
        success: true,
        message: "Car created successfully.",
        data: result
      }
    );

  } catch (error) {
    console.log(error);
    next(error);
  }

}

module.exports.getAll = async function (req, res, next) {
  try {
    // Get all from the DB.
    let list = await CarModel.find({});

    // Set the response status
    res.status(200);
    // Send a response
    res.json({
        success: true,
        message: "Car list retrieved successfully.",
        data: list
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.update = async function (req, res, next) {
  try {
    // Update using id and request body
    let result = await CarModel.updateOne(
      { _id: req.params.id },   // filter
      req.body                 // updated data
    );

    console.log("Result: ", result);

    if (result.modifiedCount > 0) {
      res.status(200);
      res.json({
        success: true,
        message: "Car updated successfully."
      });
    } else {
      throw new Error("Car not updated. Are you sure it exists?");
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.remove = async function (req, res, next) {
  try {
    let result = await CarModel.deleteOne({ _id: req.params.id });

    console.log("Result: ", result);

    if (result.deletedCount > 0) {
      res.status(200);
      res.json({
        success: true,
        message: "Car deleted successfully."
      });
    } else {
      throw new Error("Car not deleted. Are you sure it exists?");
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}