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

playP.addEventListener("click", () => {
  const newBlob = new Blob(audioChunksProf, {
    type: "application/octet-binary",
  });
  console.log(newBlob.type);
  //let url = URL.createObjectURL(newBlob);
  //console.log(url);
  const fd = new FormData();
  fd.append("sound", newBlob);
  for (const [key, value] of fd) {
    console.log(key, value);
  }

  //const stringTestObj = { name: "arrobazLife", age: 159 };
  fetch("http://127.0.0.1:3078/api/post", {
    method: "POST",
    body: fd,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
