// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //this.width  = 110;
    //this.height = 70;
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    dt = 20;
    if (this.x >= 500 ){
        this.x = 10;
    }
    this.x += this.speed;
    this.checkCollission();
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var enemy1 = new Enemy(10, 60, 7);
var enemy2 = new Enemy(10, 145, 5);
var enemy3 = new Enemy(10, 225, 2);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
var Player = function(x,y,score) {
    this.image = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.score = 0;
};
// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    dt = 20;
};
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
    player.scoreCount();
};
//score.
Player.prototype.scoreCount = function() {
    ctx.font="30px Arial";
    ctx.fillStyle = 'red';
    ctx.fillText('SCORE : '+ player.score, 0, 40);
};
//text to show if player wins or collision occurs.
Player.prototype.showText = function() {
    ctx.font = "48px sans serif";
    if (this.y <= 0) {
        ctx.fillText('You Won!', 300, 40);
        setTimeout( function() { ctx.clearRect(300, 4, 250, 45);  }, 1000);
    } else {
        ctx.fillText('!!collision!!', 270, 40);
        setTimeout( function() { ctx.clearRect(270, 4, 250, 45);  }, 1000);
    }
};

//to reset player's position.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 390;
    this.update();
};
var player = new Player(200, 390);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
 document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// movment of player using arrow keys..
Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'up' :
        this.y -= 83 ;
        break;
        case 'down' :
        this.y += 83 ;
        break;
        case 'left' :
        this.x -= 100 ;
        break;
        case 'right' :
        this.x += 103 ;
        break;
    }
        if (this.y < 0) {
        this.y = 0;
    }
        if (this.x < 0) {
        this.x = 0;
    }
        if (this.y > 390) {
        this.y = 390;
    }
        if (this.x > 400) {
        this.x = 400;
    }
        if (this.y <= 0) {
        //when player wins show massage and restart the game.
        player.showText();
        player.score += 10 ;
        player.reset();
    }

    //check for collision
        for (var i = 0; i < allEnemies.length; i++) {
        allEnemies[i].checkCollission(i);
    }
};
    Enemy.prototype.checkCollission = function(i) {
        //player dimentions = 80:87  and  enemy dimentions=  100:67
        if (this.x < player.x + 80 && this.x + 80 > player.x && this.y < player.y + 67 && 67 + this.y > player.y) {
            player.showText();
            player.score -= 5;
            player.reset();
        }
    };


