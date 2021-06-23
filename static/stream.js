var flvPlayer;
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
const videoElem = document.getElementById("video");
const connectElem = document.getElementById("connect");
const output_message = document.getElementById("output_console");

window.addEventListener('load', (event) => {
  
  startElem.style.display = "none";
  connectElem.style.display = "block";
  stopElem.style.display = "none";
  console.log('page is fully loaded');
});
function fail(str) {
  alert(str + "\nPlease download the latest version of Firefox!");
  location.replace("http://mozilla.org/firefox");
}
var output_console = document.getElementById("output_console"),
  output_video = document.getElementById("video"),
  //option_url = document.getElementById("option_url"),
  socketio_address = document.getElementById("socket.io_address"),
  url = "rtmp://rtmp.livepeer.com/live/d26c-7xzq-hwp6-ca9g";

function show_output(str) {
  output_console.value += "\n" + str;
  output_console.scrollTop = output_console.scrollHeight;
}

function timedCount() {
  var oo = true;
  if (oo) {
    if (state == "ready") {
      requestMedia();
    } else {
      t = setTimeout("timedCount()", 1000);
      connect_server();
      output_message.innerHTML = "try connect server ...";
    }
  } else {
    startElem.disabled = true;
    connectElem.disabled = false;
    liveTag.hide();
  }
}

function connect_server() {
  socket = io.connect("https://localhost:8002", { secure: true });
  //output_message.innerHTML=socket;
  socket.on("connect_error", function () {
    output_message.innerHTML = "Connection Failed";
  });

  socket.on("message", function (m) {
    console.log("recv server message", m);
    show_output("SERVER:" + m);
  });
  socket.on("fatal", function (m) {
    show_output("ERROR: unexpected:" + m);
    //alert('Error:'+m);
    mediaRecorder.stop();
    state = "stop";
    startElem.disabled = true;
    connectElem.disabled = false;
    startElem.style.display = "none";
    connectElem.style.display = "block";
    stopElem.style.display = "none";

    liveTag.hide();

    //document.getElementById('startElem').disabled=true;
    var oo = true;
    if (oo) {
      timedCount();
      output_message.innerHTML = "server is reload!";
      //如果該checkbox有勾選應作的動作...
    }
    //should reload?
  });
  socket.on("ffmpeg_stderr", function (m) {
    show_output("FFMPEG:" + m);
  });
  socket.on("disconnect", function () {
    show_output("ERROR: server disconnected!");
    mediaRecorder.stop();
    state = "stop";
    startElem.disabled = true;
    connectElem.disabled = false;
    startElem.style.display = "none";
    connectElem.style.display = "block";
    stopElem.style.display = "none";

    liveTag.hide();

    //	document.getElementById('startElem').disabled=true;
    var oo = true;
    if (oo) {
      timedCount();

      output_message.innerHTML = "server is reload!";
      //如果該checkbox有勾選應作的動作...
    }
  });
  state = "ready";
  startElem.disabled = false;
  connectElem.disabled = true;
  startElem.style.display = "block";
  connectElem.style.display = "none";
  stopElem.style.display = "none";

  liveTag.hide(); 
  output_message.innerHTML = "connect server successful";
}

function video_show(stream) {
  if ("srcObject" in output_video) {
    output_video.srcObject = stream;
  } else {
    output_video.src = window.URL.createObjectURL(stream);
  }
  output_video.addEventListener(
    "loadedmetadata",
    function (e) {
      output_message.innerHTML =
        "Local video source size:" +
        output_video.videoWidth +
        "x" +
        output_video.videoHeight;
    },
    false
  );
}
const liveTag = $(".live-tag");
function requestMedia() {
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
  navigator.mediaDevices
    .getDisplayMedia(gdmOptions)
    .then(function (stream) {
      video_show(stream); //only show locally, not remotely
      startElem.disabled = true;
      stopElem.disabled = false;
      liveTag.show();
      startElem.style.display = "none";
      connectElem.style.display = "none";
      stopElem.style.display = "block";

      socket.emit("config_rtmpDestination", url);
      socket.emit("start", "start");
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start(0);

      mediaRecorder.onstop = function (e) {
        stopElem.disabled = true;
        startElem.disabled = true;
        connectElem.disabled = false;
        startElem.style.display = "none";
        connectElem.style.display = "block";
        stopElem.style.display = "none";

        liveTag.hide();
      };
      //document.getElementById('startElem').disabled=false;

      mediaRecorder.ondataavailable = function (e) {
        socket.emit("binarystream", e.data);
        state = "start";
        //chunks.push(e.data);
      };
    })
    .catch(function (err) {
      console.log("The following error occured: " + err);
      show_output("Local getUserMedia ERROR:" + err);

      state = "stop";
      startElem.disabled = true;
      connectElem.disabled = false;
    });
}
