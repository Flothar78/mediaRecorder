let record = document.getElementById("record");
let stopRecording = document.getElementById("stop");
let play = document.getElementById("play");
let audioChunks = [];

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  record.classList.add("blowing-button");
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.addEventListener("dataavailable", (event) => {
    audioChunks.push(event.data);
  });
  record.addEventListener("click", () => {
    record.classList.remove("blowing-button");
    stopRecording.classList.add("blowing-button");
    audioChunks = [];
    mediaRecorder.start();
  });
  stopRecording.addEventListener("click", () => {
    stopRecording.classList.remove("blowing-button");
    mediaRecorder.stop();
    play.classList.add("blowing-button");
  });
});
play.addEventListener("click", (audio) => {
  play.classList.remove("blowing-button");
  const audioUrl = URL.createObjectURL(new Blob(audioChunks));
  audio = new Audio(audioUrl);
  audio.play();
});
