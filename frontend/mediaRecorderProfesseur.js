import axios from "./axios";

let recordP = document.getElementById("recordP");
let stopRecP = document.getElementById("stopRecP");
let playP = document.getElementById("playP");
let audioChunksProf = [];

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.addEventListener("dataavailable", (event) => {
    audioChunksProf.push(event.data);
  });
  recordP.addEventListener("click", () => {
    audioChunksProf = [];
    mediaRecorder.start();
  });
  stopRecP.addEventListener("click", () => {
    console.log(audioChunksProf);
    mediaRecorder.stop();
  });
});
playP.addEventListener("click", (audio) => {
  const audioUrl = URL.createObjectURL(new Blob(audioChunksProf));
  console.log(audioUrl);
});
