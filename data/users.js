const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.user_collection;
const bcrypt = require("bcrypt");
const saltRounds = 8;
const { isProperString, isPasswordValid, checkUserObject } = require("../helpers");
const jwt = require("jsonwebtoken");
const createUserObject=async(obj)=>{
  let user = {
    firstName: obj.firstName,
    lastName: obj.lastName,
    userName: obj.userName,
    password: await bcrypt.hash(obj["password"], saltRounds),
    role: obj.role,
    profileImage:"",
    phoneNumber:obj.phoneNumber,
    playlist:[],
    likes:[]
  }
  return user;
}

const createUser = async (obj) => {
  let user = await createUserObject(obj);
    checkUserObject(user)
  const users = await userCollection();
  if (await users.findOne({ userName: user.userName })) throw "User already exists";
  const insertInfo = await users.insertOne(user);
  console.log(insertInfo);
  if (!insertInfo.insertedCount == 0) throw "Server Error";
  user['_id'] = insertInfo.insertedId.toString();
  user['token'] = generateToken(insertInfo.insertedId)
  return user;
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
  const user = await users.findOne({ userName: username });
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
