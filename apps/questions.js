import { ObjectId } from "mongodb";
import { Router } from "express";
import { db } from "../utils/db.js";

export const questionsRouter = Router();

const collection = db.collection("questions");

questionsRouter.get("/", async (req, res) => {
  const questions = await collection.find({}).toArray();

  return res.json({ data: questions });
});

questionsRouter.get("/:id", async (req, res) => {
  try {
    const question = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });

    return res.json({ data: question });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

questionsRouter.post("/", async (req, res) => {
  const { title, description, category } = req.body;

  try {
    await collection.insertOne({
      title,
      description,
      category,
      created_at: new Date(),
    });

    return res.json({ message: "ALL DONE MATE" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "SOMETHING WENT WRONG" });
  }
});

questionsRouter.put("/:id", async (req, res) => {
  const { title, description, category } = req.body;

  try {
    await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { title, description, category } }
    );

    return res.json({ message: "UPDATED" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "SOMETHING WENT WRONG" });
  }
});

questionsRouter.delete("/:id", async (req, res) => {
  try {
    const test = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (test.deletedCount === 0) {
      return res.status(400).json({ message: "THERE IS NO DATA!!!!!!!!!!!!" });
    }

    return res.json({ message: "AND THENNNNNN IT GONE" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "SOMETHING WENT WRONG" });
  }
});
