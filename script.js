// Song Data
const songs = [
    { name: "Song 1", src: "pop1.mp3", category: "Pop" },
    { name: "Song 2", src: "rock.mp3", category: "Rock" },
    { name: "Song 3", src: "jazz.mp3", category: "Jazz" },
    { name: "Song 4", src: "pop2.mp3", category: "Pop" },
];

// DOM Elements
const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const songName = document.getElementById("song-name");
const playlistContainer = document.getElementById("playlist");
const searchBar = document.getElementById("search-bar");
const volumeControl = document.getElementById("volume");

// Variables
let currentSongIndex = 0;

// Initialize Playlist
function loadPlaylist(filteredSongs = songs) {
    playlistContainer.innerHTML = "";
    filteredSongs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.name} (${song.category})`;
        li.dataset.index = index;
        li.addEventListener("click", () => loadSong(index));
        playlistContainer.appendChild(li);
    });
}

// Load a Song
function loadSong(index) {
    currentSongIndex = index;
    const song = songs[currentSongIndex];
    audioPlayer.src = song.src;
    songName.textContent = `Now Playing: ${song.name}`;
    playSong();
}

// Play and Pause Functions
function playSong() {
    audioPlayer.play();
}

function pauseSong() {
    audioPlayer.pause();
}

// Next and Previous Song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex =
        (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

// Search Functionality
searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    const filteredSongs = songs.filter(
        (song) =>
            song.name.toLowerCase().includes(query) ||
            song.category.toLowerCase().includes(query)
    );
    loadPlaylist(filteredSongs);
});

// Volume Control
volumeControl.addEventListener("input", () => {
    audioPlayer.volume = volumeControl.value;
});

// Event Listeners for Controls
playBtn.addEventListener("click", playSong);
pauseBtn.addEventListener("click", pauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Initialize App
loadPlaylist();
loadSong(0);
