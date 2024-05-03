import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  BookTitle: { type: String },
  PublisherName: { type: String },
});

const BookModel = mongoose.model("Book", BookSchema);

export { BookModel, BookSchema };
