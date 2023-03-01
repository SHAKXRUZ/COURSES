const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { read_file, write_file } = require("../fs/fs_api");

const Auth = {
  REGISTER: async (req, res) => {
    const { username, email, password } = req.body;

    let users = read_file("users.json");

    let foundedUser = users.find((user) => user.email === email);

    if (foundedUser) {
      return res.status(200).send({
        msg: "Email already exist!",
      });
    }

    let hashPsw = await bcrypt.hash(password, 12);

    console.log(hashPsw);

    users.push({
      id: uuid.v4(),
      username,
      email,
      password: hashPsw,
    });

    write_file("users.json", users);

    res.send({
      msg: "Registration!",
    });
  },

  LOGIN: async (req, res) => {
    const { email, password } = req.body;

    let foundedUser = read_file("users.json").find(
      (user) => user.email === email
    );

    if (!foundedUser) {
      return res.status(404).send({
        msg: "User not found!",
      });
    }

    let psw = await bcrypt.compare(password, foundedUser.password);

    if (psw) {
      let token = await jwt.sign(
        { id: foundedUser.id, email: foundedUser.email },
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
  },
};

module.exports = Auth;
