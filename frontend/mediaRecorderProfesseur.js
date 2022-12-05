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

playP.addEventListener("click", () => {
  // const newBlob = new Blob(audioChunksProf);
  // console.log(newBlob);
  // const fd = new FormData();
  // fd.append("upl", newBlob);
  // console.log(fd);
  // console.log(audioUrl);
  const stringTestObj = { name: "ceJourlà", age: 71 };
  fetch("http://127.0.0.1:3078/api/post", {
    // HTTP request type
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(stringTestObj),
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
