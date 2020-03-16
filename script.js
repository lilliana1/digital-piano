// keyboard keys
const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];


// calling all keys
const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

keys.forEach(key => {
    key.addEventListener('click', () => playNote(key))
})

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

function playNote(key) {
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