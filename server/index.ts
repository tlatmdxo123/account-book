import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { nanoid } from "nanoid";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const db = lowdb(new FileSync<{ payHistories: PayHistory[] }>("db.json"));

db.defaults({
  payHistories: [
    {
      id: nanoid(),
      amount: 10000,
      date: new Date().toString(),
      category: "식사",
      content: "김치삼겹살",
    },
  ],
}).write();

type Category = string;
type DateString = string;

type PayHistory = {
  id: string;
  amount: number;
  date: DateString;
  category: Category;
  content: string;
};

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 4321;

app.get("/histories", (req, res) => {
  const data = db.get("payHistories").value();
  return res.json(data);
});

app.post("/histories/:historyId", (req, res) => {
  const { historyId } = req.params;

  db.get("payHistories")
    .find({ id: historyId })
    .assign({ ...req.body })
    .write();
  res.json({ success: true });
});

app.post("/histories/new", (req, res) => {
  const history = { ...req.body, id: nanoid() };
  db.get("payHistories").push(history).write();
  res.json(history);
});

app.delete("/histories/:historyId", (req, res) => {
  const { historyId } = req.params;

  db.get("payHistories").remove({ id: historyId }).write();
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}!`);
});
