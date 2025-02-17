import { Router } from "express";

import {
  putNote,
  getNotes,
  postNote,
  deleteNote,
  patchNotePin,
  patchNoteArchive,
  getArchivedNotes,
} from "../controllers/notesController.js";

const notesRouter = Router();

notesRouter.get("/", getNotes);

notesRouter.get("/archive", getArchivedNotes);

notesRouter.post("/", postNote);

notesRouter.put("/:id", putNote);

notesRouter.delete("/:id", deleteNote);

notesRouter.patch("/:id/pin", patchNotePin);

notesRouter.patch("/:id/archive", patchNoteArchive);

export default notesRouter;
