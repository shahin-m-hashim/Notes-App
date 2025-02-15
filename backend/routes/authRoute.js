import { Router } from "express";

import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/authController.js";

import { sanitizeLogin, sanitizeRegister } from "../middlewares/sanitizer.js";

const authRouter = Router();

authRouter.post("/register", sanitizeRegister, registerController);

authRouter.post("/login", sanitizeLogin, loginController);

authRouter.get("/logout", logoutController);

export default authRouter;
