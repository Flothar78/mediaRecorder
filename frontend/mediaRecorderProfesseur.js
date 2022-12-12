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
  const newBlob = new Blob(audioChunksProf, {
    type: "application/octet-binary",
  });
  console.log(newBlob.type);
  //let url = URL.createObjectURL(newBlob);
  //console.log(url);
  const fd = new FormData();
  fd.append("sound", newBlob);
  console.log(fd);
  // for (const [key, value] of fd) {
  //  console.log(key, value);
  //
  fetch("http://127.0.0.1:3078/api/post", {
    method: "POST",
    body: fd,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

const displayBlob = document.getElementById("databaseDisplay");
showP.addEventListener("click", () => {
  fetch("http://127.0.0.1:3078/api/")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      displayBlob.append(data.map((x) => `size: ${x.size} ; id:${x._id} `));
      console.log(data[0]);
    });
});
