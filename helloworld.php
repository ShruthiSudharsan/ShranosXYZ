<?php

$servername = "localhost";
$username = "shranos_admin";
$password = "letsgo";
$dbname = "ShanosDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO foo_table (username_column, highscore_column, urmom_column) VALUES ('topher', 1300, 'you are mom goes here')";

if ($conn->query($sql) === TRUE) {
	echo "New record created successfully";
} else { 
	echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>