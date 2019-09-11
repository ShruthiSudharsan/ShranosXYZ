<?php

$playerName = $_POST['playerName'];
$score = $_POST["score"];

$servername = "localhost";
$username = "shranos_admin";
$password = "letsgo";
$dbname = "shranos_db";

// Create connection
$conn = new mysqli($servername,$username,$password,$dbname);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: ".$conn->connect_error);
}

// $sql = "INSERT INTO leaderboard_table (username_column, highscore_column) VALUES ('aNub', 0)";
$sql = "INSERT INTO leaderboard_table (username_column, highscore_column) VALUES ('" . $playerName . "', " . $score . ")";

if ($conn->query($sql)===TRUE) {
	// echo "New record created successfully";
	echo "your moms score added to leaderboard, thx noob";
} else {
	// echo "Error: ".$sql."<br>".$conn_error;
	echo "ERROR: PC LOAD LETTER";
}

$conn->close();

?>