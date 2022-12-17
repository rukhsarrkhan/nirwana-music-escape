const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const users = data.usersData;
const playlist = data.playlistsData
const songs = data.songsData;

async function main() {
  const db = await dbConnection.dbConnection();
  await db.dropDatabase();
  let useridArray = []
  const newuserobj = [{
    firstName: "Sky",
    lastName: "Doe",
    userName: "skyone",
    password: "Abc123@)",
    role: "free",
    profileImage:"",
    phoneNumber:4561238899,
    playlist:[],
    likes:[]
  },
{
  firstName: "Water",
  lastName: "Smith",
  userName: "water",
  password: "bcD456@",
  role: "free",
  profileImage:"",
  phoneNumber:4531226849,
  playlist:[],
  likes:[]
},
{
  firstName: "Mary",
  lastName: "White",
  userName: "mary",
  password: "bfD4336@",
  role: "paid",
  profileImage:"",
  phoneNumber:2531726849,
  playlist:[],
  likes:[]
}
]
  for(let i = 0; i<newuserobj.length, i++;){
  const seeduser = await users.createUser(newuserobj[i]);
  const id = seeduser._id.toString();
    useridArray.push(id)
  }
  
  const newplaylistobj =[{
    playlistName: "newPlist",
    description: "new playlist for first",
    songs:[]   
  },
  {
    playlistName: "anoPlist",
    description: "another playlist for second",
    songs:[]      
  },
  {
    playlistName: "otherPlist",
    description: "another playlist for third",
    songs:[]    
  }
]


for (let k = 0; k <useridArray.length; k++){

  for (let i = 0; i<newplaylistobj.length;i++){
    await playlist.createPlaylist(useridArray[k],newplaylistobj[i]);

  }
}


  



  // const newsongobj = {
  //   songName: "first song",
  //   songUrl: "some amazon url",
  //   genre: "Dancing song",
  //   artist: "Jack",
  //   createdAt: "12/10/2022"    
  // }

  // const romanticsongs=[
  //   {
  //     _id: "639b583d07587920807ebb57",
  //     songName: "Nostalgia",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/Nostalgia.mp3",
  //     genre: "romance",
  //     artist: "eyeroze",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b5cffd07d84f56caca2ca",
  //     songName: "affection",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/affection.mp3",
  //     genre: "romance",
  //     artist: "jinsang",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b731404a2e5746d5afec5",
  //     songName: "Beauty.mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/Beauty.mp3.mp3",
  //     genre: "romance",
  //     artist: "eyeroze",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b9d515f95f8d7c3f9dda7",
  //     songName: "Can't Take My Eyes off You.mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/Can't Take My Eyes off You.mp3.mp3",
  //     genre: "romance",
  //     artist: "craymer",
  //     createdAt: "12/15/2022"
  //   }
  // ]

  // for(let i=0; i<romanticsongs.length; i++){
  //   await songs.seedSongs(romanticsongs[i])
  // }
   
  // const hiphopsongs=[
  //   {
  //     _id: "639b623b286a9c3f1518af9c",
  //     songName: "orries",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/orries.mp3",
  //     genre: "hip hop",
  //     artist: "jin",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b74e204a2e5746d5afec8",
  //     songName: "Oblivion.mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/Oblivion.mp3.mp3",
  //     genre: "hip hop",
  //     artist: "Rufi-O",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b9cc75f95f8d7c3f9dda6",
  //     songName: "Happiness.mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/Happiness.mp3.mp3",
  //     genre: "hip hop",
  //     artist: "eyeroze",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b9da85f95f8d7c3f9dda8",
  //     songName: "infinity.mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/infinity.mp3.mp3",
  //     genre: "hip hop",
  //     artist: "Oatmello",
  //     createdAt: "12/15/2022"
  //   }
  // ]
  // for(let i=0; i<hiphopsongs.length; i++){
  //   await songs.seedSongs(hiphopsongs[i])
  // }

  // const operasongs=[
  //   {
  //     _id: "639b71ec04a2e5746d5afec2",
  //     songName: "5 32pm.mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/5 32pm.mp3.mp3",
  //     genre: "opera",
  //     artist: "The Deli",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b740d04a2e5746d5afec6",
  //     songName: "Day in Paris.mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/Day in Paris.mp3.mp3",
  //     genre: "opera",
  //     artist: "Llusion",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b9de75f95f8d7c3f9dda9",
  //     songName: "drift....mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/drift....mp3.mp3",
  //     genre: "opera",
  //     artist: "junyii",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b9e235f95f8d7c3f9ddaa",
  //     songName: "nagashi.mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/nagashi.mp3.mp3",
  //     genre: "opera",
  //     artist: "idealism",
  //     createdAt: "12/15/2022"
  //   }
  // ]
  // for(let i=0; i<operasongs.length; i++){
  //   await songs.seedSongs(operasongs[i])
  // }

  // const kpopsongs=[
  //   {
  //     _id: "639b727504a2e5746d5afec3",
  //     songName: "Backpack City.mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/Backpack City.mp3.mp3",
  //     genre: "k-pop",
  //     artist: "Flovry",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b748a04a2e5746d5afec7",
  //     songName: "Night Walk.mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/Night Walk.mp3.mp3",
  //     genre: "k-pop",
  //     artist: "xander",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b9e625f95f8d7c3f9ddab",
  //     songName: "my new love.mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/my new love.mp3.mp3",
  //     genre: "k-pop",
  //     artist: "Elijah Woh",
  //     createdAt: "12/15/2022"
  //   },
  //   {
  //     _id: "639b9ea25f95f8d7c3f9ddac",
  //     songName: "Your Voice.mp3",
  //     songUrl: "https://nivana-music.s3.amazonaws.com/Your Voice.mp3.mp3",
  //     genre: "k-pop",
  //     artist: "Monty Datta",
  //     createdAt: "12/15/2022"
  //   }
  // ]
  // for(let i=0; i<kpopsongs.length; i++){
  //   await songs.seedSongs(kpopsongs[i])
  // }
  // await songs.seedSongs(newsongobj);
  

  console.log('Done seeding database');

  await dbConnection.closeConnection();
}

main();