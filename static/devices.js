//Webcam
var video = document.querySelector("#videoElement");
const button = document.querySelector("#pip");
const cameraDiv = document.querySelector("#cameraDiv");
// const streamCam = document.getElementById("streamCam");

// streamCam.addEventListener(
//   "click",
//   function (evt) {
//     streamFaceCam();
//   },
//   false
// );

function streamFaceCam() {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
        video.addEventListener("enterpictureinpicture", onEnterPip, false);
        video.addEventListener("leavepictureinpicture", onExitPip, false);
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }
}

button.onclick = function () {
  video.requestPictureInPicture();
};

function onExitPip() {
  console.log("Picture-in-Picture mode deactivated!");
  video.style.display = "block";
  cameraDiv.style.display = "block";
  button.style.display = "block";
}
function onEnterPip() {
  console.log("Picture-in-Picture mode activated!");

  video.style.display = "none";
  cameraDiv.style.display = "none";
  button.style.display = "none";
}

const gdmOptions = {
  video: {
    cursor: "always",
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
};


stopElem.addEventListener(
  "click",
  function (evt) {
    stopCapture();
  },
  false
);
 

async function startCapture() {
  logElem.innerHTML = "";

  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(
      gdmOptions
    );
    dumpOptionsInfo();
  } catch (err) {
    console.error("Error: " + err);
  }
}

function show_output(str) {
  console.log(str);
}

function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  videoElem.srcObject = null;
}

function dumpOptionsInfo() {
  const videoTrack = videoElem.srcObject.getVideoTracks()[0];

  console.info("Track settings:");
  console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
  console.info("Track constraints:");
  console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}
