let btn = document.querySelector('#btn');
let content = document.querySelector('#content');

let voice = document.querySelector('#voice');

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);

}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("GOOD MORNING mam");
    } else if (hours >= 12 && hours < 16) {
        speak("GOOD AFTERNOON Mam");
    } else {
        speak("good evening Mam");
    }

};
window.addEventListener('load', () => {
    wishMe()
});

let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

let recognition = new speechRecognition();
recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takecommand(transcript);
};
btn.addEventListener('click', () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takecommand(msg) {
    btn.style.display = "flex";
    voice.style.display = "none";
    if (msg.includes("hello") || msg.includes("hey")) {
        speak("Hello Mam,What Can I help you")
    }
    else if (msg.includes("who are you")) {
        speak("I am virtual Assistant ,created by Tanisha Sharma");
    }
    else if (msg.includes("open YouTube")) {
        speak("opening youtube");
        window.open("https://www.youtube.com/", "_blank");
    }
    else if (msg.includes("open Google")) {
        speak("opening google");
        window.open("https://google.com/", "_blank");
    }
    else if (msg.includes("open Facebook")) {
        speak("opening facebook");
        window.open("https://facebook.com/", "_blank");
    }
    else if (msg.includes("open Instagram")) {
        speak("opening instagram");
        window.open("https://instagram.com/", "_blank");
    } else if (msg.includes("open calculator")) {
        speak("opening calculator");
        window.open("calculator://");
    }
    else if (msg.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    }
    else if (msg.includes("date")) {
        let tym = new Date().toLocaleString(undefined, { day: "numeric", month: "short" })
        speak(tym);
    }
    else {
        let finaltext = "This is what i found on internet regarding" + msg.replace("Ayesha", "") || msg.replace("Aisha", "");
        speak(finaltext);
        window.open(`https://www.google.com/search?q=${msg.replace("Ayesha", "") || msg.replace("Aisha", "")}`);
    }


}