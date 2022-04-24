console.log('spotify clone')

// Initialize the variables
let songIndex = 1;
let audioElement = new Audio('songs/1.mp3');
let previousButton = document.getElementById('previousButton');
let playButton = document.getElementById('playButton');
let nextButton = document.getElementById('nextButton');
let songCoverImage = document.getElementById('songCoverImg')
let songNameDisplay = document.getElementById('songNameDisplay');
let songPlayBtn = Array.from(document.getElementsByClassName('songPlay')); //converting from HTML collection to array collection
console.log(playButton)

let songs = [
    {songName: "Peaches", coverPath: "https://i.scdn.co/image/ab67616d0000b2736036cfd2a718036fc523855f"},
    {songName: "Levitating", coverPath: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946"},
    {songName: "Good Days", coverPath: "https://i.scdn.co/image/ab67616d0000b2733097b1375ab17ae5bf302a0a"},
    {songName: "Heat Waves", coverPath: "https://i.scdn.co/image/ab67616d0000b273ab9d1ae18b640b7b0ce390d4"},
    {songName: "Love Nwantiti", coverPath: "https://i.scdn.co/image/ab67616d0000b273405fdad252857e01dbced96a"},
    {songName: "Happier Than Ever", coverPath: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e"},
    {songName: "Stay", coverPath: "https://i.scdn.co/image/ab67616d0000b27341e31d6ea1d493dd77933ee5"},
    {songName: "Like A Ghost", coverPath: "https://i.scdn.co/image/ab67616d0000b2731ebfac62cb6e00637d957062"},
    {songName: "Cheating On You", coverPath: "https://i.scdn.co/image/ab67616d00001e02897f73256b9128a9d70eaf66"},
    {songName: "Play Date", coverPath: "https://i.scdn.co/image/ab67616d0000b2733899712512f50a8d9e01e951"},
]

//Play & Pause the music
playButton.addEventListener('click', function () {
    if (audioElement.paused){
        audioElement.play();
        playButton.classList.remove('fa-circle-play');
        playButton.classList.add('fa-circle-pause');
        makeAllPlays();
        songPlayBtn[songIndex-1].classList.remove('fa-circle-play');
        songPlayBtn[songIndex-1].classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        playButton.classList.remove('fa-circle-pause');
        playButton.classList.add('fa-circle-play');
        makeAllPlays();
        songPlayBtn[songIndex-1].classList.remove('fa-circle-pause');
        songPlayBtn[songIndex-1].classList.add('fa-circle-play');
    }
})

const makeAllPlays = ()=> {
    songPlayBtn.forEach(element => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

songPlayBtn.forEach(element => {
    element.addEventListener('click', function(e) {
        makeAllPlays();
        songIndex = e.target.id;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex}.mp3`;
        songCoverImage.src = songs[songIndex-1].coverPath;
        songNameDisplay.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play()
        playButton.classList.remove('fa-circle-play');
        playButton.classList.add('fa-circle-pause');
    })
});

//This will perform user press the previous button
previousButton.addEventListener('click', function(){
    if(songIndex <= 1){
        songIndex = 1;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    songCoverImage.src = songs[songIndex-1].coverPath;
    songNameDisplay.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play()
    playButton.classList.remove('fa-circle-play');
    playButton.classList.add('fa-circle-pause');
    makeAllPlays();
    songPlayBtn[songIndex-1].classList.remove('fa-circle-play');
    songPlayBtn[songIndex-1].classList.add('fa-circle-pause');
})

//This will perform user press the next button
nextButton.addEventListener('click', function(){
    if(songIndex >= 10){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    songCoverImage.src = songs[songIndex-1].coverPath;
    songNameDisplay.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play()
    playButton.classList.remove('fa-circle-play');
    playButton.classList.add('fa-circle-pause');
    makeAllPlays();
    songPlayBtn[songIndex-1].classList.remove('fa-circle-play');
    songPlayBtn[songIndex-1].classList.add('fa-circle-pause');
})

//update seekbar
// The timeupdate event is fired when the time indicated by the currentTime attribute has been updated.
audioElement.addEventListener('timeupdate', function(){
    songProgess = (audioElement.currentTime/audioElement.duration)*100;
    songProgressBar.value = songProgess;
})

songProgressBar.addEventListener('change', function(){
    audioElement.currentTime = songProgressBar.value * audioElement.duration/100;
})