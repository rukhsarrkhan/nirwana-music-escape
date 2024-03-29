const dbConnection = require('./config/mongoConnection');
const data = require('./data/');
const users = data.usersData;
const songs = data.songsData;
const playlist = data.playlistsData;

async function main() {
  const db = await dbConnection.dbConnection();
  await db.dropDatabase();

  const newuserobj = {
    firstName: "sky",
    lastName: "Doe",
    userName: "skyone@gmail.com",
    password: "Abc123@)",
    role: "user",
    profileImage: "",
    phoneNumber: 4561238899,
    playlist: [],
    likes: []
  };

  const patrickObj = {
    firstName: "Patrick",
    lastName: "Hill",
    userName: "phill@stevens.edu",
    password: "Abc@12345",
    role: "admin",
    profileImage: "",
    phoneNumber: 4561238899,
    playlist: [],
    likes: []
  };
  const seeduser = await users.createUser(newuserobj);
  const patrickUser = await users.createUser(patrickObj);

  const id = seeduser._id.toString();

  const romanticsongs = [
    {
      _id: "639e99a025371c73bfc5a19f",
      songName: "88 Keys",
      songUrl: "https://nivana-music.s3.amazonaws.com/88 Keys.mp3",
      genre: "romance",
      artist: "eyeroze",
      createdAt: "12/15/2022"
    },
    {
      _id: "639e99bb25371c73bfc5a1a0",
      songName: "call",
      songUrl: "https://nivana-music.s3.amazonaws.com/call.mp3",
      genre: "romance",
      artist: "jinsang",
      createdAt: "12/15/2022"
    },
    {
      _id: "639e99fb25371c73bfc5a1a1",
      songName: "Beauty",
      songUrl: "https://nivana-music.s3.amazonaws.com/Beauty.mp3",
      genre: "romance",
      artist: "eyeroze",
      createdAt: "12/15/2022"
    },
    {
      _id: "639e9a1025371c73bfc5a1a2",
      songName: "Again",
      songUrl: "https://nivana-music.s3.amazonaws.com/Again.mp3",
      genre: "romance",
      artist: "craymer",
      createdAt: "12/15/2022"
    }
  ];

  for (let i = 0; i < romanticsongs.length; i++) {
    await songs.seedSongs(romanticsongs[i]);
  }

  const hiphopsongs = [
    {
      _id: "639e9a3625371c73bfc5a1a3",
      songName: "First Heartbreak",
      songUrl: "https://nivana-music.s3.amazonaws.com/First Heartbreak.mp3",
      genre: "hip hop",
      artist: "jin",
      createdAt: "12/15/2022"
    },
    {
      _id: "639e9a5225371c73bfc5a1a4",
      songName: "Alone and Lonely",
      songUrl: "https://nivana-music.s3.amazonaws.com/Alone and Lonely.mp3",
      genre: "hip hop",
      artist: "Rufi-O",
      createdAt: "12/15/2022"
    },
    {
      _id: "639e9a6625371c73bfc5a1a5",
      songName: "Backpack City",
      songUrl: "https://nivana-music.s3.amazonaws.com/Backpack City.mp3",
      genre: "hip hop",
      artist: "Rufi-O",
      createdAt: "12/15/2022"
    }
  ];
  for (let i = 0; i < hiphopsongs.length; i++) {
    await songs.seedSongs(hiphopsongs[i]);
  }

  const operasongs = [
    {
      _id: "639e9ade25371c73bfc5a1a6",
      songName: "5 32pm",
      songUrl: "https://nivana-music.s3.amazonaws.com/5 32pm.mp3",
      genre: "opera",
      artist: "The Deli",
      createdAt: "12/15/2022"
    },
    {
      _id: "639e9afc25371c73bfc5a1a7",
      songName: "Brightness",
      songUrl: "https://nivana-music.s3.amazonaws.com/Brightness.mp3",
      genre: "opera",
      artist: "Llusion",
      createdAt: "12/15/2022"
    },
    {
      _id: "639e9b4625371c73bfc5a1a8",
      songName: "Can We Kiss Forever ",
      songUrl: "https://nivana-music.s3.amazonaws.com/Can We Kiss Forever .mp3",
      genre: "opera",
      artist: "junyii",
      createdAt: "12/15/2022"
    }
  ];
  for (let i = 0; i < operasongs.length; i++) {
    await songs.seedSongs(operasongs[i]);
  }

  // const kpopsongs = [
  //   {
  //     _id: "639e9b6a25371c73bfc5a1a9",
  //     songName: "Backpack City",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/Backpack City.mp3",
  //     genre: "k-pop",
  //     artist: "Flovry",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b748a04a2e5746d5afec7",
  //     songName: "Night Walk",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/Night Walk.mp3",
  //     genre: "k-pop",
  //     artist: "xander",
  //     createdAt: "12/15/2022"
  //   }
  // ];
  // for (let i = 0; i < kpopsongs.length; i++) {
  //   await songs.seedSongs(kpopsongs[i]);
  // }

  // const newplaylistobj = {
  //   playlistName: "newPlist",
  //   description: "new playlist for skyone",
  //   songs: ["639e9a6625371c73bfc5a1a5", "639e9ade25371c73bfc5a1a6"]
  // };
  // await playlist.createPlaylist(id, newplaylistobj);

  // const anotherplaylistobj = {
  //   playlistName: "anoPlist",
  //   description: "another playlist for skyone",
  //   songs: ["639e9a6625371c73bfc5a1a5", "639e9a3625371c73bfc5a1a3", "639e99bb25371c73bfc5a1a0"]
  // };

  // await playlist.createPlaylist(id, anotherplaylistobj);


  console.log('Done seeding database');

  await dbConnection.closeConnection();
}

main();