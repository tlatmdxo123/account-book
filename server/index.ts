import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { nanoid } from "nanoid";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const db = lowdb(new FileSync<{ payHistories: PayHistory[] }>("db.json"));

db.defaults({
  payHistories: [],
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
  console.log("gg");
  const data = db.get("payHistories").value();
  return res.json(data);
});

app.post("/histories/new", (req, res) => {
  const history = { ...req.body, id: nanoid() };
  console.log(history);
  db.get("payHistories").push(history).write();
  res.json(history);
});

app.post("/histories/:historyId", (req, res) => {
  const { historyId } = req.params;
  console.log("edit");
  const edited = { ...req.body };
  db.get("payHistories").find({ id: historyId }).assign(edited).write();
  res.json(edited);
});

app.delete("/histories/:historyId", (req, res) => {
  const { historyId } = req.params;

  db.get("payHistories").remove({ id: historyId }).write();
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}!`);
});
