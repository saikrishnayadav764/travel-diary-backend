const DiaryEntry = require("../models/DiaryEntry");

async function createEntry(req, res) {
  try {
    const { title, description, date, location, photos } = req.body;

    const newEntry = new DiaryEntry({
      title,
      description,
      date,
      location,
      photos,
      user: req.user.id,
    });

    await newEntry.save();

    res.json(newEntry);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

async function getEntries(req, res) {
  try {
    const entries = await DiaryEntry.find({ user: req.user.id });
    res.json(entries);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

async function getEntryById(req, res) {
  try {
    const entryId = req.params.id;
    const entry = await DiaryEntry.findById(entryId);
    if (!entry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    // Checking if the entry belongs to the specific user
    if (entry.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    res.json(entry);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

async function updateEntry(req, res) {
  try {
    const entryId = req.params.id;
    const { title, description, date, location, photos } = req.body;

    const entry = await DiaryEntry.findById(entryId);

    if (!entry) {
      return res.status(404).json({ message: "No Such Diary entry exists" });
    }

    // Checking if the entry belongs to the specific user
    if (entry.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "No Such Diary entry exists" });
    }

    const updatedEntry = await DiaryEntry.findByIdAndUpdate(
      entryId,
      { title, description, date, location, photos },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: "No Such Diary entry exists" });
    }

    res.json(updatedEntry);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

async function deleteEntry(req, res) {
  try {
    const entryId = req.params.id;
    const entry = await DiaryEntry.findById(entryId);

    if (!entry) {
      return res.status(404).json({ message: "No Such Diary entry exists" });
    }

    // Checking if the entry belongs to the specific user
    if (entry.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "No Such Diary entry exists" });
    }

    const deletedEntry = await DiaryEntry.findByIdAndDelete(entryId);

    if (!deletedEntry) {
      return res.status(404).json({ message: "No Such Diary entry exists" });
    }

    res.json({ message: "Diary entry deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
  getEntryById,
};
