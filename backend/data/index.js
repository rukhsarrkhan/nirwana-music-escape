//Here you will require data files and export them as shown in lecture code and worked in previous labs.
const usersData = require('./users');
const playlistsData = require('./playlist')
const songsData = require('./songs');
module.exports = {
	usersData: usersData,
	playlistsData: playlistsData, 
	songsData: songsData
};
