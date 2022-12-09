const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.user_collection;
// const bcrypt = require("bcrypt");
// const saltRounds = 8;
//const { isProperString, isPasswordValid, checkUserObject } = require("../helpers");
const validation = require('../helpers')
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const createPlaylistObject = async(obj)=>{
    let playlistId = new ObjectId()
    let playlist = {
      _id: playlistId,
      playlistName: obj.playlistName,
      description: obj.description,
      songs:[]
    }
    return playlist;
  }

const createPlaylist = async (userId, obj) => {
    validation.checkObjectId(userId)
    validation.checkPlistObj(obj)
    let playlist = await createPlaylistObject(obj);   
    const users = await userCollection();
    const user = await users.findOne({ _id: new ObjectId(userId)})
    if (user == null) throw "No user with that id";
    //could consider duplicate playlistName here, $addtoSet won't need
    //if(playlist.playlistName==user.playlist[0].playlistName) throw "this playlistName already exist"
    const updateInfo = await users.updateOne(
        {_id: ObjectId(userId)},
        {$push: {playlist: playlist}}
    );
    if (updateInfo.modifiedCount === 0) throw " Could not add playlist successfully "
    return playlist;
    };


const getAllPlaylist = async (userId) => {
    //helper
    userId = userId.trim();
    validation.checkObjectId(userId)

    const playlists = await userCollection();
    const allPlaylist = await playlists.find(
        {_id : ObjectId(userId)}, 
        {projection:{playlist:1, _id:0}}).toArray();

    if(allPlaylist[0].playlist.length === 0) throw " No playlist yet "
    return allPlaylist[0].playlist;
}

const deletePlaylist = async (playlistId)=>{
    if (!playlistId) throw 'You must provide an id to search for';
    validation.checkObjectId(playlistId)
    playlistId = playlistId.trim();
    const users = await userCollection();

    const deletionInfo = await users.findOneAndUpdate({
      'playlist._id': ObjectId(playlistId)
      //target the playlist it belongs to deleteInfo contains current user
    },
    {
      $pull: 
      {playlist: {'_id': ObjectId(playlistId)}
    }
  },
  {returnDocument: 'after'}
  );
    //setting returnDocument to 'after' 
    //will return the updated document, leastest keyword.
    if (deletionInfo.deletedCount === 0) {
      throw 'Could not delete review with id of ${reviewId}';
    }
  
    //deletionInfo.value.reviews._id = deletionInfo.value.reviews._id.toString();
    return deletionInfo.value.playlist;
}

const modifyPlaylist = async (playlistId, obj) => {
    //let playlistUpdateInfo = await createPlaylistObject(obj);
    validation.checkObjectId(playlistId)
    let newInfo = obj
    const users = await userCollection();
    const updateInfo = await users.updateOne(
        {'playlist._id': ObjectId(playlistId)},
        {$set: {
            "playlist.$.playlistName":newInfo.playlistName,
            "playlist.$.description":newInfo.description,
            }
        }
    );
    if (!updateInfo.matchedCount&&!updateInfo.modifiedCount){
        throw 'could not update playlist successfully'
    }
    const playlist = getPlaylist(playlistId)
    return playlist
  
}
const getPlaylist = async (playlistId) => {
      validation.checkObjectId(playlistId)
      const users = await userCollection();
      const user = await users.findOne({
         'playlist._id': ObjectId(playlistId)
        },
        {
          'playlist.$':1
        }
         );
      // locate playlists by nested object reviews
      if (user == null) throw 'error: playlist not found';
      let playlist = {};
      for (let i = 0; i < user.playlist.length; i++) {
        if (user.playlist[i]._id.toString() == playlistId) {
        user.playlist[i]._id = user.playlist[i]._id.toString();
        playlist = user.playlist[i]
        }
      }
      return playlist;
    };

module.exports = {
    createPlaylistObject,
    createPlaylist,
    getAllPlaylist,
    deletePlaylist,
    modifyPlaylist,
    getPlaylist
}