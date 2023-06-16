const { Tone } = require('tone/build/esm/core/Tone')
const playBTN = document.getElementById('play-btn')

const synth = new Tone.synth().toDestination()

playBTN.addEventListener('click', () => {
  if (Tone.context.state !== 'running') {
    Tone.start()
  }
  synth.triggerAttackRelease('C3', '8n')
})
