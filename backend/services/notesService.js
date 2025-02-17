import { connectDB } from "../db.js";

export const fetchNotes = async (
  userId = null,
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
    WHERE user_id = ?
    AND title LIKE ?
    AND archived = 0
    ${category ? "AND category = ?" : ""}
    ORDER BY pinned DESC, created_at DESC
    LIMIT ? OFFSET ?`;

  const countQuery = `
    SELECT 
      COUNT(*) as total
    FROM 
      notes
    WHERE 
      user_id = ?
    AND 
      title LIKE ?
    AND 
      archived = 0
    ${category ? "AND category = ?" : ""}`;

  const params = [
    userId,
    `%${search}%`,
    ...(category ? [category] : []),
    limit,
    offset,
  ];

  const countParams = [userId, `%${search}%`, ...(category ? [category] : [])];

  const notes = await db.all(query, params);
  const { total } = await db.get(countQuery, countParams);

  return { notes, total };
};

export const fetchArchivedNotes = async (
  userId = null,
  page = 1,
  limit = 10
) => {
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
      user_id = ?
    AND 
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
      user_id = ?
    AND 
      archived = 1`;

  const { total } = await db.get(countQuery, [userId]);
  const notes = await db.all(query, [userId, limit, offset]);

  return { notes, total };
};

export const createNote = async (userId, noteData) => {
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

export const updateNote = async (id, userId, noteData) => {
  const db = await connectDB();

  await db.run(
    `UPDATE 
      notes 
    SET 
      title = ?, 
      content = ?,
      color = ?, 
      category = ?, 
      updated_at = datetime('now') 
    WHERE 
      user_id = ? 
    AND 
      id = ?`,
    [
      noteData.title,
      noteData.content,
      noteData.color,
      noteData.category,
      userId,
      id,
    ]
  );
};

export const removeNote = async (id, userId) => {
  const db = await connectDB();
  await db.run(`DELETE FROM notes WHERE user_id = ? AND id = ?`, [userId, id]);
};

export const pinNote = async (id, userId, isPinned) => {
  const db = await connectDB();

  await db.run(`UPDATE notes SET pinned = ? WHERE user_id = ? AND id = ?`, [
    isPinned ? 0 : 1,
    userId,
    id,
  ]);
};

export const archiveNote = async (id, userId, isArchived) => {
  const db = await connectDB();

  await db.run(`UPDATE notes SET archived = ? WHERE user_id = ? AND id = ?`, [
    isArchived ? 0 : 1,
    userId,
    id,
  ]);
};
