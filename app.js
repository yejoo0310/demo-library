import express from "express";
import dbConnect from "./config/dbConnect.js";
import BookRouter from "./routes/bookRoute.js";
import PublisherRouter from "./routes/publisherRoute.js";

const app = new express();

dbConnect();

app.use(express.json());
app.use(BookRouter);
app.use(PublisherRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`서버 실행됨 port: ${port}`);
});
