const mongoCollections = require("../config/mongoCollections");
const moment = require('moment');
const { ObjectId } = require('mongodb');
const { HttpRequest } = require("@aws-sdk/protocol-http");
const { S3RequestPresigner } = require("@aws-sdk/s3-request-presigner");
const { Sha256 } = require("@aws-crypto/sha256-browser");
const { parseUrl } = require("@aws-sdk/url-parser");
const { Hash } = require("@aws-sdk/hash-node");
const { formatUrl } = require("@aws-sdk/util-format-url");
const axios = require('axios');
const songs = mongoCollections.songs_collection;
const Path = require('path');

const { inputStringValidation } = require("../helpers");

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  // accessKeyId: process.env.AWS_ACCESS_KEY,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: "AKIA46ESQPY7OMW7MQ4B",
  secretAccessKey: "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"
});

const getSongsById = async (id) => {
  inputStringValidation(id, "id");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw 'Invalid object ID';
  }
  const songsCollection = await songs();
  const song = await songsCollection.findOne({ _id: ObjectId(id) });
  if (song === null) {
    throw 'No Song found with that id';
  }
  const newId = song._id.toString();
  song._id = newId;
  return song;
};

const uploadFile = async (file, fileName) => {
  console.log("file", file);
  const params = {
    Bucket: 'nivana-music', // pass your bucket name
    Key: fileName + ".mp3", // file will be saved as testBucket/contacts.csv
    Body: file
  };
  // call S3 to retrieve upload file to specified bucket
  return s3.upload(params, function (err, data) {
    if (err) {
      console.log("Error", err);
      throw err;
    } if (data) {
      console.log("Upload Success", data.Location);
      return data.Location;
    }
  });
};


const uploadSong = async (obj) => {
  // TO DO: add obj validation
  const songsCollection = await songs();
  const song = await songsCollection.findOne({ songName: obj.songName });
  console.log(song, "songName");
  if (song !== null) {
    throw 'song already exists';
  }
  const s3ReturnObj = await uploadFile(obj.song, obj.songName);
  console.log("s3ReturnObj", s3ReturnObj);
  const today = moment(new Date()).format("MM/DD/YYYY");

  const songUrl = "https://" + "nivana-music" + ".s3.amazonaws.com/" + obj.songName + ".mp3";

  let newSong = {
    songName: obj.songName,
    songUrl: songUrl,
    genre: obj.genre,
    artist: obj.artist,
    createdAt: today
  };

  const insertInfo = await songsCollection.insertOne(newSong);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw 'Could not add movie';
  }
  const newId = insertInfo.insertedId.toString();
  newSong._id = newId;
  return newSong;
};


const seedSongs = async (obj) => {
  const today = moment(new Date()).format("MM/DD/YYYY");
  let newSong = {
    songName: obj.songName,
    songUrl: obj.songUrl,
    genre: obj.genre,
    artist: obj.artist,
    createdAt: today
  };
  const songsCollection = await songs();

  const insertInfo = await songsCollection.insertOne(newSong);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw 'Could not add movie';
  }
  const newId = insertInfo.insertedId.toString();
  newSong._id = newId;
  return newSong;
};

const fetchSongs = async (sort_by) => {
  // TO DO: add sort_by validation
  const songsCollection = await songs();
  let songList = await songsCollection.find({}).sort({ sort_by: 1 }).toArray();
  if (!songList) {
    throw 'Could not get all songs';
  }
  const returndata = {};
  console.log(sort_by);
  if (typeof sort_by === "undefined") return songList;
  songList.forEach(song => {
    song._id = song._id.toString();
    if (returndata[song[sort_by]] === undefined) returndata[song[sort_by]] = [];
    returndata[song[sort_by]].push(song);
  });

  return returndata;
};

const fetchSongForPlaylistForm = async () => {
  const songsCollection = await songs();
  let songList = await songsCollection.find({}).toArray();
  if (!songList) {
    throw 'Could not get all songs';
  }
  const returndata = [];

  songList.forEach(song => {
    song._id = song._id.toString();
    let newSong = { label: song.songName, value: song._id };
    returndata.push(newSong);
  });

  return returndata;
};

const generatePresignedURL = async (path) => {
  const bucket = "nivana-music";
  const region = "us-east-1";
  const credentials = {
    accessKeyId: "AKIA46ESQPY7OMW7MQ4B",
    secretAccessKey: "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"
  };
  const s3ObjectUrl = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${path}.mp3`);
  console.log("s3ObjectUrl", s3ObjectUrl);
  const presigner = new S3RequestPresigner({
    credentials,
    region,
    sha256: Hash.bind(null, "sha256"), // In Node.js
    //sha256: Sha256 // In browsers
  });
  console.log("presigner", presigner);
  // Create a GET request from S3 url.
  const url = await presigner.presign(new HttpRequest(s3ObjectUrl));
  console.log("url", formatUrl(url));
  return formatUrl(url);

};
const fetchSong = async (id) => {
  inputStringValidation(id, "id");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw 'Invalid Object ID';
  }
  const data = await getSongsById(id);
  console.log("data", data);
  const data2 = await generatePresignedURL(data.songName);
  // const response = await axios.get(data2);
  // const response = await axios({
  //   url: data2,
  //   method: 'GET',
  //   responseType: 'arraybuffer',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'mp3'
  //   }

  // })
  console.log(data2);
  return data2;
};

const deleteSong = async (id) => {
  inputStringValidation(id, "id");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw 'Invalid Object ID';
  }
  const songsCollection = await songs();
  const songToBeRemoved = await getSongsById(id);
  const songDeleted = await songsCollection.deleteOne({ _id: ObjectId(id) });
  if (songDeleted.deletedCount === 0) {
    throw `Could not delete song with id of ${id}`;
  }
  return songToBeRemoved.title + " has been successfully deleted!";
};



module.exports = {
  uploadSong,
  fetchSongs,
  deleteSong,
  fetchSong,
  getSongsById,
  seedSongs,
  fetchSongForPlaylistForm
};

// add validations
// check how from ui file upload
// move s3 stuff to env file 
// get song from s3
// add restrictiosn to s3
// if key will expire ?
// check for privicing