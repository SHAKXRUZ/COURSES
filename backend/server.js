const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const uuid = require("uuid");
const { read_file, write_file } = require("./fs/fs_api");

dotenv.config();
const { PORT } = process.env || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  let users = read_file("users.json");
  res.status(200).json(users);
});

app.post("/registr_users", (req, res) => {
  let users = read_file("users.json");

  let findUser = users.find((e) => e.email == req.body.email);
  if (findUser) {
    return res.status(401).send({
      msg: "This user is registered!",
    });
  }

  users.push({
    id: uuid.v4(),
    ...req.body,
  });

  write_file("users.json", users);
  res.status(201).send({
    msg: "Created users!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
