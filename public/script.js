// keyboard keys
const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];

let recordingStartTime;
let songNotes;

// calling btn to record
const recordButton = document.querySelector('.record-button');

// calling all keys
const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

keys.forEach(key => {
    key.addEventListener('click', () => playNote(key))
})

// listening when record btn is press
recordButton.addEventListener('click', toggleRecording)


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
}

function stopRecording(){
    playSong()
}

function playSong() {
    console.log(songNotes);
    
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
    noteAudio.addEventListener('ended', () =>  
    key.classList.remove('active')
    )
}

// recording the notes 
function recordNote(note) {
    // pushing new object into array
    songNotes.push({
        key: note,
        startTime: Date.now() - recordingStartTime
    })
}