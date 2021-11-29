var x = 0;
var y = 0;

var screen_width = 0;
var screen_height = 0;

var apple = "";
var draw_apple = "";

var speak_data = "";
var to_number = 0;
var content = "";

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function preload() {
  apple = loadImage('https://i.postimg.cc/bNJKxw4p/apple.png');
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

  console.log(event); 
  content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

  to_number = Number(content);
  if(Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started drawing apple"; 
    draw_apple = "yes";
  }
}

function setup() {
  
  canvas = createCanvas(900,600);
}

function draw() {
  if(draw_apple == "yes") {

    for(i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 900);
      y = Math.floor(Math.random() * 600);
      image(apple,x,y,30,30);

      document.getElementById("status").innerHTML = to_number + "Apples are drawn.";
      speak();
    }
    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    speak_data = to_number + "Apples drawn";

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);
}
