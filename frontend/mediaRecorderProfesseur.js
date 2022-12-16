const recordP = document.getElementById("recordP");
const stopRecP = document.getElementById("stopRecP");
const displaySound = document.getElementById("databaseDisplay");
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
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
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
      soundReducedHexaName.map((p, i) => {
        let button = document.createElement("button");
        button.setAttribute("id", `${i}`);
        button.classList.add("button-short-hexa-sound");
        displaySound.insertAdjacentElement("afterbegin", button).append(p);
      });
      function selectAndPlaySound(i) {
        let audio = new Audio(`../backend/sounds/${data[i].soundHexaRef}`);
        audio
          .play()
          .then()
          .catch((err) => console.log(err));
      }
      let shortHexaButtons = document.getElementsByClassName(
        "button-short-hexa-sound"
      );
      for (const shortHexaButton of shortHexaButtons) {
        shortHexaButton.addEventListener("click", (e) => {
          return selectAndPlaySound(e.target.id);
        });
      }
    })
    .catch((err) => console.log(err));
});
