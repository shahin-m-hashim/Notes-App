import {
  pinNote,
  fetchNotes,
  createNote,
  updateNote,
  removeNote,
  archiveNote,
  fetchArchivedNotes,
} from "../services/notesService.js";

import { noteSchema, noteQuerySchema } from "../schemas/note.js";

export const getNotes = async (req, res) => {
  try {
    const { search, category, page, limit } = noteQuerySchema.parse(req.query);

    const { notes, total } = await fetchNotes(search, category, page, limit);

    return res.status(200).json({
      data: {
        notes,
        total,
      },
      error: null,
      success: true,
    });
  } catch (e) {
    console.log(e.message);

    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};

export const getArchivedNotes = async (req, res) => {
  try {
    const { page, limit } = noteQuerySchema.parse(req.query);

    const { notes, total } = await fetchArchivedNotes(page, limit);

    return res.status(200).json({
      data: {
        notes,
        total,
      },
      error: null,
      success: true,
    });
  } catch (e) {
    console.log(e.message);

    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};

export const postNote = async (req, res) => {
  try {
    const noteData = noteSchema.parse(req.body);

    await createNote(noteData, req.user.id);

    return res.status(201).json({
      data: null,
      error: null,
      success: true,
    });
  } catch (e) {
    console.log(e.message);

    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};

export const putNote = async (req, res) => {
  try {
    const noteData = noteSchema.parse(req.body);
    await updateNote(req.params.id, noteData);

    return res.status(200).json({
      data: null,
      error: null,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await removeNote(req.params.id);
    return res.status(200).json({
      data: null,
      error: null,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};

export const patchNotePin = async (req, res) => {
  try {
    await pinNote(req.params.id);

    return res.status(200).json({
      data: null,
      error: null,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};

export const patchNoteArchive = async (req, res) => {
  try {
    await archiveNote(req.params.id);

    return res.status(200).json({
      data: null,
      error: null,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};
