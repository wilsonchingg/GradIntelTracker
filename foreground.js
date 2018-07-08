
var vid = $('video')[0];
var hasStarted = false;
const START_RECORDING = 1;
const STOP_RECORDING = 2;
const RECEIVE_TITLE = 3;

let blob;
let title;
let recorder;

const repeaterlistener = function () {
		this.currentTime = 0;
}

$(document).ready(()=>{
	setTitle();
	setButton();
});

let isTitleSet = false;
function setTitle(){
	if(document.getElementsByClassName('title style-scope ytd-video-primary-info-renderer')[0]){
		title = document.getElementsByClassName('title style-scope ytd-video-primary-info-renderer')[0].innerText;
		isTitleSet = true;
	}
	if(!isTitleSet){
		setTimeout(function(){
			setTitle();
		}, 2000);
	}
}

function setButton(){
	if($( "#meta-contents" ) ){
		if($('#hello-world').length == 0){
			$( "#meta-contents" ).prepend( "<button id='hello-world' disabled>Get Surprise</button>" );
			$('#hello-world').on('click', ()=>{
				console.log(blob);
				saveAs(blob, title+ '.webm');
			});
		}
		if($('#repeater').length == 0){
			$( "#meta-contents" ).prepend( "<button id='repeater'>Repeat</button>" );
			$('#repeater').on('click', ()=>{
				console.log('repeater')
				if($('#repeater').text() === 'Repeat'){
					$('video').bind('ended.plugin', repeaterlistener)
					$('#repeater').text('Stop Repeating');
				} else{
					$('video').off('ended.plugin', repeaterlistener)
					$('#repeater').text('Repeat');
				}


			});
		}
	}
	setTimeout(function(){
		setButton();
	}, 2000);
}

if(vid){
	vid.addEventListener('playing', function(e) {
	    console.log('Extension: Video listener - playing');
	    if(!hasStarted){
	    	hasStarted = true;
			  // startRecording();
	    }
	});
	vid.addEventListener('ended', function(e) {
	    console.log('Extension: Video listener - ended');
	    recorder.stop();
	});
}

function startRecording(){
	startAudio();
	setTimeout(function(){
		console.log("stopping")
		stopRecording();
	}, 4000);
}
function startAudio(){
	navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
		// store streaming data chunks in array
		const chunks = [];
		// create media recorder instance to initialize recording
		recorder = new MediaRecorder(stream);
		// function to be called when data is received
		recorder.ondataavailable = e => {
			// add stream data to chunks
			 chunks.push(e.data);
			if (recorder.state == 'inactive') {
				if($('#hello-world').length > 0){
					console.log("Removing attr")
					$('#hello-world').removeAttr("disabled");
				}
				console.log("Extension: inactive")
				 blob = new Blob(chunks, { type: 'audio/webm' });
			}
		};
		// start recording with 1 second time between receiving 'ondataavailable' events
		recorder.start(1000);
	}).catch(console.error);
}
