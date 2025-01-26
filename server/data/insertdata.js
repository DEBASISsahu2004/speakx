require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const fs = require("fs");
const { ObjectId } = mongoose.Types;

const insertData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const data = JSON.parse(fs.readFileSync("./speakx_questions.json", "utf8"));

    for (const question of data) {
      if (question.siblingId) {
        question.siblingId = new ObjectId(question.siblingId.$oid);
      }
      if (question._id) {
        question._id = new ObjectId(question._id.$oid);
      }
    }

    const result = await mongoose.connection
      .collection("questions")
      .insertMany(data);
    console.log("Data inserted successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error while connecting DB:", error);
    await mongoose.connection.close();
  }
};

insertData();
