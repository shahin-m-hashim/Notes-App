import { compare } from "bcrypt";
import { connectDB } from "../db.js";

export const registerService = async (name, email, hashedPassword) => {
  const db = await connectDB();

  const user = await db.run(
    `INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, datetime('now'))`,
    [name, email, hashedPassword]
  );

  console.log(`User created: ${user.lastID}`);
};

export const loginService = async (email, password) => {
  const db = await connectDB();
  const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);

  if (!user) throw new Error("Invalid credentials");

  const isValid = await compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  return {
    id: user.id,
  };
};
