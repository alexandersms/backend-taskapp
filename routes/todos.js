const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todoController");

// Récupération de tous les items
router.get("/", TodoController.getAllItems);

//Créer un item
router.post("/", TodoController.addItem);

router.patch("/:id", TodoController.updateAItem);

router.delete("/:id", TodoController.deleteAItem);

module.exports = router;
