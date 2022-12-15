const recordP = document.getElementById("recordP");
const stopRecP = document.getElementById("stopRecP");
const displaySound = document.getElementById("databaseDisplay");
const playP = document.getElementById("playP");
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
    mediaRecorder.stop();
  });
});

sendP.addEventListener("click", () => {
  const newBlob = new Blob(audioChunksProf);
  const fd = new FormData();
  fd.append("teacherVoice", newBlob);
  fetch("http://127.0.0.1:3078/api/post", {
    method: "POST",
    body: fd,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

addEventListener("load", () => {
  fetch("http://127.0.0.1:3078/api/", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let soundReducedHexaName = data.map(
        (x) => x.soundHexaRef.split``.slice(0, 8).join``
      );
      console.log(soundReducedHexaName);
      soundReducedHexaName.map((p, i) => {
        let button = document.createElement("button");
        button.setAttribute("id", `teacher-sound${i}`);
        displaySound.insertAdjacentElement("afterbegin", button).append(p);
      });

      function selectAndPlaySound(i) {
        document
          .getElementById(`teacher-sound${i}`)
          .addEventListener("click", () => {
            let audio = new Audio(`../backend/sounds/${data[i].soundHexaRef}`);
            audio
              .play()
              .then(console.log(audio))
              .catch((err) => console.log(err));
          });
      }
      selectAndPlaySound(2);
    })
    .catch((err) => console.log(err));
});
