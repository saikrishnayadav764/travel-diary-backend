const express = require("express");
const router = express.Router();
const {
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
  getEntryById,
} = require("../controllers/diaryController");
const authenticate = require("../config/middleware");

// POST /api/diary
router.post("/", authenticate, createEntry);

// GET /api/diary
router.get("/", authenticate, getEntries);

// GET /api/diary/:id
router.get("/:id", authenticate, getEntryById);

// PUT /api/diary/:id
router.put("/:id", authenticate, updateEntry);

// DELETE /api/diary/:id
router.delete("/:id", authenticate, deleteEntry);

module.exports = router;
