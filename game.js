// Declare Main 'game' Variable (global)
var game = new Phaser.Game(window.outerWidth, window.outerHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

// Declare Global Variables
var map;
var layer;
var cursors;
var lettuce;
var disco = [];
var points = 0;
var scoreboard;
var music;
var glitch;
var timer;
var secondsLeft = 60;
var random;
var gemcolor;
var size = 0.5;
var glitch2;





function preload() {
  


    // Load Tilemap & Tileset
    game.load.tilemap('map', 'assets/EpicTilemap2.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', 'assets/space.png');

    // Shruthi, you should load all of your infinity stone images here!
    // note, this will not put the stones in the game, it will simply
    // load the images so we can use them in the game if we so choose.
    game.load.image('blue', 'assets/blue.png');
    game.load.image('red', 'assets/red.png');
    game.load.image('orange', 'assets/orange.png');
    game.load.image('yellow', 'assets/yellow.png');
    game.load.image('pink', 'assets/pink.png');
    game.load.image('green', 'assets/green.png');

    // Load Sprites
    game.load.image('lettuce', 'assets/thanosShrek.png');

    // Krish I want you to write some code that is nearly identical to line 17,
    // however, instead of writing mouse, replace mouse with cheese... GO!
    game.load.image('disco', 'assets/thanosGauntlet.png');
    game.load.audio('music', 'assets/music.mp3');
    game.load.audio('glitch', 'assets/glitch.mp3');
    game.load.audio('glitch2', 'assets/glitch2.mp3');


}



function create() {

    //  Because we're loading CSV map data we have to specify the tile size here or we can't render it

    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('map', 100, 100); // Tile Dimensions 1500px by 1000px

    //  Now add in the tileset
    map.addTilesetImage('tiles');
    
    //  Create our layer
    layer = map.createLayer(0);

    //  Resize the world
    layer.resizeWorld();

    // Add sprites
    // REFERENCE get window width: window.outerWidth
    // REFERENCE: get window height: window.outerHeight
    // REFERENCE: Rocket Sprite Dimensions: 186px, by 351px
    var centerMapCenterScreenX = 5000 + (window.outerWidth / 2); 
    var centerMapCenterScreenY = 5000 + (window.outerHeight / 2);
    // var centerMapCenterScreenX = 7500; 
    // var centerMapCenterScreenY = 7500;
    // position in center of open world @ 7500px x-coordinate, 7500px y-coordinate of 15,000 x 15,000 px Tilemap
    lettuce = game.add.sprite(centerMapCenterScreenX, centerMapCenterScreenY, 'lettuce');


    lettuce.scale.setTo(size, size);

    // Shruthi, next write a for-loop to add more pieces of disco to the
    // disco array. Step one, look up how to write a for loop.
    // just remember to start at 1 instead of 0, because we already
    // added piece of disco number 0. We will probably need to generate random
    // numbers to select where to put the new pieces of disco. Go!
    for (var i = 0; i <= 99; i++) {
        var x = centerMapCenterScreenX;
        var y = centerMapCenterScreenY;
        // Shruthi, google how to do random numbers in javascript... go!
        // same for you Shruthi! Go!
        var randomNumber1 = Math.floor(Math.random() * 7500) + 1;
        var randomNumber2 = Math.floor(Math.random() * 7500) + 1;
        var randomNumber3 = Math.floor(Math.random() * 10) + 1;
        var randomNumber4 = Math.floor(Math.random() * 10) + 1;

        if (randomNumber3 < 6) {
            randomNumber1 = randomNumber1 * (-1); // make negative
        }

        if (randomNumber4 < 6) {
            randomNumber2 = randomNumber2 * (-1); // make negative
        }



        var newX = x + randomNumber1;
        var newY = y + randomNumber2;
        // HERE SHRUTHI, INSTEAD OF CREATING NEW SPRITES WITH the
        // IMG NAME 'disco' WE WILL USE A RANDOM NUMBER GENERATOR
        // TO RANDOMLY INSERT INFINITY STONE NAMES. BUT FOR Now
        // JUST PUT ONE INFINITY STONE COLOR
        random = Math.floor(Math.random() * 6);  
        if (random == 0) {
            gemcolor = 'blue';
        } else if (random == 1) {
            gemcolor = 'red';
        } else if (random == 2) {
            gemcolor = 'pink';
        } else if (random == 3) {
            gemcolor = 'yellow';
        } else if (random == 4) {
            gemcolor = 'orange';
        } else if (random == 5) {
            gemcolor = 'green';
        }
        disco[i] = game.add.sprite(newX, newY, gemcolor);
        disco[i].scale.setTo(0.5, 0.5);
    }

    // Figure out how to make the disco smaller
    // something like... disco.setScale(0.33);


    // set center of rotation to middle of sprite 
    // REFERENCE: http://www.html5gamedevs.com/topic/2985-how-to-set-center-of-rotation/
    lettuce.anchor.setTo(0.5, 0.5); 

    //  Allow cursors to scroll around the map
    cursors = game.input.keyboard.createCursorKeys();

    /*
    var help = game.add.text(16, 16, 'Arrows to scroll', { font: '14px Arial', fill: '#ffffff' });
    help.fixedToCamera = true;
    */
    scoreboard = game.add.text(16, 16, points.toString(), {font: '50px Arial', fill: '#B10071' });
    scoreboard.fixedToCamera = true;
    

    // Position Camera Approximately in Center of World
    game.camera.x = 7500;
    game.camera.y = 7500;

    game.physics.enable(lettuce, Phaser.Physics.ARCADE);

    lettuce.angle = 270; // rotate sprite to face north



    // enable physics for mouse and 100 pieces of cheese
    game.physics.enable(lettuce, Phaser.Physics.ARCADE);  
    for (var i = 0; i <= 99; i++) {
        game.physics.enable(disco[i], Phaser.Physics.ARCADE);    
    }

    music = game.add.audio('music');
    music.play();

    glitch2 = game.add.audio('glitch2');


    timer = game.add.text(window.innerWidth-450, 0, 'Time left:' + secondsLeft, { font: "65px Arial", fill: "#B10071"});
    timer.fixedToCamera = true;

    setInterval(function() { 
        if (secondsLeft > 0) {
            secondsLeft--; 
            timer.setText('Time left: ' + secondsLeft); 
        }
    }, 1000);


}

function update() {
    if (secondsLeft <= 0) {
        lettuce.body.velocity.x = 0;
        lettuce.body.velocity.y = 0;
        lettuce.body.angularVelocity = 0;
        game.physics.arcade.velocityFromAngle(lettuce.angle, 0, lettuce.body.velocity);
        // window.location = "gameover.html";
        var txt;
        var r = confirm("Play again?!");
		
	    // Guys, we need to write a little javascript here
	    // to add the user's score to our database
	    var playerName = "nUb";
	    var score = points;
		
	    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // document.getElementById("demo").innerHTML = this.responseText;
				alert(this.responseText);
            }
        };
        xhttp.open("POST", "add_score_to_leaderboard.php", true);
		var myFormData = new FormData();
		myFormData.append("playerName", playerName);
		myFormData.append("score", score);
        xhttp.send(myFormData);
		
		
		
        if (r == true) {
            window.location = "leaderboard_prototype.php";
        } else {
            window.location = "gameover.html";
        }
        return "nothing!";
    } else {
        for (var i = 0; i <= 99; i++) {
            game.physics.arcade.collide(lettuce, disco[i], collisionHandler, null, this);
        }

        lettuce.body.velocity.x = 0;
        lettuce.body.velocity.y = 0;
        lettuce.body.angularVelocity = 0;

        // Rotate Big Falcon Rocket on Left/Right Arrow Key Press (left/right)    
        if (cursors.left.isDown) {
            lettuce.angle -= 4; // rotate rocket
        } else if (cursors.right.isDown) {
            lettuce.angle += 4; // rotate rocket
        }

        if(cursors.up.isDown) {
            game.physics.arcade.velocityFromAngle(lettuce.angle, 750, lettuce.body.velocity);
        }

        // Set Camera to Follow Rocket
        // REFERENCE: Rocket Sprite Dimensions: 186px, by 351px
        game.camera.x = lettuce.body.x - (window.outerWidth / 2) + (186);
        game.camera.y = lettuce.body.y  - (window.outerHeight / 2) + (351 / 2);
        // game.camera.x = big_falcon_rocket.body.x;
        // game.camera.y = big_falcon_rocket.body.y;
    }

}

function render() {
    // empty
}

function collisionHandler(obj1, obj2) {
    // mouse.destroy();
    //console.log(obj1);
    // console.log(obj2);
    glitch2.play();
    obj2.destroy();
    points = points + 1;
    console.log(points);
    scoreboard.text = points.toString();
    size = size + 0.05;
    lettuce.scale.setTo(size, size);
}