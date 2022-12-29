let recordA = document.getElementById("recordA");
let stopRecA = document.getElementById("stopRecA");
let play = document.getElementById("playA");
let apprenant = document.getElementById("apprenant-text-area");
let audioChunks = [];
let textWarningRecording = document.createTextNode("Enregistrement en cours");

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  recordA.classList.add("glowing-button");
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.addEventListener("dataavailable", (event) => {
    audioChunks.push(event.data);
  });
  recordA.addEventListener("click", () => {
    apprenant.appendChild(textWarningRecording);
    recordA.classList.remove("glowing-button");
    stopRecA.classList.add("glowing-button");
    audioChunks = [];
    mediaRecorder.start();
  });
  stopRecA.addEventListener("click", () => {
    apprenant.removeChild(textWarningRecording);
    stopRecA.classList.remove("glowing-button");
    mediaRecorder.stop();
    playA.classList.add("glowing-button");
  });
});
playA.addEventListener("click", () => {
  playA.classList.remove("glowing-button");
  const newBlob = new Blob(audioChunksProf);
  const fdLearner = new FormData();
  fdLearner.append("learnerVoice", newBlob);
  fetch("http://127.0.0.1:3078/api/learnerVoice", {
    method: "POST",
    body: fdLearner,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
});
