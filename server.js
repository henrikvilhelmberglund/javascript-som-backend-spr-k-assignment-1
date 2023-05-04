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
  });
});

app.post("/members/", async (req, res) => {
  let members = await membersCollection.find({}).toArray();
  // console.log(Object.keys(req.body)[0]);
  const sortType = Object.keys(req.body)[0];

  if (sortType === "asc") {
    members.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (b.name < a.name) return -1;
    });
  } else if (sortType === "desc") {
    members.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (b.name < a.name) return 1;
    });
  }

  // res.redirect(`/members/?sort=${sortType}`);
  res.render("members", {
    title: "List of our members",
    members,
    sort: "default",
  });
});
// console.log(members);
// res.json(members);
// res.render("members", {
//   title: "List of our members",
//   members,
// });

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
