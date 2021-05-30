
 
    var audio = document.getElementById('music-player');
        
    var source = document.getElementById('music-player-src');

    var title = document.getElementById('title');

    var artist = document.getElementById('artist');

    var artwork = document.getElementsByClassName('music-artwork');


       

function getJSON(url) {
            var resp ;
            var xmlHttp ;

            resp  = '' ;
            xmlHttp = new XMLHttpRequest();

            if(xmlHttp != null)
            {
                xmlHttp.open( "GET", url, false );
                xmlHttp.send( null );
                resp = xmlHttp.responseText;
            }

            return resp ;
        } 

var gjson ;
        gjson = getJSON('https://discoveryprovider.audius.co/v1/tracks/trending') ;

        var gjson2 = JSON.parse(gjson);

        for(var i =0;i<35;i++){
                var artwork = gjson2.data[i].artwork['150x150'];
                var description = gjson2.data[i].description;
                var duration = gjson2.data[i].duration;
                var id = gjson2.data[i].id;
                var title = gjson2.data[i].title;   
                var user = gjson2.data[i].user;     
                var username = gjson2.data[i].user.name;
                var userId = gjson2.data[i].user.id;
                var trackLayout = '<div class="card m-3 music-artwork rounded-circle" style="width: 150px;height:200px;outline: none;" data-artwork="'+artwork+'" data-artist="'+username+'" data-artistid="'+userId+'" name="'+title+'"   data-id="'+id+'" ><img class="rounded-circle"  style="height:100%;width:100%;" src="'+artwork+'" alt="Card image cap"><div class="card-body rounded-circle"   ><h5 class="card-title text-center text-dark">'+title+'</h5> </div></div>';
                $('#demo').append(trackLayout);
                //console.log(i);    

        }

    window.onload = function() {
  
  var file = document.getElementById("thefile");
  let firstFlag = true;
  let wm = new WeakMap();
  let context, analyser;
  let src; 
  $(".music-artwork").click(function() {
          if (src) {
              src.disconnect();
            }
          let audio = document.getElementById("audio");
            let sourceUrl = "https://discoveryprovider.audius.co/v1/tracks/"+$(this).attr("data-id")+"/stream";
            //let audio = document.getElementById('myAudio');   
            //alert(audio.src);
            // $("#music-player").attr("src", sourceUrl); 
            //$("#now-playing-artwork").attr("src", $(this).attr("data-artwork"));
            //let imageUrl = $(this).attr("data-artwork"); 
                 //$("body").css("background-image", "url(" + imageUrl + ")"); 
          
            audio.src = sourceUrl;

            audio.load();//suspends and restores all audio element
            audio.play();

            // title.innerHTML = $(this).attr('name');
            // artist.innerHTML =  $(this).attr("data-artist");
 
            // audio.oncanplaythrough = audio.play();
            // audio = new Audio(sourceUrl);
            if(firstFlag){
            // AudioContextの生成
            context = new (window.AudioContext || window.webkitAudioContext)();
            firstFlag = false;     
            }   
            // const stream_dest = context.createMediaStreamDestination();
            // let context = new AudioContext();
            if (wm.has(audio)) { 
              src = wm.get(audio); 
            } else { 
              src = context.createMediaElementSource(audio);
              // audioSourceNode = audioCtx.createMediaElementSource(audioEle); 
              wm.set(audio, src); 
            }  

    // let src = context.createMediaStreamSource(sourceUrl);
    if(analyser){
        analyser.disconnect();
      } 
    analyser = context.createAnalyser();

    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");

    src.connect(analyser);
    
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    let bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    let dataArray = new Uint8Array(bufferLength);

    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;

    let barWidth = (WIDTH / bufferLength) * 1;
    let barHeight;
    let x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#FFF";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]*2.8;
        
        let r = barHeight + (25 * (i/bufferLength));
        let g = 250 * (i/bufferLength);
        let b = 50;
        myImage = $('#myImage');
 
        //dominantColor = getDominantColor(myImage);

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    renderFrame();
                 
        });
   
};