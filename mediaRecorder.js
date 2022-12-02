let record = document.getElementById("record");
let stopRecording = document.getElementById("stop");
let play = document.getElementById("play");
let audioChunks = [];

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.addEventListener("dataavailable", (event) => {
    audioChunks.push(event.data);
  });
  record.addEventListener("click", () => {
    audioChunks = [];
    mediaRecorder.start();
  });
  stopRecording.addEventListener("click", () => {
    mediaRecorder.stop();
  });
});
play.addEventListener("click", (audio) => {
  const audioUrl = URL.createObjectURL(new Blob(audioChunks));
  audio = new Audio(audioUrl);
  audio.play();
});
