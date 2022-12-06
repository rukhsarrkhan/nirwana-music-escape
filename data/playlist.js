const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.user_collection;
// const bcrypt = require("bcrypt");
// const saltRounds = 8;
//const { isProperString, isPasswordValid, checkUserObject } = require("../helpers");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const createPlaylistObject = async()=>{
    let playlistId = new ObjectId()
    let playlist = {
      _id: playlistId,
      userId: obj.userId, 
      playlistName: obj.playlistName,
      description: obj.description,
      songs:[]
    }
    return playlist;
  }

const createPlaylist = async (obj) => {
    let playlist = await createPlaylistObject(obj);
        //checkUserObject(playlist)
    const users = await userCollection();
    const user = await users.findOne({ _id: Object(playlist.userId)})
    if (user == null) throw "No user with that id";

    const updateInfo = await users.updateOne(
        //find the userId according to one of input parameter
        {_id: Object(playlist.userId)},
        //make nested object at previous user attribute playlist
        {$addToSet: {playlist: playlist}}
    );
    if (updateInfo.modifiedCount === 0) throw " Could not add playlist successfully "
    playlist['token'] = generateToken(playlist.userId)
    return{playlistInserted:true}
    };


const getAllPlaylist = async (userId) => {
    //helper
    userId = userId.trim();
    if(!ObjectId.isValid(userId)) throw "Invalid userId Object provided"

    const playlists = await userCollection();
    const allPlaylist = await playlists.find(
        {_id : ObjectId(userId)}, 
        {projection:{playlist:1, _id:0}}).toArray();

    if(allPlaylist.length === 0) throw " No playlist yet "
        return allPlaylist[0].playlist;
}


const generateToken = (id) => {
    return jwt.sign({ id }, "HeavenOnEarth", { expiresIn: "30d" });
    };

module.exports = {
    createPlaylistObject,
    createPlaylist,
    getAllPlaylist
}