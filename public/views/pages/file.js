var Peer = require('simple-peer');
var io = require('socket.io-client');
var socket = io.connect();

socket.on('connectPeer', function(data){
navigator.getUserMedia({ video: true, audio: true }, gotMedia, function () {})

function gotMedia (stream) {
  var peer1 = new Peer({ initiator: true, stream: stream })
  var peer2 = new Peer({stream: stream})

  peer1.on('signal', function (data) {
    peer2.signal(data)
  })

  peer2.on('signal', function (data) {
    peer1.signal(data)
  })

  peer1.on('stream', function (stream) {
    // got remote video stream, now let's show it in a video tag
    var video = document.getElementById('video-call-initiator')
    video.srcObject = stream;
    video.play()
  })

  peer2.on('stream', function (stream) {
    // got remote video stream, now let's show it in a video tag
    var video = document.getElementById('video-call')
    video.srcObject = stream;
    video.play()
  })
}
    

}); 




  
  
