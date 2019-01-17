var synth = window.speechSynthesis;



const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

var voices= [];

const getVoic=()=>{
  voices=synth.getVoices();
  console.log(voices);

  voices.forEach(voice=>{
    const option = document.createElement('option');

    option.textContent = voice.name+'('+voice.lang+')';

    option.setAttribute('data-lang',voice.lang);
    option.setAttribute('data-name',voice.name);
    voiceSelect.appendChild(option);
    });
};

getVoic();
if(speechSynthesis.onvoiceschanged !== undefined){
  speechSynthesis.onvoiceschanged = getVoic;
}

var speak = () =>{
  if(synth.speaking){
    console.log('Already speaking');
    return;
  }
  if(textInput.value !==''){
    body.style.background = '#141414 url(wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    var speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = e=>{
      console.log('Done Speaking...');
      body.style.background='#141414';
    }
    speakText.onerror = e=>{
      console.error('Something went wrong');
    }

    var selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

  };
  voices.forEach(voice=>{
    if(voice.name===selectedVoice){
      speakText.voice = voice;
    }
    })
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    synth.speak(speakText);
}

textForm.addEventListener('submit',e=>{
  e.preventDefault();
  speak();
  textInput.blur();
  })

  rate.addEventListener('change',e=>
    (rate.value.textContent = rate.value
    ));
  pitch.addEventListener('change',e=>
    (pitch.value.textContent = pitch.value
    ));

    voiceSelect.addEventListener('change',e=>speak());
