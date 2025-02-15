import { noteSchema } from "../schemas/note.js";
import { loginSchema, registerSchema } from "../schemas/user.js";

export const sanitizeRegister = (req, res, next) => {
  try {
    req.body = registerSchema.parse(req.body);
    next();
  } catch (error) {
    // console.log(error.issues);
    return res.status(400).json({
      data: null,
      success: false,
      error: "Invalid form data",
    });
  }
};

export const sanitizeLogin = (req, res, next) => {
  try {
    req.body = loginSchema.parse(req.body);
    next();
  } catch (error) {
    // console.log(error.issues);
    return res.status(401).json({
      data: null,
      success: false,
      error: "Invalid credentials",
    });
  }
};

export const sanitizeNote = (req, res, next) => {
  try {
    req.body = noteSchema.parse(req.body);
    next();
  } catch (error) {
    // console.log(error.issues);
    return res.status(400).json({
      data: null,
      success: false,
      error: "Invalid note",
    });
  }
};
