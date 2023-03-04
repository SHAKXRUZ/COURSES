const path = require("path");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
app.use(cors());
app.use(express.json());
const { read_file, write_file } = require("./fs/fs_api");
dotenv.config();
const { PORT } = process.env || 4001;

// users get
app.get("/users", (req, res) => {
  let users = read_file("users.json");
  res.status(200).json(users);
});

// users registr
app.post("/registr_users", async (req, res) => {
  let { username, email, password } = req.body;
  let hashPassword = await bcrypt.hash(password, 12);
  let users = read_file("users.json");
  let findUser = users.find((e) => e.email === req.body.email);
  if (findUser) {
    return res.status(401).send({
      msg: "This user is registered!",
    });
  } else {
    users.push({
      id: uuid.v4(),
      username,
      email,
      hashPassword,
    });
  }
  write_file("users.json", users);
  res.status(201).send({
    msg: "Created users!",
  });
});

// // users login
app.post("/login_users", async (req, res) => {
  const { email, password } = req.body;
  let users = read_file("users.json");
  let findUserEmail = users.find((e) => e.email === req.body.email);
  if (!findUserEmail) {
    return res.status(401).send({
      msg: "Email not found!",
    });
  }
  let findUserPassword = await bcrypt.compare(
    password,
    findUserEmail.hashPassword
  );
  if (!findUserPassword) {
    return res.status(401).send({
      msg: "Password error!",
    });
  }

  let psw = bcrypt.compare(password, email);
  if (psw) {
    let token = jwt.sign(
      { email: email, password: password },
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

// uload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({
    img_name: req.file.filename,
  });
});

// create courses
app.post("/data", (req, res) => {
  let courses = read_file("courses.json");
  courses.push({
    id: uuid.v4(),
    ...req.body,
  });
  write_file("courses.json", courses);
  res.send({
    msg: "Created courses!",
  });
});

app.get("/courses", (req, res) => {
  let courses = read_file("courses.json");
  res.status(200).json(courses);
});

app.delete("/courses_delete/:id", (req, res) => {
  let courses = read_file("courses.json");
  let coursesId = courses.find((e) => e.id === req.params.id);
  if (!courses) {
    return res.status(404).send({ msg: "Courses not found!" });
  }
  courses.forEach((e, i) => {
    if (e.id === coursesId.id) {
      courses.splice(i, 1);
      write_file("courses.json", courses);
      res.status(200).send({
        msg: "Delete courses",
      });
    }
  });
});

app.put("/courses_update/:id", (req, res) => {
  let courses = read_file("courses.json");
  if (!courses) {
    return res.status(404).send("Courses not found!");
  }
  courses.forEach((e, i) => {
    courses[i].title = req.body.title;
    courses[i].price = req.body.price;
    courses[i].author = req.body.author;
    write_file("courses.json", courses);
    res.status(200).send({
      msg: "Update courses",
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
