const DiaryEntry = require("../models/DiaryEntry");

async function createEntry(title, description, date, location, photos, userId) {
  try {
    const newEntry = new DiaryEntry({
      title,
      description,
      date,
      location,
      photos,
      user: userId,
    });
    await newEntry.save();
    return newEntry;
  } catch (error) {
    throw error;
  }
}

async function getEntriesByUser(userId) {
  try {
    const entries = await DiaryEntry.find({ user: userId });
    return entries;
  } catch (error) {
    throw error;
  }
}

async function updateEntryById(entryId, updateData) {
  try {
    const updatedEntry = await DiaryEntry.findByIdAndUpdate(
      entryId,
      updateData,
      { new: true }
    );
    return updatedEntry;
  } catch (error) {
    throw error;
  }
}

async function deleteEntryById(entryId) {
  try {
    const deletedEntry = await DiaryEntry.findByIdAndDelete(entryId);
    return deletedEntry;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createEntry,
  getEntriesByUser,
  updateEntryById,
  deleteEntryById,
};
