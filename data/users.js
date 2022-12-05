const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.user_collection;
const bcrypt = require("bcrypt");
const saltRounds = 8;
const { isProperString, isPasswordValid } = require("../helpers");
const jwt = require("jsonwebtoken");
const createUser = async (username, password) => {
  if (
    !isProperString(username) ||
    !isProperString(password) ||
    username.length < 4 ||
    password.length < 6
  )
    throw "Invalid username or password. ";
  username = username.trim().toLowerCase();
  password = password.trim();
  const users = await userCollection();
  isPasswordValid(password);
  if (await users.findOne({ username: username })) throw "User already exists";
  let newUser = {
    username: username,
    password: await bcrypt.hash(password, saltRounds),
  };
  const insertInfo = await users.insertOne(newUser);
  console.log(insertInfo);
  if (!insertInfo.insertedCount == 0) throw "Server Error";
  newUser['_id'] = insertInfo.insertedId.toString();
  newUser['token'] = generateToken(insertInfo.insertedId)
  return newUser;
};

const checkUser = async (username, password) => {
  if (
    !isProperString(username) ||
    !isProperString(password) ||
    username.length < 4 ||
    password.length < 6
  )
    throw "Invalid username or password. ";
  isPasswordValid(password);
  username = username.trim().toLowerCase();
  const users = await userCollection();
  const user = await users.findOne({ username: username });
  if (!user) throw "Invalid Username or Password";
  const authenticated = await bcrypt.compare(password, user.password);
  user['token'] = generateToken(user._id);
  if (authenticated) return  user;
  throw "Invalid Username / Password";
};

const generateToken = (id) => {
  return jwt.sign({ id }, "HeavenOnEarth", { expiresIn: "30d" });
};

module.exports = {
  createUser,
  checkUser,
};
