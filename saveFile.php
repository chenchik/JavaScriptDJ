<?php
//ini_set('display_errors',1);
//error_reporting(E_ALL);
function check_file_is_audio( $tmp ) 
{
    $allowed = array(
        'audio/mpeg', 'audio/x-mpeg', 'audio/mpeg3', 'audio/x-mpeg-3', 'audio/aiff', 
        'audio/mid', 'audio/x-aiff', 'audio/x-mpequrl','audio/midi', 'audio/x-mid', 
        'audio/x-midi','audio/wav','audio/x-wav','audio/xm','audio/x-aac','audio/basic',
        'audio/flac','audio/mp4','audio/x-matroska','audio/ogg','audio/s3m','audio/x-ms-wax',
        'audio/xm'
    );
    
    // check REAL MIME type
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $type = finfo_file($finfo, $tmp );
    finfo_close($finfo);
    
    // check to see if REAL MIME type is inside $allowed array
    if( in_array($type, $allowed) ) {
        return true;
    } else {
        return false;
    }
}


function mime_content_type($filename) {

        $mime_types = array(

            // audio/video
            'mp3' => 'audio/mpeg',

        );

        $ext = strtolower(array_pop(explode('.',$filename)));
        if (array_key_exists($ext, $mime_types)) {
            return true;
        }
        else {
            return false;
    }
}





error_reporting(E_ERROR | E_PARSE);
$conn = new mysqli("13lobstersdj.13lobsters.com", "jsdj","djpwBB11","13lobstersdj");
if ($conn->connect_error) {
	echo "died";
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $conn->connect_error);
}


//echo "cookie is : " . $_COOKIE['FBname'];
$user_name = $_COOKIE['FBname'];
$user_id = $_COOKIE['FBid'];



//echo "user id is: " . $user_id . "...";

//$target_dir = "/JavaScriptDJ/mp3Files/ ";
//echo "current server directory is" . $_SERVER['DOCUMENT_ROOT'];
$target_dir = "http://13lobsters.com/dj/javascriptDJ/mp3Files/";
$server_target_dir = $_SERVER['DOCUMENT_ROOT'] . "/dj/javascriptDJ/mp3Files/";
//"http://wwwp.cs.unc.edu/Courses/comp426-f15/users/dlshaver/Codiad/workspace/cs426/DJProject/mp3Files/";
$_FILES["fileToUpload"]["name"] = preg_replace("/[^a-zA-Z0-9-_.]/", " ", $_FILES["fileToUpload"]["name"]);

echo "uploading..".$_FILES["fileToUpload"]["name"]."...";


$target_file = $target_dir.basename($_FILES["fileToUpload"]["name"]);
$server_target_file = $server_target_dir.basename($_FILES["fileToUpload"]["name"]);
//echo $target_file;
$name = $_FILES["fileToUpload"]["name"];
$size = $_FILES["fileToUpload"]["size"];

//if(mime_content_type($name)){
//	echo "these are audio files";
//}
//else{
//	echo "these are not audio files";
//}


	
	
if($name !=""){
	pathinfo($target_file,"mp3");
	if(mime_content_type($name)){
	// Check if image file is a actual image or fake image
		if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $server_target_file)) {
			//echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
		} else {
		   // echo "Sorry, there was an error uploading your file.";
		}
		$result = $conn->query("SELECT 'Title','Path' FROM songs WHERE Path = '$target_file'");	
		if($result->num_rows <=0){
			$result = $conn->query("INSERT INTO songs(id,Title,Path) VALUES ('','$name','$target_file')");
		}
		//adding user....
		$result = $conn->query("SELECT 'FBid','name' FROM user WHERE FBid = '$user_id' && name = '$user_name'");
		if($result->num_rows <= 0){
			$result = $conn->query("INSERT INTO user(id, FBid, name) VALUES ('','$user_id', '$user_name')");
		}
		//adding relational database entry...
		$result = $conn->query("SELECT 'FBid','Songid' FROM usersong WHERE FBid = '$user_id' && Songid = (SELECT id FROM songs WHERE Title = '$name')");
		if($result->num_rows <= 0){
			$result = $conn->query("INSERT INTO usersong(FBid, Songid, Title) VALUES ('$user_id', (SELECT id FROM songs WHERE Title = '$name'), '$name')");
			
		}
		
		
	}	
}
	$result = $conn->query("Select Title FROM usersong WHERE FBid='$user_id'");
	$rows = $result->num_rows;
	if($rows>0){
		for($i = 0;$i<$rows;$i++){
		$array = $result->fetch_array();
	  echo " <p id ='$array[0]' onclick='selected(this)'> $array[0] </p>";
		}
	}
	else{
		echo "You don't have any songs uploaded yet.";
	}

	//$result = $conn->query("INSERT INTO song (Title,Path) VALUES '$name','$target_file'");


?>