const express = require("express");
const router = express.Router();
const Note = require("../models/note");
const auth = require("../middleware/authMiddleware");

// CREAR NOTA
router.post("/", auth, async (req, res) => {
  try {
    const note = new Note({
      userId: req.user.id,
      title: req.body.title,
      content: req.body.content
    });

    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

// OBTENER NOTAS
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });

    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;