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
    mediaRecorder.stop();
  });
});

sendP.addEventListener("click", () => {
  const newBlob = new Blob(audioChunksProf);
  const fd = new FormData();
  fd.append("teacherVoice", newBlob);
  console.log(fd);
  fetch("http://127.0.0.1:3078/api/post", {
    method: "POST",
    body: fd,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

const displayBlob = document.getElementById("databaseDisplay");
showP.addEventListener("click", () => {
  fetch("http://127.0.0.1:3078/api/", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      displayBlob.append(data[0].name);
      console.log(data[0].path);
      let audio = new Audio(`../backend/sounds/${data[0].name}`);
      audio
        .play()
        .then(console.log(audio))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
