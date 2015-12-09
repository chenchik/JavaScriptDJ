<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-MfvZlkHCEqatNoGiOXveE8FIwMzZg4W85qfrfIFBfYc= sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="style.css">

<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
<!--<script src="https://cdn.rawgit.com/katspaugh/wavesurfer.js/master/dist/wavesurfer.min.js"></script>-->
<!--script src="wavesurfer.js-master/dist/wavesurfer.min"></script-->

<script src="wavesurfer.min.js"></script>

<script type="text/javascript" src="custom.js"></script>

<style>
</style>
</head>
<body>
	
<script>
/*
	window.fbAsyncInit = function() {
    FB.init({
      appId      : '1686207568289177',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }*/
</script>

<script type="text/javascript" src="./fbapp/fb.js"></script>

<!--fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
</fb:login-button-->

	
	
<div class="header">
	<!--img id="youtubeIcon" src="youtubeIcon.png"-->
	
	<!--img id="loadingIconAlt" src="http://www.newunionism.net/images/loading.gif"-->
</div>




<div class="container">

	

	
	<div class="row">
		<div class="col-md-1">
		<p>speed</p>

			<input  type="range" value="1" orient="vertical" name="points" min="0.8" max="1.5" step ="0.001" id="slowSlider1" class="vertSlider"
			>
			<input type="text" id="textInput1" value="">
		</div>
		
		<div class="col-md-3">
			<!--button onclick="playSong1()" type="button">Play Song 1</button>
			<button onclick="pauseSong1()" type="button">Pause Song 1</button><br> 
			
			
			<form id="fileForm1" action="saveFile.php" method="POST" enctype="multipart/form-data" >
				<input type="file" name="fileToUpload" id="mFileInput1"/>
				<input type="submit" value="Upload" name="submit" id = "uploadButton1" >
		
			</form-->	
			<h1>sound 1</h1>
			
			<!--button id='btn' class='button'>Play / Pause</button-->
			<img id="lemonSpinner1" class="lemons" src="images/lemon_smaller.png"></img>
			<audio id="sound1" controls>
			</audio>
			<div id="wave">
				<div class="progress progress-striped active" id="progress-bar">
					<div class="progress-bar progress-bar-info"></div>
				</div>
				
			</div>
		</div>
		
		<div id="silderCol" class="col-md-4">	
			<?php if(isset($_COOKIE['FBname'])){} else{ ?><h4>Please log in</h4><div class="fb-login-button" data-scope="public_profile,email" onlogin="checkLoginState();"></div> <?php } ?>


			<h3> <?php if(isset($_COOKIE['FBname'])){ echo $_COOKIE['FBname']; ?>		
			</h3>
				<fb:login-button id="logout" onclick="deleteCookie()" autologoutlink="true"></fb:login-button>
				<!--<div class="fb-login-button" data-scope="public_profile,email" autologoutlink="true"onclick="deleteCookie()"></div>-->
				<!--<button id ='logout' type='button' onclick="deleteCookie()">Logout</button>-->
			<div id="status"></div>
			<?php } ?>
		
			<div id="singleSliders">
				<input  type="range" value="100" orient="vertical" name="points" min="0" max="100" id="volume1" class="vertSlider">
				<input  type="range" value="100" orient="vertical" name="points" min="0" max="100" id="volume2" class="vertSlider">
			</div>
			<div>
				<input  type="range" name="points" min="0" max="100" id="volumeBoth">
			</div>
		<!--onclick="adjustVol()"-->
		</div>

		<div class="col-md-3">
			<!--button onclick="playSong2()" type="button">Play Song 2</button>
			<button onclick="pauseSong2()" type="button">Pause Song 2</button><br> 
			
		<form id = "fileForm2" action="saveFile.php" method="POST" enctype="multipart/form-data">
		<input type="file" name="fileToUpload" id="mFileInput2"/>
		<input type="submit" value="Upload" name="submit" id="uploadButton2">
		<br>
		</form-->
			<h1>sound 2</h1>
			
			<img id="lemonSpinner2" class="lemons" src="images/lemon_smaller.png"></img>
			<!--button id='btn1' class='button'>Play / Pause</button-->
			<audio id="sound2" controls>
			  </audio>
			  <div id="wave1">
				<div class="progress progress-striped active" id="progress-bar1">
					<div class="progress-bar1 progress-bar-info"></div>
				</div>
				
			</div>
			  <!--input  type="range" value="1" orient="vertical" name="points" min="0.8" max="1.5" step= "0.001" id="slowSlider2" class="vertSlider"
			  onchange="updateTextInput2(this.value);">
			  <input type="text" id="textInput2" value=""-->
			
		</div>
		<div class="col-md-1">
		<p>speed</p>
			<input  type="range" value="1" orient="vertical" name="points" min="0.8" max="1.5" step= "0.001" id="slowSlider2" class="vertSlider">
			  <input type="text" id="textInput2" value="">
		</div>
	</div>
	
	<div id="buttons" class="col-md-2">
		<p>Upload Audio File</p>
		<form id="fileForm1" accept="audio/mpeg,audio/ogg,audio/wav" action="saveFile.php" method="POST" enctype="multipart/form-data" >
			<input type="file" name="fileToUpload" id="mFileInput1"/>
			<input type="submit" value="Upload" name="submit" id = "uploadButton1" >
		</form>
		<p>Delete<p>
		<input type="button" id="deleteButton" value="delete" onclick="deleteThis()"/>
		<img id="loadingGif" src="https://s-media-cache-ak0.pinimg.com/originals/93/6b/3a/936b3a9a817fed848e7025c0430cbb10.gif">
		
	</div>
	
	
	<div class="col-md-10" id = "songList">
	<h1>Song List</h2>
	<div id="left-right-buttons">
		<button id ='leftAudio' type='button'>Left</button>
		<button id ='rightAudio' type='button'>Right</button>
	</div>
	<ul id="list">
	</ul>
	
	</div>

</div>
<footer class="container">
	<div
			class="fb-like"
			data-share="true"
			data-width="450"
			data-show-faces="true">
		</div>
</footer>
	
</body>
</html>