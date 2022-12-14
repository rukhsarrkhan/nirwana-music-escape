const mongoCollections = require("../config/mongoCollections");
const userCollection = mongoCollections.user_collection;
// const bcrypt = require("bcrypt");
// const saltRounds = 8;
//const { isProperString, isPasswordValid, checkUserObject } = require("../helpers");
const validation = require('../helpers')
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const songsData = require('./songs');
const { mergeBatchResults } = require("mongodb/lib/bulk/common");

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
    let song = await songsData.getSongsById(songId)
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
        "playlist.$.songs":song
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
    const updateInfo = await users
    .findOneAndUpdate(
      {
        "playlist._id":new ObjectId(playlistId)
      },
      {$set:{
        "playlist.$.songs":1
      }
      }
      ,{returnDocument: 'after'}
    );

    if (!updateInfo.LastErrorObject.updatedExisting){
        throw 'could not delete songs successfully'
    }
    // const playlist = getPlaylist(playlistId)
    // return playlist
    return updateInfo.value.playlist
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
    return user['playlist'];
    };


const getAllPlaylist = async (userId) => {

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
    };

module.exports = {
    createPlaylistObject,
    createPlaylist,
    getAllPlaylist,
    deletePlaylist,
    modifyPlaylist,
    getPlaylist,
    addSongs,
    deleteSongs
}