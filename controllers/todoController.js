const createError = require("http-errors");
const TodoModels = require("../models/TodoModel");
const mongoose = require("mongoose");

module.exports = {
  getAllItems: async (req, res, next) => {
    try {
      const result = await TodoModels.find({}, { __v: 0 });
      res.status(200).json(result);
      console.log(`Liste des items`);
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  addItem: async (req, res, next) => {
    try {
      const todo = new TodoModels(req.body);
      const result = await todo.save();
      res.status(200).json(result);
      console.log(`todo successfully created`);
    } catch (err) {
      console.log(err.message);
      if (err.name === "ValidationError") {
        next(createError(422, err.message));
        return;
      }
      next(err);
    }
  },

  updateAItem: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };
      const result = await TodoModels.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "L'item n'existe pas");
      }
      res.status(200).json(result);
      console.log(`L'Item a été mise à jour avec succès`);
    } catch (err) {
      console.log(err.message);
      if (err instanceof mongoose.CastError) {
        return next(createError(400, "ID de l'item invalide"));
      }
      next(err);
    }
  },

  deleteAItem: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await TodoModels.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, "L'item n'existe pas");
      }
      res.status(200).json(result);
      console.log(`L'Item a été supprimé avec succès`);
    } catch (err) {
      console.log(err.message);
      if (err instanceof mongoose.CastError) {
        next(createError(400, "ID de l'item invalide"));
        return;
      }
      next(err);
    }
  },
};
