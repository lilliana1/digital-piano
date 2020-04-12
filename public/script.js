// keyboard keys
const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];

// calling btn to record
const recordButton = document.querySelector('.record-button');

const playButton = document.querySelector('.play-button');
const saveButton = document.querySelector('.save-button');


// calling all keys
const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

// conversion of notes, it will return new object 
const keyMap = [...keys].reduce((map, key) => {
    map[key.dataset.note] = key
    return map
}, {})


let recordingStartTime;
let songNotes;



// 

keys.forEach(key => {
    key.addEventListener('click', () => playNote(key))
})

if (recordButton) {
    // listening when record btn is press, it will record
    recordButton.addEventListener('click', toggleRecording)
}

if(saveButton) {
    // listening when record btn is press, it will save song
    saveButton.addEventListener('click', saveSong)
}

if (playButton) {
    // listening when play btn is press, it will play song
    playButton.addEventListener('click', playSong)
}

// allow to play audio when computer keyboard is press
document.addEventListener('keydown', e => {
    // when key is press it wont sound horrible, it will sound good
    if (e.repeat) return
    const key = e.key
    const whiteKeyIndex = WHITE_KEYS.indexOf(key)
    const blackKeyIndex = BLACK_KEYS.indexOf(key)

    if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
    if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
})

// function of btn to change when is press and calling function to actually record 
function toggleRecording() {
    recordButton.classList.toggle('active')
    if (isRecording()) {
        startRecording()
    } else {
        stopRecording()
    }
}

// if record btn exits and is active, we will start recording
function isRecording() {
    return recordButton != null && recordButton.classList.contains('active')
}

// actually start recording
function startRecording() {
    recordingStartTime = Date.now()
    songNotes = []
        // this will hide play button
        playButton.classList.remove('show')
        // this will hide save button
        saveButton.classList.remove('show')
}

function stopRecording(){
    playSong()
    // this will show play button
    playButton.classList.add('show')
    // this will show save button
    saveButton.classList.add('show')

}
// check if we have any song notes 
function playSong() {
    if (songNotes.length === 0) return
    songNotes.forEach(note => {
        setTimeout(() => {
            playNote(keyMap[note])
        }, note.startTime)
    })    
}

function playNote(key) {
    // if we are in the process of recording, we want to record our notes
    if (isRecording()) recordNote(key.dataset.note)
    // calling all mp3 files
    const noteAudio = document.getElementById(key.dataset.note)
    // plays key as you press
    noteAudio.currentTime = 0
    noteAudio.play()
    // animation to know which key is pressed
    key.classList.add('active')
    // remove active class when note is done playing (audio is finish playing)
    noteAudio.addEventListener('ended', () =>  {
        key.classList.remove('active') 
    })
}

// recording the notes 
function recordNote(note) {
    // pushing new object into array
    songNotes.push({
        key: note,
        startTime: Date.now() - recordingStartTime
    })
}

// saving the song async function
function saveSong() {
    axios.post('/songs', { songNotes: songNotes }).then(res 
        => {
            console.log(res.data._id)
        })
}