// Data for your songs (mimicking a JSON file or simple database) [cite: 1, 24, 29, 30, 32, 34, 35, 36]
const songs = [
    {
        title: "New Rules",
        artist: "Dua Lipa",
        filePath: "songs/NewRules.mp3", // Make sure this path is correct
        albumImage: "images/newrules.jpg", // Make sure this path is correct
        isFavorite: false
    },
    {
        title: "Stay",
        artist: "Justin Bieber",
        filePath: "songs/Stay.mp3",
        albumImage: "images/stay.jpg",
        isFavorite: false
    },
    // Add 8-13 more songs here to meet the 10-15 song requirement [cite: 1, 11]
    {
        title: "Dance the Night",
        artist: "Dua Lipa",
        filePath: "songs/DanceTheNight.mp3",
        albumImage: "images/dancethenightaway.jpg",
        isFavorite: false
    },
	{
	        title: "I Really Like You",
	        artist: "Carly Rae",
	        filePath: "songs/IReallyLikeU.mp3",
	        albumImage: "images/ireallylikeu.jpg",
	        isFavorite: false
	    },
		{
			        title: "It Aint My Fault",
			        artist: "Zara Larrson",
			        filePath: "songs/ItAintMyFault.mp3",
			        albumImage: "images/itaintmyfault.jpg",
			        isFavorite: false
	     },
		{
					        title: "Genie in the Bottle",
					        artist: "Dove Cameron",
					        filePath: "songs/GenieInTheBottle.mp3",
					        albumImage: "images/gitb.jpg",
					        isFavorite: false
		},
		{
				title: "Ready or Not",
			  artist: "Bridgit Mendler",
			  filePath: "songs/ReadyorNot.mp3",
			 albumImage: "images/readyornot.jpg",
			isFavorite: false
		},
		{
			 title: "Glowing In the Dark",
			 artist: "Girl And The DreamCatcher",
			 filePath: "songs/GlowingInTheDark.mp3",
			 albumImage: "images/gitd.jpg",
			 isFavorite: false
		},
																
		{
			title: "Written In Stars",
			 artist: "Girl And The DreamCatcher",
			filePath: "songs/WrittenInStars.mp3",
			 albumImage: "images/wis.jpg",
			isFavorite: false
		 },
		 {
		 			title: "Stay",
		 			 artist: "Girl And The DreamCatcher",
		 			filePath: "songs/StayGD.mp3",
		 			 albumImage: "images/staygadt.jpg",
		 			isFavorite: false
		 		 },
				 {
				 			title: "Way Back Home",
				 			 artist: "SHAUN",
				 			filePath: "songs/Way Back Home.mp3",
				 			 albumImage: "images/wbh.jpg",
				 			isFavorite: false
				 		 },
			 {
				title: "Butter",
				 artist: "BTS",
				filePath: "songs/Butter.mp3",
				albumImage: "images/butter.jpg",
				isFavorite: false
				 },
		
	
];

// Get references to HTML elements 
const audio = new Audio(); // The HTML5 Audio API object [cite: 1, 48]
let currentSongIndex = 0;
let isPlaying = false;

const albumArt = document.getElementById("album-art");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const prevBtn = document.getElementById("prev-btn");
const playPauseBtn = document.getElementById("play-pause-btn");
const nextBtn = document.getElementById("next-btn");
const volumeSlider = document.getElementById("volume-slider");
const seekSlider = document.getElementById("seek-slider");
const currentTimeSpan = document.getElementById("current-time");
const totalDurationSpan = document.getElementById("total-duration");
const playlistUl = document.getElementById("playlist");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const voiceSearchButton = document.getElementById("voice-search-button"); // For optional voice search
const recentlyPlayedUl = document.getElementById("recently-played-list");
const favoritesUl = document.getElementById("favorites-list");
const nowPlayingDetails = document.getElementById("now-playing-details"); // For optional "Now Playing"
const visitorCounterValue = document.getElementById("counter-value"); // For optional visitor counter

let recentlyPlayed = JSON.parse(localStorage.getItem("recentlyPlayed")) || []; // Load from local storage [cite: 1, 37]
let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Load from local storage [cite: 1, 37]

// Function to load a song 
function loadSong(songIndex) {
    const song = songs[songIndex];
    audio.src = song.filePath;
    albumArt.src = song.albumImage;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    // Update "Now Playing" section (optional) [cite: 1, 44]
    if (nowPlayingDetails) {
        nowPlayingDetails.textContent = `${song.title} - ${song.artist}`;
    }

    // Add to recently played (ensure no duplicates or limit size) [cite: 1, 13, 26, 37]
    const songId = song.title + song.artist; // A simple unique ID
    if (!recentlyPlayed.some(item => item.title + item.artist === songId)) {
        recentlyPlayed.unshift(song); // Add to the beginning
        // Optional: Limit the size of recentlyPlayed array
        if (recentlyPlayed.length > 20) { // e.g., keep last 20
            recentlyPlayed.pop();
        }
        localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
        renderRecentlyPlayed();
    }
}

// Function to play or pause 
function playPauseSong() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = "Play";
    } else {
        audio.play();
        playPauseBtn.textContent = "Pause";
    }
    isPlaying = !isPlaying;
}

// Function for next song 
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();
    }
}

// Function for previous song 
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();
    }
}

// Update seek bar and current time [cite: 1, 9, 10]
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    seekSlider.value = progress;

    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds}`;
});

// Update total duration when metadata is loaded 
audio.addEventListener("loadedmetadata", () => {
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
    totalDurationSpan.textContent = `${totalMinutes}:${totalSeconds}`;
});

// Seek functionality 
seekSlider.addEventListener("input", () => {
    const seekTime = (seekSlider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Volume control 
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

// Autoplay next song when current one ends [cite: 1, 25]
audio.addEventListener("ended", () => {
    nextSong();
});

// Render playlist 
function renderPlaylist(filterText = "") {
    playlistUl.innerHTML = "";
    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(filterText.toLowerCase()) ||
        song.artist.toLowerCase().includes(filterText.toLowerCase())
    );

    filteredSongs.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${song.albumImage}" alt="Album Art" style="width: 30px; height: 30px; vertical-align: middle; margin-right: 10px;">
            ${song.title} - ${song.artist}
            <button class="favorite-btn" data-song-id="${song.title}-${song.artist}">
                ${favorites.some(fav => fav.title === song.title && fav.artist === song.artist) ? '❤️' : '🤍'}
            </button>
        `;
        li.addEventListener("click", (event) => {
            // Prevent button click from triggering song play
            if (!event.target.classList.contains('favorite-btn')) {
                currentSongIndex = songs.indexOf(song); // Find original index
                loadSong(currentSongIndex);
                playPauseSong();
            }
        });
        playlistUl.appendChild(li);
    });

    // Attach favorite button listeners after rendering
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', toggleFavorite);
    });
}

// Render recently played songs [cite: 1, 13, 37]
function renderRecentlyPlayed() {
    recentlyPlayedUl.innerHTML = "";
    recentlyPlayed.forEach(song => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        // Make them clickable to replay
        li.addEventListener("click", () => {
            const originalIndex = songs.findIndex(s => s.title === song.title && s.artist === song.artist);
            if (originalIndex !== -1) {
                currentSongIndex = originalIndex;
                loadSong(currentSongIndex);
                playPauseSong();
            }
        });
        recentlyPlayedUl.appendChild(li);
    });
}

// Toggle favorite status [cite: 1, 14, 26, 37]
function toggleFavorite(event) {
    const button = event.target;
    const songId = button.dataset.songId;
    const [title, artist] = songId.split('-');
    const songToToggle = songs.find(s => s.title === title && s.artist === artist);

    if (songToToggle) {
        const favIndex = favorites.findIndex(fav => fav.title === title && fav.artist === artist);
        if (favIndex === -1) {
            favorites.push(songToToggle);
            button.textContent = '❤️';
        } else {
            favorites.splice(favIndex, 1);
            button.textContent = '🤍';
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
    }
    // Re-render playlist to update heart icons
    renderPlaylist(searchInput.value);
}

// Render favorites [cite: 1, 14, 37]
function renderFavorites() {
    favoritesUl.innerHTML = "";
    favorites.forEach(song => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${song.albumImage}" alt="Album Art" style="width: 30px; height: 30px; vertical-align: middle; margin-right: 10px;">
            ${song.title} - ${song.artist}
            <button class="favorite-btn" data-song-id="${song.title}-${song.artist}">❤️</button>
        `;
        // Make them clickable to replay
        li.addEventListener("click", (event) => {
            if (!event.target.classList.contains('favorite-btn')) {
                const originalIndex = songs.findIndex(s => s.title === song.title && s.artist === song.artist);
                if (originalIndex !== -1) {
                    currentSongIndex = originalIndex;
                    loadSong(currentSongIndex);
                    playPauseSong();
                }
            }
        });
        favoritesUl.appendChild(li);
    });

    // Attach favorite button listeners to new elements
    document.querySelectorAll('.favorites-section .favorite-btn').forEach(button => {
        button.addEventListener('click', toggleFavorite);
    });
}


// Search functionality 
searchInput.addEventListener("input", (event) => {
    renderPlaylist(event.target.value);
});

searchButton.addEventListener("click", () => {
    renderPlaylist(searchInput.value);
});


// Optional: Voice Search [cite: 1, 15]
voiceSearchButton.addEventListener('click', () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            renderPlaylist(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            alert('Speech recognition failed. Please try again or type your search.');
        };
    } else {
        alert('Voice search is not supported in your browser.');
    }
});


// Optional: Visitor Counter [cite: 1, 45]
function updateVisitorCounter() {
    let visitorCount = parseInt(localStorage.getItem('visitorCount')) || 0;
    visitorCount++;
    localStorage.setItem('visitorCount', visitorCount);
    if (visitorCounterValue) {
        visitorCounterValue.textContent = visitorCount;
    }
}


// Initial setup when the page loads
document.addEventListener("DOMContentLoaded", () => {
    loadSong(currentSongIndex);
    renderPlaylist();
    renderRecentlyPlayed();
    renderFavorites();
    updateVisitorCounter(); // Call for visitor counter
});


// Event Listeners for controls 
playPauseBtn.addEventListener("click", playPauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);