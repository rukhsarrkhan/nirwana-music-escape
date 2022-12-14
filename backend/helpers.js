const { TopologyOpeningEvent,ObjectId } = require("mongodb");

const isProperString = (string)=>{
    return typeof string=='string'  && string.trim().length!=0
}
const isProperArray= (arr)=>{
    if(typeof arr=='object' && Array.isArray(arr) || arr.length==0)
        return true;
    return false;
}

const checkDirectorName = (title)=>{
    if(typeof title !== 'string' || !title.match(/^[a-zA-Z ]*$/g)) throw"Please enter a valid name for Director"
    let splittedName = title.split(' ');
    if(splittedName.length !== 2 || splittedName[0].trim().length<=2 || splittedName[1].trim().length<=2)  throw"Please enter a valid name for Director"
}

const checkName = (title)=>{
    if(typeof title !== 'string' || !title.match(/^[a-zA-Z]*$/g)) throw"Please enter a valid name"
    if(title.length<=2)  throw"Please enter a valid name"
}
const checkValidTitle=(title)=>{
    if(typeof title != 'string' || title.length<2 || !title.match(/^[a-zA-Z0-9 ]*$/g)) throw"Please enter a valid title"
}
const checkValidStudio = studio =>{
    if(typeof studio !== 'string' || studio.length<5 || !studio.match(/^[a-zA-Z0-9.,'" ]*$/)) throw"Please enter a valid Studio Name"
}
const checkValidRating = rating=>{
    let ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17']
    let flip = false;
    ratings.forEach(x=>{
        if(x == rating) flip = true
    })
    if(!flip) throw "Invalid rating type"
}
const checkGenre=(genre)=>{
    if(!isProperArray(genre)) throw "Invalid genre parameter";
    genre.forEach(x=>{if(!typeof x =='string' || x.trim().length <5 || !x.match(/^[a-zA-Z0-9 ]*$/)){
        throw "Not a valid genre"
    }})
}
const checkValidCasteMember = genre =>{
    if(!isProperArray(genre)) throw "Invalid Cast members";
    let flip = false;
    genre.forEach(x=>{if(typeof x !='string' || !x.match(/^[a-zA-Z0-9]*$/)){
        flip=true;
    }})
    if(!flip) throw "Not a valid Cast member"

    genre.forEach(title=>{
    let splittedName = title.split(' ');
    if(title.match(/^[a-zA-Z0-9 ]*$/) == null || splittedName.length !== 2 || splittedName[0].trim().length<=2 || splittedName[1].trim().length<=2 )  throw"Invalid name provided for cast member"
    })

}

const checkRuntime = runtime =>{
    if(typeof runtime !='string' || runtime.split(' ').length!=2) throw "Not a valid runtime"
    let min = runtime.split(' ')[1]
    let hour = runtime.split(' ')[0]
    if(!hour.endsWith('h')|| !min.endsWith('min')|| !hour.length || hour.length<=1 || min.length<=3)
        return "Invalid input for runtime"
    hour = hour.substring(0, hour.length-1);
    min = min.substring(0, min.length-3)
    if(!min.match( /^\d+$/) || !hour.match( /^\d+$/)){
        throw "Invalid date format"
    }
    hour = Number.parseInt(hour);
    min = Number.parseInt(min)
    if(hour <=0) throw "Minimum duration should be greater than 1 hour"
    if(min<=0 || min>59) throw "Invalid minutes"

}

const checkValidDate = date =>{
    if(typeof date !='string' || date.split('/').length!=3) throw "Not a valid date input"
    date = date.split('/')
    dd = date[1].trim();
    mm = date[0].trim();
    yy = date[2].trim();
    if(mm.length!=2 || dd.length!=2 || yy.length!=4) throw 'Invalid date format'
    if(!mm.match( /^\d+$/) || !dd.match( /^\d+$/)|| !yy.match( /^\d+$/)){
        throw "Invalid date format"
    }
    dd = Number.parseInt(dd)
    mm = Number.parseInt(mm)
    yy = Number.parseInt(yy)
    if(dd<1) throw "Invalid Date Provided"
    let mm31 = [1, 3, 5, 7, 8, 10, 12]
    if(mm31.includes(mm)){
        if(dd>31) throw "Invalid Date provided"
    }
    if(mm == 2) if(dd>28) throw"Invalid date"
    else if(dd>30) throw "Invalid date";
    let time = new Date();
    let year = time.getFullYear();
    if(yy<1900 || yy >year+2){
        throw "Invalid year provided"
    }

}
const isValidObject =(obj)=>{
    let keys = Object.keys(obj)
    for(let i=0; i<keys.length; i++){
        let element = obj[keys[i]]
        if(typeof(element)=="undefined")
            return false;
        if(typeof element == 'string'){
            if (element.length == 0) return false;
        }
    };
    return true;
}

const isPasswordValid = (password)=>{
    if(typeof password!="string" || password.length<6) throw "Invalid password"
    let caps=false, spec=false, num=false;
    if(password.indexOf(' ') >= 0) throw 'Invalid Password'
    for(let x of password){
        let i=x.charCodeAt(0);
        if(
            (i >= 65 && i <= 90) )caps=true;
        else if((i >= 48 && i <= 57)) num = true;
        else if(i >= 97 && i <= 122) continue
        else spec = true;
    }
    if(!spec|| !caps || !num) throw "Invalid password format"
}

const checkUserObject =(user)=>{
    let username = user.userName;
    let password = user.password;
    
    if (
        !isProperString(username) ||
        username.length < 4
      )
        throw "Invalid username or password. ";
      username = username.trim().toLowerCase();
      password = password.trim();
      if(user['role'] == undefined) user.role = "USER"
    //  isPasswordValid(password);
    let keys = Object.keys(user)
    for(let i=0; i<keys.length; i++){
        let element = user[keys[i]]
        if(typeof(element)=="undefined")
            throw "Please provide valid attributes"
    };
    checkName(user.firstName);
    checkName(user.lastName);

    return true;
}

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


module.exports ={
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
    checkPlistObj
}