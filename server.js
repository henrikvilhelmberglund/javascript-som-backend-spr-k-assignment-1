import { MongoClient, ObjectId } from "mongodb";
import express from "express";

const app = express();
const port = 3000;

// ! if no parantheses - nothing happens
app.use(express.urlencoded());
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index", { title: "Member list start page" });
});

app.get("/members", async (req, res) => {
  const members = await membersCollection.find({}).toArray();
  // res.json(members);
  res.render("members", { title: "List of our members", members });
});

app.get("/members/add-member", async (req, res) => {
  const members = await membersCollection.find({}).toArray();
  // res.json(members);
  res.render("add-member", { title: "Add a new member", members });
});

app.post("/members/create", async (req, res) => {
  await membersCollection.insertOne(req.body);
  // res.json(members);
  res.redirect("/members");
});

app.get("/member/:id", async (req, res) => {
  const member = await membersCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  res.render("member", {
    name: member.name,
  });
});

app.get("/:input", (req, res) => {
  res.render(
    req.params.input,
    {
      title: `${req.params.input} page`,
    },
    (err, html) => {
      if (err) {
        res.status(404).render("404", {
          title: `404: page not found`,
        });
      }
      res.send(html);
    }
  );
});

app.listen(port, () =>
  console.log(`Started assignment server on port ${port}`)
);

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();

const db = client.db("library");
const membersCollection = db.collection("members");
