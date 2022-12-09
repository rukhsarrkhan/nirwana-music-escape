const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.user_collection;
<<<<<<< HEAD
const validation = require('../helpers')
=======
// const bcrypt = require("bcrypt");
// const saltRounds = 8;
//const { isProperString, isPasswordValid, checkUserObject } = require("../helpers");
const validation = require('../helpers')
const jwt = require("jsonwebtoken");
>>>>>>> 3ea2681 (add features for playlist: delete and update)
const { ObjectId } = require("mongodb");
const songsData = require('./songs');


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

const addSongs = async(playlistId, songId)=>{
    validation.checkObjectId(playlistId);
    validation.checkObjectId(songId);
//    let song = await songsData.getSongsById(songId)
    const users = await userCollection();
    const user = await users.findOne({ 
      "playlist._id": new ObjectId(playlistId)
    })
    if (user == null) throw "No playlist with that id";
    
    const updateInfo = await users.updateOne(
      {
        "playlist._id":new ObjectId(playlistId)
      },
      {$addToSet:{
        "playlist.$.songs":songId
      }
      }
    )
    if (updateInfo.modifiedCount === 0) throw " this song already exist under this playlist "

    const playlist = await getPlaylist(playlistId)
    return playlist['songs']
    };

const deleteSongs = async(playlistId, songId)=>{
    validation.checkObjectId(playlistId);
    validation.checkObjectId(songId);
    const users = await userCollection();
    const deleteInfo = await users
    .updateOne(
      {
        "playlist._id":new ObjectId(playlistId)
      },
      {$pull:{
        "playlist.$.songs":songId
      }
      }
)

    if (!deleteInfo.matchedCount&&!deleteInfo.modifiedCount){
        throw 'could not delete songs successfully'
    }
    const playlist = await getPlaylist(playlistId)
    return playlist['songs']

}

const deleteSongsAcros = async(songId)=>{
    validation.checkObjectId(songId);
    const users = await userCollection();
    const deleteInfo = await users
        .updateMany(
            {
                //"playlist._id":new ObjectId(playlistId)
                "playlist.songs":songId
            },
            {$pull:{
                    //"playlist.$.songs":{"_id":songId}
                    "playlist.$.songs":songId
                }
            }
        )
    if (!deleteInfo.matchedCount&&!deleteInfo.modifiedCount){
        throw 'could not delete songs successfully'
    }
    return {deletion: true, songId}

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
        {$addToSet: {playlist: playlist}}
    );
    if (updateInfo.modifiedCount === 0) throw " Could not add playlist successfully "
    return playlist;
    };


const getAllPlaylist = async (userId) => {
<<<<<<< HEAD
=======
    //helper
    userId = userId.trim();
    validation.checkObjectId(userId)
>>>>>>> 3ea2681 (add features for playlist: delete and update)

    userId = userId.trim();
    validation.validateId(userId)
    const playlists = await userCollection();
    const allPlaylist = await playlists.find(
        {_id : ObjectId(userId)}, 
        {projection:{playlist:1, _id:0}}).toArray();
    if(allPlaylist.length == 0) throw " No playlist under this id "
    //if(allPlaylist[0].playlist.length == 0) throw " No playlist yet "
    //notice if user exist but no playlist situation
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
<<<<<<< HEAD
    const playlist = await getPlaylist(playlistId)
=======
    const playlist = getPlaylist(playlistId)
>>>>>>> 3ea2681 (add features for playlist: delete and update)
    return playlist
  
}
const getPlaylist = async (playlistId) => {
      validation.checkObjectId(playlistId)
      const users = await userCollection();
<<<<<<< HEAD
      const user = await users
      .findOne({
         'playlist._id': ObjectId(playlistId)
        },
        {projection:
          {_id:0,playlist:1}
        }
      )
      // findOne function returns a object have attribute of playlists
      // aggregate returns a cursor that needs furture implementations.
      // locate playlists by nested object playlists
      if (user == null) throw 'error: playlist not found';
      let result = {}
      let plist = user['playlist']
      for (let i = 0; i<plist.length; i++){
        if (plist[i]._id.toString() == playlistId){
          plist[i]._id = plist[i]._id.toString();
          result = plist[i]
          break
        }
      }    
      return result
=======
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
>>>>>>> 3ea2681 (add features for playlist: delete and update)
    };

module.exports = {
    createPlaylistObject,
    createPlaylist,
    getAllPlaylist,
    deletePlaylist,
    modifyPlaylist,
<<<<<<< HEAD
    getPlaylist,
    addSongs,
    deleteSongs,
    deleteSongsAcros
=======
    getPlaylist
>>>>>>> 3ea2681 (add features for playlist: delete and update)
}