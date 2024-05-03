import { Router } from "express";
import { BookModel } from "../models/bookModel.js";
import { PublisherModel } from "../models/publisherModel.js";

const BookRouter = new Router();

BookRouter.post("/book", async (req, res) => {
  const data = {
    BookTitle: req.body.title,
    PublisherName: req.body.publisher,
  };

  if (!data.BookTitle || !data.PublisherName) {
    res.status(400).json({
      message: "비어있는 값이 있습니다.",
    });
    return;
  }
  console.log(data);
  try {
    const result = await BookModel.create(data);
    console.log(result);

    const publisher = await PublisherModel.findOne({
      PublisherName: data.PublisherName,
    });
    console.log(publisher);

    if (publisher !== null) {
      //출판사가 등록되어있을때
      publisher.PublishedBooks.push(data.BookTitle);
      publisher.save();
    } else {
      // 출판사가 등록되어 있지 않을 때
      const books = [data.BookTitle];
      const newPublisherData = {
        PublisherName: req.body.publisher,
        PublishedBooks: books,
      };
      await PublisherModel.create(newPublisherData);
    }

    res.status(200).json({
      message: "성공적으로 생성되었습니다.",
      title: data.BookTitle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "error",
    });
  }
});

export default BookRouter;
