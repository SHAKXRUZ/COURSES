const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { read_file, write_file } = require("./fs/fs_api");

dotenv.config();
const { PORT } = process.env || 3001;

const app = express();
app.use(cors());
app.use(express.json());

// users get
app.get("/users", (req, res) => {
  let users = read_file("users.json");
  res.status(200).json(users);
});

// users registr
app.post("/registr_users", (req, res) => {
  let users = read_file("users.json");
  let findUser = users.find((e) => e.email === req.body.email);
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

// users login
app.post("/login_users", (req, res) => {
  const { email, password, username, id } = req.body;
  let users = read_file("users.json");
  let findUserEmail = users.find((e) => e.email !== email);
  let findUserPassword = users.find((e) => e.password !== password);
  if (findUserEmail) {
    return res.status(401).send({
      msg: "Email not found!",
    });
  } else if (findUserPassword) {
    return res.status(401).send({
      msg: "Password error!",
    });
  }
  let psw = bcrypt.compare(password, email);
  if (psw) {
    let token = jwt.sign(
      { id: id, email: email, username: username },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_TIME,
      }
    );
    return res.send({
      msg: "Success!",
      token,
    });
  }
  res.send("Ok");
});

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
