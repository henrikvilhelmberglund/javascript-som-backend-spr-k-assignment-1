import { MongoClient, ObjectId } from "mongodb";
import express from "express";

const app = express();
const port = 3000;

// ?  MongoDB init
const client = new MongoClient("mongodb://localhost:27017");
await client.connect();

const db = client.db("memberList");
const membersCollection = db.collection("members");

// ?  Express init
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
  res.render("members", {
    title: "List of our members",
    members,
    sort: "default",
    sortAlternatives: ["Default", "Asc", "Desc"],
  });
});

app.post("/members/", async (req, res) => {
  const sortType = Object.keys(req.body)[0];
  const sortNumber = sortType === "asc" ? 1 : -1;
  let members;
  if (sortType !== "default") {
    members = await membersCollection
      .find({})
      .collation({ locale: "en" })
      .sort({ name: sortNumber })
      .toArray();
  } else {
    members = await membersCollection.find({}).toArray();
  }

  // ? slightly less optimal because the sorting is done on the server and uses server CPU
  // let members = await membersCollection.find({}).toArray();
  // if (sortType !== "default") {
  //   members.sort((a, b) => {
  //     if (a.name.toLowerCase() < b.name.toLowerCase())
  //       return sortType === "asc" ? -1 : 1;
  //     if (b.name.toLowerCase() < a.name.toLowerCase())
  //       return sortType === "asc" ? 1 : -1;
  //   });
  // }

  // res.redirect(`/members/?sort=${sortType}`);
  res.render("members", {
    title: "List of our members",
    members,
    sort: "default",
    sortAlternatives: ["Default", "Asc", "Desc"],
  });
});

app.get("/members/add-member", async (req, res) => {
  const members = await membersCollection.find({}).toArray();
  // res.json(members);
  res.render("add-member", { title: "Add a new member", members });
});

app.post("/members/add-member", async (req, res) => {
  await membersCollection.insertOne(req.body);
  // res.json(members);
  res.redirect("/members");
});

app.post("/members/update-member/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const member = await membersCollection.findOne({
    _id: id,
  });
  console.log(member);
  console.log(req.body);
  await membersCollection.updateOne(member, { $set: req.body });
  // res.json(req.body);
  res.redirect(`/member/${id}`);
});

app.post("/members/delete/:id", async (req, res) => {
  const member = await membersCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  await membersCollection.deleteOne(member);
  // res.json(members);
  res.redirect("/members");
});

app.get("/member/:id", async (req, res) => {
  const member = await membersCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  res.render(
    "member",
    {
      member,
      title: `${member?.name}'s page`,
    },
    (err, html) => {
      if (err) {
        console.log(err);
        res.status(404).render("404", {
          title: `404: page not found`,
        });
      }
      res.send(html);
    }
  );
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
