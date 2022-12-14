const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const songs = data.gongs;
const playlist = data.playlist

async function main() {
  const db = await dbConnection.dbConnection();
  await db.dropDatabase();

  const newuserobj = {
    firstName: "sky",
    lastName: "Doe",
    userName: "skyone",
    password: "Abc123@)",
    role: "free",
    profileImage:"",
    phoneNumber:4561238899,
    playlist:[],
    likes:[]
  }
  const seeduser = await users.createUser(newuserobj);
  const id = seeduser._id.toString();

  const newplaylistobj ={
    playlistName: "newPlist",
    description: "new playlist for skyone",
    songs:[]   
  }
  await playlist.createPlaylist(id,newplaylistobj);

  const anotherplaylistobj = {
    playlistName: "anoPlist",
    description: "another playlist for skyone",
    songs:[]      
  }

  await playlist.createPlaylist(id,anotherplaylistobj);

  const newsongobj = {
    songName: "first song",
    songUrl: "some amazon url",
    genre: "Dancing song",
    artist: "Jack",
    createdAt: "12/10/2022"    
  }

  await songs.uploadSong(newsongobj);
  await songs.uploadSong(newsongobj);

  console.log('Done seeding database');

  await dbConnection.closeConnection();
}

main();