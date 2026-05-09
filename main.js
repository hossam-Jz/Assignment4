import express from "express";
import fs from "fs";
const app = express();
const port = 8080;
app.use(express.json());
let users = JSON.parse(fs.readFileSync("./userData.json", "utf-8"));

// (1)
app.post("/add-User", (req, res) => {
  const { name, age, gmail } = req.body;
  const id = users.length ? users[users.length - 1].id + 1 : 1;
  const existUser = users.find((user) => user.gmail === gmail);
  if (!existUser) {
    users.push({ id, name, age, gmail });
    fs.writeFileSync("./userData.json", JSON.stringify(users));
    return res.json({ message: "user added successfly", users });
  }

  return res.json({ message: "Email Allredy exist" });
});

// (2)
app.patch("/update-user/:id", (req, res) => {
  const { name, age, gmail } = req.body;
  const { id } = req.params;
  const existUser = users.find((user) => user.id === parseInt(id));
  if (existUser) {
    existUser.name = name;
    existUser.age = age;
    existUser.gmail = gmail;

    fs.writeFileSync("./userData.json", JSON.stringify(users));
    return res.json({ message: "user Updated ", existUser });
  }

  res.json({ message: "User not found" });
});

// (3)

app.delete("/delet-user/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index === -1) {
    res.json({ message: "user not found" });
  }
  users.splice(index, 1);
  fs.writeFileSync("./userData.json", JSON.stringify(users));
  res.json("user deleted", users);
});

// (4)

app.get("/getByName", (req, res) => {
  const { name } = req.query;
  const exitsUser = users.find((user) => user.name === name);
  if (exitsUser) {
    return res.json({ message: "user founded ", exitsUser });
  }
  return res.json({ message: "User not found" });
});

// (5)
app.get("/get-all-Users", (req, res) => {
  return res.json({ message: "All Users ", users });
});

//(6)
app.get("/MinAge", (req, res) => {
  const { MinAge } = req.query;

  const filterAge = users.filter((user) => user.age > parseInt(MinAge));
  if (filterAge) {
    return res.json({ message: "Min Age = ", filterAge });
  }
  res.json({ message: "Please Need Age " });
});

// (7)

app.get("/userById/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    res.json({ message: "user Founded ", user });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});


// (1)  Add User 
// (2)  ctrl+s
 