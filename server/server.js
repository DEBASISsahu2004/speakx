const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const ConnectDb = require("./config/db/db");

ConnectDb();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/questions", async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;
  try {
    const questions = await mongoose.connection.db
      .collection("questions")
      .find({ title: { $regex: query, $options: "i" } })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .toArray();
    if (questions.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).send("Error while loading the question: " + error.message);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
