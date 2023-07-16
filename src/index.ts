import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";
import router from "./router";
import "dotenv/config";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

const MONGO_URL = process.env.MONGO_URL;

try {
  mongoose.connect(MONGO_URL);
  console.log("connected to database");
} catch (error) {
  console.log(error);
}

app.use("/", router());
