import { hash } from "bcrypt";

import { ENVIRONMENT } from "../server.js";
import { createAccessToken, createRefreshToken } from "../utils/token.js";
import { loginService, registerService } from "../services/authService.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hash(password, 10);

    await registerService(name, email, hashedPassword);

    res.status(201).json({
      data: null,
      error: null,
      success: true,
    });
  } catch (err) {
    if (err.message.includes("UNIQUE constraint failed")) {
      return res.status(400).json({
        data: null,
        success: false,
        error: "User already exists",
      });
    }

    console.error("Error during registration:", err.message);

    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sub = await loginService(email, password);

    const token = createAccessToken(sub);
    const refreshToken = createRefreshToken(sub);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: ENVIRONMENT === "production",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: ENVIRONMENT === "production",
    });

    res.status(200).json({
      data: null,
      error: null,
      success: true,
    });
  } catch (err) {
    console.error("Error during login:", err.message);

    if (err.message === "Invalid credentials") {
      return res.status(401).json({
        data: null,
        success: false,
        error: "Invalid credentials",
      });
    }

    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};

export const logoutController = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.status(200).json({
    data: null,
    error: null,
    success: true,
  });
};
