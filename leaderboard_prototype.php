<?php

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
// $sql = "INSERT INTO leaderboard_table (username_column, highscore_column) VALUES ('" . $playerName . "', " . $score . ")";

$sql = "SELECT * FROM leaderboard_table";

$result = $conn->query($sql);

$playerArray = []; // create empty array
$scoreArray = []; // create empty array

echo "<h1>Leaderboard</h1>";
echo "<h2>NOT YET ORDERED... WHOOPS, O WELL</h2>";
$i = 0;
while ($row = $result->fetch_assoc()) {
	// echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
  /*
	$player = $row["username_column"];
	$score = $row["highscore_column"];
	echo "<p>$player: $score</p>";
	echo "<hr>";
	*/
	$playerArray[$i] = $row["username_column"];
	$scoreArray[$i] = $row["highscore_column"];
	$i = $i + 1;
}

// BUBBLE SORT SCORES...
$keepSorting = true;
while ($keepSorting == true) {
	$keepSorting = false;
  // we need to make a for loop, that will iterate through our list of SCORES
	for ($i = 1; $i < count($scoreArray); $i++) {
		$playerPlaceholder = $playerArray[$i - 1];
		$scorePlaceholder = $scoreArray[$i - 1];
		if ($scoreArray[$i - 1] < $scoreArray[$i]) {
			$scoreArray[$i - 1] = $scoreArray[$i];
			$scoreArray[$i] = $scorePlaceholder;
			$playerArray[$i - 1] = $playerArray[$i];
			$playerArray[$i] = $playerPlaceholder;
			$keepSorting = true;
		}
	}
}

// Print Out SCORES
// we need to make a for loop, that will iterate through our list of SCORES
for ($i = 0; $i < count($scoreArray); $i++) {
  echo "<p>Player: {$playerArray[$i]}</p>";
	echo "<p>Score: {$scoreArray[$i]}</p>";
	echo "<hr>";

}

//

$conn->close();

?>