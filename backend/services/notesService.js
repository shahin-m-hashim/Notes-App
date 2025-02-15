import { connectDB } from "../db.js";

export const fetchNotes = async (
  search = "",
  category,
  page = 1,
  limit = 10
) => {
  const db = await connectDB();
  const offset = (page - 1) * limit;

  const query = `
  SELECT id, title, content, category, created_at, pinned, archived 
  FROM notes 
  WHERE title LIKE ?
  ${category ? "AND category = ?" : ""}
  ORDER BY created_at DESC 
  LIMIT ? OFFSET ?`;

  const params = [
    `%${search}%`,
    ...(category ? [category] : []),
    limit,
    offset,
  ];
  const notes = await db.all(query, params);

  return notes;
};

export const createNote = async (noteData, userId) => {
  const db = await connectDB();

  await db.run(
    `INSERT INTO notes (title, content, category, color, pinned, archived, created_at, user_id) 
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'), ?)`,
    [
      noteData.title,
      noteData.content,
      noteData.category,
      noteData.color,
      noteData.pinned,
      noteData.archived,
      userId,
    ]
  );
};

export const updateNote = async (id, noteData) => {
  const db = await connectDB();

  await db.run(
    `UPDATE notes SET title = ?, content = ?, category = ?, updated_at = datetime('now') 
     WHERE id = ?`,
    [noteData.title, noteData.content, noteData.category, id]
  );
};

export const removeNote = async (id) => {
  const db = await connectDB();
  await db.run(`DELETE FROM notes WHERE id = ?`, [id]);
};

export const pinNote = async (id) => {
  const db = await connectDB();

  const note = await db.get(`SELECT pinned FROM notes WHERE id = ?`, [id]);
  const newPinnedStatus = note.pinned ? 0 : 1;

  await db.run(`UPDATE notes SET pinned = ? WHERE id = ?`, [
    newPinnedStatus,
    id,
  ]);

  await db.get(`SELECT * FROM notes WHERE id = ?`, [id]);
};

export const archiveNote = async (id) => {
  const db = await connectDB();

  const note = await db.get(`SELECT archived FROM notes WHERE id = ?`, [id]);
  const newArchivedStatus = note.archived ? 0 : 1;

  await db.run(`UPDATE notes SET archived = ? WHERE id = ?`, [
    newArchivedStatus,
    id,
  ]);
};
