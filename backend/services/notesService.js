import { connectDB } from "../db.js";

export const fetchNotes = async (
  search = "",
  category,
  page = 1,
  limit = 10
) => {
  const db = await connectDB();
  const offset = (page - 1) * limit;

  if (category === "ALL") category = "";

  const query = `
    SELECT id, title, content, category, color, created_at, pinned, archived 
    FROM notes 
    WHERE title LIKE ?
    AND archived = 0
    ${category ? "AND category = ?" : ""}
    ORDER BY pinned DESC, created_at DESC
    LIMIT ? OFFSET ?`;

  const countQuery = `
    SELECT COUNT(*) as total
    FROM notes
    WHERE title LIKE ?
    AND archived = 0
    ${category ? "AND category = ?" : ""}`;

  const params = [
    `%${search}%`,
    ...(category ? [category] : []),
    limit,
    offset,
  ];

  const countParams = [`%${search}%`, ...(category ? [category] : [])];

  const notes = await db.all(query, params);
  const { total } = await db.get(countQuery, countParams);

  return { notes, total };
};

export const fetchArchivedNotes = async (page = 1, limit = 10) => {
  const db = await connectDB();
  const offset = (page - 1) * limit;

  const query = `
    SELECT 
      id, 
      title, 
      color, 
      content, 
      archived, 
      category, 
      created_at 
    FROM 
      notes 
    WHERE
      archived = 1
    ORDER BY 
      pinned DESC, 
      created_at DESC
    LIMIT ? OFFSET ?`;

  const countQuery = `
    SELECT 
      COUNT(*) as total
    FROM 
      notes
    WHERE
      archived = 1`;

  const { total } = await db.get(countQuery);
  const notes = await db.all(query, [limit, offset]);

  return { notes, total };
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
    `UPDATE notes SET title = ?, content = ?,color = ?, category = ?, updated_at = datetime('now') 
     WHERE id = ?`,
    [noteData.title, noteData.content, noteData.color, noteData.category, id]
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
