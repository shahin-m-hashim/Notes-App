import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";

import { connectDB } from "./db.js";

import logger from "./middlewares/logger.js";
import authorize from "./middlewares/authorize.js";
import { authLimiter, globalLimiter } from "./middlewares/apiLimiter.js";

import authRouter from "./routes/authRoute.js";
import notesRouter from "./routes/notesRoute.js";

const server = express();

export const ENVIRONMENT = process.env.ENVIRONMENT || "development";

const port = process.env.PORT || 8080;
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

const startServer = async () => {
  try {
    await connectDB();

    server.use(
      cors({
        credentials: true,
        origin: frontendOrigin,
        methods: ["GET, POST, PUT, PATCH, DELETE"],
      })
    );

    server.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            imgSrc: ["'none'"],
            fontSrc: ["'none'"],
            styleSrc: ["'none'"],
            scriptSrcAttr: ["'none'"],
            frameAncestors: ["'none'"],
            connectSrc: ["'self'", frontendOrigin],
          },
        },
      })
    );

    server.use(express.json());
    server.use(cookieParser());
    server.use(express.urlencoded({ extended: true }));

    server.use(logger);

    server.use("/auth", authLimiter, authRouter);

    server.use(globalLimiter);

    // private routes
    server.use("/notes", authorize, notesRouter);

    server.use("*", (req, res) => {
      res
        .status(404)
        .send("Looks like, the page you are looking for doesn't exist");
    });

    server.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  } catch (err) {
    console.log(`Server error: ${err.message}`);
    process.exit(1);
  }
};

startServer();
