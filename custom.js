"use strict";
function byId(e){return document.getElementById(e);}

window.addEventListener('load', onDocLoaded, false);

var wavesurfer;
var wavesurfer1;

function onDocLoaded()
{
    byId('mFileInput1').addEventListener('change', onChosenFileChange, false);
	//byId('mFileInput2').addEventListener('change', onChosenFileChange2, false);
}


function isPlaying(audelem) { return !audelem.paused; }

function onChosenFileChange(evt)
{
    var fileType = this.files[0].type;
    wavesurfer.loadBlob(this.files[0]);
    if (fileType.indexOf('audio') != -1){
        loadFileObject(this.files[0], onSoundLoaded);
		//loadFileObject(this.files[1], onSoundLoaded);
		console.log(this.files[0]);
		//console.log(this.files[1]);
	}
   
		
		
}



function onChosenFileChange2(evt)
{
    var fileType = this.files[0].type;
     wavesurfer1.loadBlob(this.files[0]);

    if (fileType.indexOf('audio') != -1){
        loadFileObject(this.files[0], onSoundLoaded2);
		//loadFileObject(this.files[1], onSoundLoaded);
		console.log(this.files[0]);
		//console.log(this.files[1]);
	}
		
		
}

function loadFileObject(fileObj, loadedCallback)
{
    var reader = new FileReader();
    reader.onload = loadedCallback;
    reader.readAsDataURL( fileObj );
}

function onSoundLoaded(evt)
{

    byId('sound1').src = evt.target.result;
    //byId('sound').play();
}

function playSong1() { 

    byId('sound1').play(); 
	
	//while(isPlaying(byId('sound1'))){
	
		//var volume = +document.getElementById("volumeBoth").value;
		//byId('sound1').volume = volume/100;
	//}
} 



function pauseSong1() { 
    byId('sound1').pause(); 
} 

function onImageLoaded1(evt)
{
    byId('image1').src = evt.target.result;
}

function onVideoLoaded1(evt)
{
    byId('video1').src = evt.target.result;
    byId('video1').play();
}






function onSoundLoaded2(evt)
{
    byId('sound2').src = evt.target.result;
    //byId('sound').play();
}
function playSong2() { 
    byId('sound2').play(); 
} 

function pauseSong2() { 
    byId('sound2').pause(); 
} 

function onImageLoaded2(evt)
{
    byId('image2').src = evt.target.result;
}

function onVideoLoaded2(evt)
{
    byId('video2').src = evt.target.result;
    byId('video2').play();
}


function adjustVol(){
//while(isPlaying(byId('sound1'))){
	var volume = byId('volumeBoth').value /100;
	var volumeBefore = byId('volumeBoth').value;
	//byId('sound1').volume = byId('volumeBoth').value /100;
	
	if(volumeBefore > 49){
		byId('sound2').volume = 1.0;
		byId('sound1').volume = (100 - ((volumeBefore-50)*2)) /100;
	}
	else{
		byId('sound1').volume = 1.0;
		//byId('sound1').voume = (100 - (volumeBefore*2)) /100;
		//console.log((100 - (volumeBefore*2)) /100);
		byId('sound2').volume = ((volumeBefore*2)) /100;
		//console.log(byId('sound1').volume);
	}
}

function adjustVol1(){
		var volumeBefore = byId('volume1').value;
		byId('sound1').volume = volumeBefore /100;
}


function adjustVol2(){
		var volumeBefore = byId('volume2').value;
		byId('sound2').volume = volumeBefore /100;
}
function slow1(){
	var rate = document.getElementById('slowSlider1').value;
	var audio = document.getElementById('sound1');
	audio.playbackRate = rate;
}
function slow2(){
	var rate = document.getElementById('slowSlider2').value;
	var audio = document.getElementById('sound2');
	audio.playbackRate = rate;
}

function selected(id){
	$('#songList>ul>p.highlight').removeClass('highlight');
	$(id).addClass('highlight');
}
$('document').ready(function(){
//$('#loadingGif').hide();

var loopthis;
var id;

//createWave();
	

var sliderSlow1 =document.getElementById('slowSlider1');
var sliderSlow2 =document.getElementById('slowSlider2');

var list =  document.getElementById('list');

var buttonLeft = document.getElementById('leftAudio');
var buttonRight = document.getElementById('rightAudio');

var form1 = document.getElementById('fileForm1');
var fileSelect1 = document.getElementById('mFileInput1');


var form2 = document.getElementById('fileForm2');
var fileSelect2 = document.getElementById('mFileInput2');

	
	//var $loadingalt = $('#loadingIconAlt').hide();
	/*$(document)
		.ajaxStart(function () {
			//$loading.show();
			$loadingalt.show();
		})
		.ajaxStop(function () {
			//$loading.hide();
			$loadingalt.hide();
		});*/

var xhr = new XMLHttpRequest();
xhr.open('POST', 'saveFile.php', true);
xhr.onload = function () {
	//$('#loadingGif').show();

  if (xhr.status === 200) {
    // File(s) uploaded.
	 list.innerHTML = xhr.responseText;
  } else {
    alert('An error occurred!');
  }

};
// Send the Data.
xhr.send();

//sliderSlow1.addEventListener("mousemove", function() {
//   	var rate = sliderSlow1.value;
//	var audio = document.getElementById('sound1');
//	audio.playbackRate = rate;
//}, false);
//sliderSlow2.addEventListener("mousemove", function() {
//   	var rate = sliderSlow2.value;
//	var audio = document.getElementById('sound2');
//	audio.playbackRate = rate;
//}, false);


list.addEventListener('click', function(e) {
id = e.target.id;
});
buttonLeft.addEventListener('click',function(e){
var audio = document.getElementById('sound1');
var path;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'getFile.php?q='+id, true);
xhr.onload = function () {
  if (xhr.status === 200) {
    // File(s) uploaded.
	  path = xhr.responseText;
	audio.src = path;
	 playSong1();
  } else {
    alert('An error occurred!');
  }
};
// Send the Data.
xhr.send();
});
buttonRight.addEventListener('click',function(e){
var audio = document.getElementById('sound2');
var path;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'getFile.php?q='+id, true);
xhr.onload = function () {
  if (xhr.status === 200) {
    // File(s) uploaded.
	 path = xhr.responseText;
	 audio.src = path;
	 playSong2();
	 } else {
    alert('An error occurred!');
  }
};
// Send the Data.
xhr.send();
});
form1.onsubmit = function(event) {
  event.preventDefault();
var files = fileSelect1.files;
var formData = new FormData();

for (var i = 0; i < files.length; i++) {
  var file = files[i];

  // Check the file type.

  // Add the file to the request.
  formData.append('fileToUpload', file, file.name);
  
}

var xhr = new XMLHttpRequest();
xhr.open('POST', 'saveFile.php', true);
$('#loadingGif').fadeIn("slow");
xhr.onload = function () {
	$('#loadingGif').fadeOut("slow");
//$('#loadingGif').show();
  if (xhr.status === 200) {
    // File(s) uploaded.
	 list.innerHTML = xhr.responseText;
  } else {
    alert('An error occurred!');
  }
};
// Send the Data.
xhr.send(formData);
}

/*
form2.onsubmit = function(event) {
	
  event.preventDefault();

  // Update button text.
  uploadButton2.innerHTML = 'Uploading...';

  // The rest of the code will go here...
var files = fileSelect2.files;
var formData = new FormData();

for (var i = 0; i < files.length; i++) {
  var file = files[i];

  // Check the file type.

  // Add the file to the request.
  formData.append('fileToUpload', file, file.name);
  
}

var xhr = new XMLHttpRequest();
xhr.open('POST', 'saveFile.php', true);
xhr.onload = function () {
  if (xhr.status === 200) {
    // File(s) uploaded.
    uploadButton2.innerHTML = 'Upload';
  } else {
    alert('An error occurred!');
  }
};
// Send the Data.
xhr.send(formData);
}
*/
	//$.post('saveFile.php', function() {
	//	$('#loadingGif').show();
	//});

	/*$("form").submit(function(e) {
		e.preventDefault();
		$("#loadingGif").show();
		
	});*/
	
	/*
	$('#logout').on('click', function(){
		//document.cookie = "FBid=10207441136214040; expires=Thu, 01 Jan 1970 00:00:00 UTC "
		//alert("clicked logout")
		 var username=getCookie("FBname");
		if (username!="") {
			//alert("Welcome again " + username);
			document.cookie = "FBid=; expires=Thu, 01 Jan 1970 00:00:00 UTC ";
		}else{
			username = prompt("Please enter your name:", "");
			if (username != "" && username != null) {
				setCookie("username", username, 365);
			}
		}
	});*/

	$('#volumeBoth').mousedown(function(){
		loopthis = setInterval(adjustVol, 100);
		//console.log("hello");
	}).mouseup(function(){
		clearInterval(loopthis);
	});
	
	$('#volume1').mousedown(function(){
		loopthis = setInterval(adjustVol1, 100);
		//console.log("hello");
	}).mouseup(function(){
		clearInterval(loopthis);
	});
	
	$('#volume2').mousedown(function(){
		loopthis = setInterval(adjustVol2, 100);
		//console.log("hello");
	}).mouseup(function(){
		clearInterval(loopthis);
	});
	
	
	$('#slowSlider1').mousedown(function(){
		loopthis = setInterval(slow1, 100);
		loopthis = setInterval(getSpeed1, 100);
		//console.log("hello");
	}).mouseup(function(){
		clearInterval(loopthis);
	});
	
	$('#slowSlider2').mousedown(function(){
		loopthis = setInterval(slow2, 100);
		loopthis = setInterval(getSpeed2, 100);
		//console.log("hello");
	}).mouseup(function(){
		clearInterval(loopthis);
	});
	
	
	
	// add your element
  // dont give any of them ids
  //$("#wave").append('<div class="row needsWave"></div>');

  // call the function we will define in a second
  // pass in the path to your file
   //addWaveSurfer("Lykke Buddha - Faded [Conversion].mp3");
	
	
	
	//DCEDITS-------------------------------------------------
	
	
	
	/*
	$('#deleteButton').click(function(){	
		alert("clicked");
		var listElement = $('ul#list p.highlight');
		console.log(listElement.text());
		var song = {
			songName: listElement.text(),
		};
		console.log("...deleting: "+ listElement.text() +"....");
		
		$.ajax({
			url: 'delete.php',
			type: 'POST',
			data: song,
			success: function(newSong){
				alert("success deleting" + listElement.text());
				listElement.remove();
			},
			error: function(){
				alert('music delete failed');
			}
		});
	});
	*/
	
	

});

function deleteCookie(){
	//alert("deleting cookie");
	alert(getCookie("FBname"));
	//document.cookie = "FBname=; expires=Thu, 01 Jan 1970 00:00:00 UTC"; 
	//document.cookie = "FBname=;expires=Thu, 01 Jan 1970 00:00:00 GMT; '/'";
}



function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
} 


function deleteThis(){
	
	//alert("clicked delete");
	var listElement = $('ul#list p.highlight');
		console.log(listElement.text());
		var song = {
			songName: listElement.text(),
		};
		console.log("...deleting: "+ listElement.text() +"....");
		
		$.ajax({
			url: 'delete.php',
			type: 'POST',
			data: song,
			success: function(newSong){
				//alert("success deleting" + listElement.text());
				listElement.remove();
			},
			error: function(){
				alert('music delete failed');
			}
		});
	
}

//function updateTextInput1(val) {
//      document.getElementById('textInput1').value=val; 
//}
function getSpeed1(){
	 document.getElementById('textInput1').value=document.getElementById('slowSlider1').value; 
	
}

function getSpeed2(){
	 document.getElementById('textInput2').value=document.getElementById('slowSlider2').value; 
	
}
//function updateTextInput2(val) {
//      document.getElementById('textInput2').value=val; 
//}

//------------------------------------------------------


function addWaveSurfer(path){
    // create instance of WaveSurfer
    var tempWavesurferObject = Object.create(WaveSurfer);
        // initialize the object 
        // ".needsWave:last" gets the last element with the class "needsWave"
        // which will be the element we just added
    tempWavesurferObject.init({
            container: $( ".needsWave:last" )[0],// "[0]" gets the DOM element from the jQuery object
            waveColor: 'violet',
            progressColor: 'purple'
          });
        tempWavesurferObject.on('ready', function () {
            tempWavesurferObject.play();
        });
        tempWavesurferObject.load(path); // load the file we passed in
    // add the WaveSurfer to the global array so we can keep up with it
    WaveSurfers.push(tempWavesurferObject);

    // below shows how to access the WaveSurfers later by stoping the playback after a few seconds
     setTimeout(function(){
          var last = WaveSurfers.length-1; // get index of last WaveSurfer element
          WaveSurfers[last].stop();
     }, 10000);

}



function createWave() {

	var loopthis;

	// Init & load audio file

    var options = {
        container     : document.querySelector('#wave'),
        waveColor     : '#545454',
        progressColor : '#FF6600',
        cursorColor   : '#FF6600'
    };

    if (location.search.match('scroll')) {
        options.minPxPerSec = 100;
        options.scrollParent = true;
    }

    // Init
    wavesurfer.init(options);

    // Regions
    if (wavesurfer.enableDragSelection) {
        wavesurfer.enableDragSelection({
            color: 'rgba(0, 255, 0, 0.1)'
        });
    }

    $('#btn').click(function(){
		wavesurfer.playPause();
	});

	// Report errors
	wavesurfer.on('error', function (err) {
    	console.error(err);
	});

	// Do something when the clip is over
	wavesurfer.on('finish', function () {
	});

	/* Progress bar */

    var progressDiv = document.querySelector('#progress-bar');
    var progressBar = progressDiv.querySelector('.progress-bar');

    var showProgress = function (percent) {
        progressDiv.style.display = 'block';
        progressBar.style.width = percent + '%';
    };

    var hideProgress = function () {
        progressDiv.style.display = 'none';
    };

    wavesurfer.on('loading', showProgress);
    wavesurfer.on('ready', hideProgress);
    wavesurfer.on('destroy', hideProgress);
    wavesurfer.on('error', hideProgress);

}




function createWave1() {
	var loopthis;
	// Init & load audio file
    var options = {
        container     : document.querySelector('#wave1'),
		waveColor     : '#545454',
        progressColor : '#FF6600',
        cursorColor   : '#FF6600'
    };

    if (location.search.match('scroll')) {
        options.minPxPerSec = 100;
        options.scrollParent = true;
    }

    // Init
    wavesurfer1.init(options);

    // Regions
    if (wavesurfer1.enableDragSelection) {
        wavesurfer1.enableDragSelection({
            color: 'rgba(0, 255, 0, 0.1)'
        });
    }

    $('#btn1').click(function(){
		wavesurfer1.playPause();
	});

	// Report errors
	wavesurfer1.on('error', function (err) {
    	console.error(err);
	});

	// Do something when the clip is over
	wavesurfer1.on('finish', function () {
    	console.log('Finished playing');
	});

	/* Progress bar */

    var progressDiv = document.querySelector('#progress-bar1');
    var progressBar = progressDiv.querySelector('.progress-bar1');

    var showProgress = function (percent) {
        progressDiv.style.display = 'block';
        progressBar.style.width = percent + '%';
    };

    var hideProgress = function () {
        progressDiv.style.display = 'none';
    };

    wavesurfer1.on('loading', showProgress);
    wavesurfer1.on('ready', hideProgress);
    wavesurfer1.on('destroy', hideProgress);
    wavesurfer1.on('error', hideProgress);
}


/*
var wavesurfer = WaveSurfer.create({
    container: $('#wave'),
    waveColor: 'violet',
    progressColor: 'purple'
});

wavesurfer.on('ready', function () {
    wavesurfer.play();
});

wavesurfer.load(byId('sound1'));
*/

/*
$('document').ajaxStart(function() {
	alert("loading");
    $('img#loadingGif').show(); // show the gif image when ajax starts
}).ajaxStop(function() {
    $('img#loadingGif').hide(); // hide the gif image when ajax completes
});
*/

/*
$('document').ajaxComplete(function(){
	$('#loadingGif').hide();
});
*/



/*
function repeatingfunction() {
    var volume = byId('volumeBoth').value /100;
	byId('sound1').volume = byId('volumeBoth').value /100;
	console.log(volume);
}
*/
