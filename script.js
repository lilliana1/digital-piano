// calling all keys
const keys = document.querySelectorAll('.key')

keys.forEach(key => {
    key.addEventListener('click', () => playNote(key))
})

function playNote(key) {
    // calling all mp3 files
    const noteAudio = document.getElementById(key.dataset.note)
    // plays key as you press
    noteAudio.currentTime = 0
    noteAudio.play()
    // animation to know which key is pressed
    key.classList.add('active')
}