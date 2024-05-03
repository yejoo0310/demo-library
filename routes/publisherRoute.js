import { Router } from "express";
import { PublisherModel } from "../models/publisherModel.js";

const PublisherRouter = new Router();

PublisherRouter.post("/publisher", async (req, res) => {
  const data = {
    PublisherName: req.body.name,
  };

  if (!data.PublisherName) {
    res.status(400).json({
      message: "비어있는 값이 있습니다.",
    });
    return;
  }

  console.log(data);

  try {
    const result = await PublisherModel.create(data);
    console.log(result);

    res.status(200).json({
      message: "성공적으로 생성되었습니다.",
      name: data.PublisherName,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
  }
});

PublisherRouter.get("/publisher/:publisherName", async (req, res) => {
  try {
    const publisher = await PublisherModel.findOne({
      PublisherName: req.params.publisherName,
    });

    res.status(200).json({
      message: `${publisher.PublisherName} 출판사의 책입니다.`,
      data: publisher.PublishedBooks,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
  }
});

export default PublisherRouter;
