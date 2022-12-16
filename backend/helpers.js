const { TopologyOpeningEvent,ObjectId } = require("mongodb");

const isProperString = (string) => {
  return typeof string == "string" && string.trim().length != 0;
};
const isProperArray = (arr) => {
  if ((typeof arr == "object" && Array.isArray(arr)) || arr.length == 0)
    return true;
  return false;
};

const checkDirectorName = (title) => {
  if (typeof title !== "string" || !title.match(/^[a-zA-Z ]*$/g))
    throw "Please enter a valid name for Director";
  let splittedName = title.split(" ");
  if (
    splittedName.length !== 2 ||
    splittedName[0].trim().length <= 2 ||
    splittedName[1].trim().length <= 2
  )
    throw "Please enter a valid name for Director";
};

const checkName = (title) => {
  if (typeof title !== "string" || !title.match(/^[a-zA-Z]*$/g))
    throw "Please enter a valid name";
  if (title.length <= 2) throw "Please enter a valid name";
};
const checkValidTitle = (title) => {
  if (
    typeof title != "string" ||
    title.length < 2 ||
    !title.match(/^[a-zA-Z0-9 ]*$/g)
  )
    throw "Please enter a valid title";
};
const checkValidStudio = (studio) => {
  if (
    typeof studio !== "string" ||
    studio.length < 5 ||
    !studio.match(/^[a-zA-Z0-9.,'" ]*$/)
  )
    throw "Please enter a valid Studio Name";
};
const checkValidRating = (rating) => {
  let ratings = ["G", "PG", "PG-13", "R", "NC-17"];
  let flip = false;
  ratings.forEach((x) => {
    if (x == rating) flip = true;
  });
  if (!flip) throw "Invalid rating type";
};
const checkGenre = (genre) => {
  if (!isProperArray(genre)) throw "Invalid genre parameter";
  genre.forEach((x) => {
    if (
      !typeof x == "string" ||
      x.trim().length < 5 ||
      !x.match(/^[a-zA-Z0-9 ]*$/)
    ) {
      throw "Not a valid genre";
    }
  });
};
const checkValidCasteMember = (genre) => {
  if (!isProperArray(genre)) throw "Invalid Cast members";
  let flip = false;
  genre.forEach((x) => {
    if (typeof x != "string" || !x.match(/^[a-zA-Z0-9]*$/)) {
      flip = true;
    }
  });
  if (!flip) throw "Not a valid Cast member";

  genre.forEach((title) => {
    let splittedName = title.split(" ");
    if (
      title.match(/^[a-zA-Z0-9 ]*$/) == null ||
      splittedName.length !== 2 ||
      splittedName[0].trim().length <= 2 ||
      splittedName[1].trim().length <= 2
    )
      throw "Invalid name provided for cast member";
  });
};

function checkObjectId(id){
  if (!ObjectId.isValid(id)) {
      throw 'Invalid ObjectId';
  }
}

function checkPlistName(str) {
  if (typeof str !== 'string') {
    throw 'String expected';
  }
  if (str.trim().length < 2) {
    throw 'String must have more than 2 characters';
  }
  function isTitle(str) {
    const regex = /^[a-zA-Z0-9 ]+$/;
    //const regexNumb = /^[0-9 ]+$/;
    if (regex.test(str)) {
      return true;    
  }else{
      return false;
  }
  }
  if (!isTitle(str)) {
      throw 'String must contain letters a-z, A-Z or numbers';
      }
}

function checkPlistObj(obj){
  let plistName = obj.playlistName
  let plistDesc = obj.description
  //let plistsong = obj.songs
  checkPlistName(plistName)
  isProperString(plistDesc)
  //isProperArray(plistsong)

}

const checkRuntime = (runtime) => {
  if (typeof runtime != "string" || runtime.split(" ").length != 2)
    throw "Not a valid runtime";
  let min = runtime.split(" ")[1];
  let hour = runtime.split(" ")[0];
  if (
    !hour.endsWith("h") ||
    !min.endsWith("min") ||
    !hour.length ||
    hour.length <= 1 ||
    min.length <= 3
  )
    return "Invalid input for runtime";
  hour = hour.substring(0, hour.length - 1);
  min = min.substring(0, min.length - 3);
  if (!min.match(/^\d+$/) || !hour.match(/^\d+$/)) {
    throw "Invalid date format";
  }
  hour = Number.parseInt(hour);
  min = Number.parseInt(min);
  if (hour <= 0) throw "Minimum duration should be greater than 1 hour";
  if (min <= 0 || min > 59) throw "Invalid minutes";
};

const checkValidDate = (date) => {
  if (typeof date != "string" || date.split("/").length != 3)
    throw "Not a valid date input";
  date = date.split("/");
  dd = date[1].trim();
  mm = date[0].trim();
  yy = date[2].trim();
  if (mm.length != 2 || dd.length != 2 || yy.length != 4)
    throw "Invalid date format";
  if (!mm.match(/^\d+$/) || !dd.match(/^\d+$/) || !yy.match(/^\d+$/)) {
    throw "Invalid date format";
  }
  dd = Number.parseInt(dd);
  mm = Number.parseInt(mm);
  yy = Number.parseInt(yy);
  if (dd < 1) throw "Invalid Date Provided";
  let mm31 = [1, 3, 5, 7, 8, 10, 12];
  if (mm31.includes(mm)) {
    if (dd > 31) throw "Invalid Date provided";
  }
  if (mm == 2)
    if (dd > 28) throw "Invalid date";
    else if (dd > 30) throw "Invalid date";
  let time = new Date();
  let year = time.getFullYear();
  if (yy < 1900 || yy > year + 2) {
    throw "Invalid year provided";
  }
};
const isValidObject = (obj) => {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let element = obj[keys[i]];
    if (typeof element == "undefined") return false;
    if (typeof element == "string") {
      if (element.length == 0) return false;
    }
  }
  return true;
};

const isPasswordValid = (password) => {
  if (typeof password != "string" || password.length < 6)
    throw "Invalid password";
  let caps = false,
    spec = false,
    num = false;
  if (password.indexOf(" ") >= 0) throw "Invalid Password";
  for (let x of password) {
    let i = x.charCodeAt(0);
    if (i >= 65 && i <= 90) caps = true;
    else if (i >= 48 && i <= 57) num = true;
    else if (i >= 97 && i <= 122) continue;
    else spec = true;
  }
  if (!spec || !caps || !num) throw "Invalid password format";
};

const checkUserObject = (user) => {
  let username = user.userName;
  let password = user.password;

  if (!isProperString(username) || username.length < 4)
    throw "Invalid username or password. ";
  username = username.trim().toLowerCase();
  password = password.trim();
  if (user["role"] == undefined) user.role = "USER";
  //  isPasswordValid(password);
  let keys = Object.keys(user);
  for (let i = 0; i < keys.length; i++) {
    let element = user[keys[i]];
    if (typeof element == "undefined") throw "Please provide valid attributes";
  }
  checkName(user.firstName);
  checkName(user.lastName);

  return true;
};

const validateUsernameNPassword = (username, password) => {
  const RegExp = /^[A-Za-z0-9]*$/;
  if (!username) throw "please provide the username";
  if (typeof username !== "string") throw "username must be of string type";
  if (username.match(/\s/)) throw "username cannot have empty spaces";
  username = username.trim();
  if (username.trim().length === 0)
    throw "username cannot be just empty strings";
  if (username.length < 4) throw "username must be atleast 4 characters long";
  if (!username.match(RegExp)) throw "username is not valid";
  if (!password) throw "please type the password";
  if (password.match(/\s/)) throw "password cannot have empty spaces";
  password = password.trim();
  if (password.trim().length === 0)
    throw "password cannot be just empty strings";
  if (password.length < 6) throw "password must be atleast 6 characters long";
  if (!password.match(/[A-Z]/))
    throw "password should have atleast one uppercase character";
  if (!password.match(/[a-z]/))
    throw "password should have lowercase characters";
  if (!password.match(/[0-9]/))
    throw "password should have atleast one number ";
  if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/))
    throw "password should have atleast one special character";
};
const validateCreateUserObject = (
  firstName,
  lastName,
  userName,
  password,
  role,
  phoneNumber,
) => {
    if (typeof firstName !== "string") {
        throw "firstName is not of proper type";
      }
      if (firstName.trim().length == 0 || firstName.length == 0) {
        throw "firstName cannot be just empty spaces";
      }
      if (typeof lastName !== "string") {
        throw "lastName is not of proper type";
      }
      if (lastName.trim().length == 0 || lastName.length == 0) {
        throw "lastName cannot be just empty spaces";
      }
      if (typeof userName !== "string") {
        throw "userName is not of proper type";
      }
      if (userName.trim().length == 0 || userName.length == 0) {
        throw "userName cannot be just empty spaces";
      }
      if (typeof role !== "string") {
        throw "role is not of proper type";
      }
      if (role.trim().length == 0 || role.length == 0) {
        throw "role cannot be just empty spaces";
      }
      if(role!==user || role!==admin){
      throw "role must be user or admin"
      }
      if(!role.toLowerCase){
        throw "role should be of lower case"
      }
};
const validateCheckUser = (
  username,
  password,
) => {
  const RegExp = /^[A-Za-z0-9@.]*$/;
  console.log("user",username)
  if (!username) throw "please provide the username";
  if (typeof username !== "string") throw "username must be of string type";
  if (username.match(/\s/)) throw "username cannot have empty spaces";
  username = username.trim();
  if (username.trim().length === 0)
    throw "username cannot be just empty strings";
  if (username.length < 4) throw "username must be atleast 4 characters long";
  if (!username.match(RegExp)) throw "username is not valid";
  if (!password) throw "please type the password";
  if (password.match(/\s/)) throw "password cannot have empty spaces";
  password = password.trim();
  if (password.trim().length === 0)
    throw "password cannot be just empty strings";
  if (password.length < 6) throw "password must be atleast 6 characters long";
  if (!password.match(/[A-Z]/))
    throw "password should have atleast one uppercase character";
  if (!password.match(/[a-z]/))
    throw "password should have lowercase characters";
  if (!password.match(/[0-9]/))
    throw "password should have atleast one number ";
  if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/))
    throw "password should have atleast one special character";
  // if(!firstName) throw "please enter first name"
  // if(!firstName.match(/[A-Za-z]/)) throw "first name should be alphabets only"
  //   if (typeof firstName !== "string") {
  //       throw "firstName is not of proper type";
  //     }
  //     if (firstName.trim().length == 0 || firstName.length == 0) {
  //       throw "firstName cannot be just empty spaces";
  //     }
  //     if(!lastName) throw "please enter last name"
  //     if(!lastName.match(/[A-Za-z]/)) throw "lastname should be alphabets only"
  //     if (typeof lastName !== "string") {
  //       throw "lastName is not of proper type";
  //     }
  //     if (lastName.trim().length == 0 || lastName.length == 0) {
  //       throw "lastName cannot be just empty spaces";
  //     }
  //     if (typeof userName !== "string") {
  //       throw "userName is not of proper type";
  //     }
  //     if (userName.trim().length == 0 || userName.length == 0) {
  //       throw "userName cannot be just empty spaces";
  //     }
  //     if(!phoneNumber) throw "please enter the contact number"
  //   if(phoneNumber!==/^[0-9]*$/) throw "phonenUmber is not valid"
      // if (typeof role !== "string") {
      //   throw "role is not of proper type";
      // }
      // if (role.trim().length == 0 || role.length == 0) {
      //   throw "role cannot be just empty spaces";
      // }
      // if(role!==user || role!==admin){
      // throw "role must be user or admin"
      // }
      // if(!role.toLowerCase){
      //   throw "role should be of lower case"
      // }
};

const validatesongs=(
  songName,
  genre,
  artist
)=>{
  if (!songName) throw "please provide songname";
  if(!songName.match(/^[A-Za-z0-9$.]*$/)) throw "songname is not valid"
  if (typeof songName !== "string") throw "songname must be of string type";
  // if (songName.match(/^((?!\s).)*/)) throw "songname cannot have empty spaces";
  songName = songName.trim();
  if (songName.trim().length === 0)
    throw "songname cannot be just empty strings";
    // if (!songUrl) throw "please provide songURL";
    // if(!song.match(/^.*\.mp3$/))throw "song must end with .mp3"
    if (!genre) throw "please provide genre";
    if (typeof genre !== "string") throw "genre must be of string type";
    // if(!genre.match(/[A-Z]/)) throw "genre should be alphabets only"
    // if(!genre.match(/[a-z]/)) throw "genre should be alphabets only"

    // if (genre.match(/^((?!\s).)*/)) throw "genre cannot have empty spaces";
    genre = genre.trim();
    if (genre.trim().length === 0)
      throw "genre cannot be just empty strings";
    if (!artist) throw "please provide name of the artist";
    // if(!artist.match(/[A-Z]/)) throw "artist should be alphabets only"
    // if(!artist.match(/[a-z]/)) throw "artist should be alphabets only"

    if (typeof artist !== "string") throw "artist must be of string type";
    // if (artist.match(/\s/)) throw "artist cannot have empty spaces";
    artist = artist.trim();
    if (artist.trim().length === 0)
      throw "artist cannot be just empty strings";

}

const validateId=(id)=>{
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") throw "Id must be a string";
  if (id.trim().length === 0)
    throw "Id cannot be an empty string or just spaces";
  id = id.trim();
  if (!ObjectId.isValid(id)) throw "invalid object ID";
};
const inputStringValidation = (input, inputString) => {
  if (typeof input == "undefined" || input == null) {
    throw "Input string - " + inputString + " is empty";
  } else if (typeof input != "string") {
    throw "Input string - " + inputString + " is not of proper type string";
  } else if (input.trim().length <= 0) {
    throw "Input string - " + inputString + " is empty";
  }
};


module.exports = {
  isValidObject,
  isProperString,
  checkDirectorName,
  checkGenre,
  checkValidTitle,
  checkValidStudio,
  checkValidRating,
  checkValidCasteMember,
  checkValidDate,
  checkRuntime,
  isPasswordValid,
  checkUserObject,
  checkPlistName,
  checkObjectId,
  checkPlistObj,
  validateUsernameNPassword,
  validateCreateUserObject,
  checkUserObject,
  checkPlistName,
  checkObjectId,
  checkPlistObj,
  validateUsernameNPassword,
  validateCheckUser,
  validatesongs,
  validateId,
  inputStringValidation
};

