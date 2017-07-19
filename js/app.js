// Enemies our player must avoid
var Enemy = function(Start_enemy_y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.y = (Start_enemy_y * 83) + 60;
    this.x = -200;
    //initial speed
    this.speed = this.getSpeed();
    // this image of enemy that player run of it
    this.sprite = 'images/enemy-bug.png';
};
//// reset all bugs_back when start location again
Enemy.prototype.bugReset = function() {
    var reset = 0;
    while (reset < allEnemies.length) {
        allEnemies[reset].x = -200;
        reset++;
    }
};
//// call back the speed when it called.
Enemy.prototype.getSpeed = function() {
    var speed = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
    return speed;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // make sure the game runs at the same speed 
    //Gets the bugs to move at random initital speed speeds
    this.x += (this.speed * dt);
    //resets position of bug after it hits certian spot and re-assigns a speed to it
    if (this.x > 525) {
        this.x = -200;
        this.speed = this.getSpeed();
    }
};
//// update that will change speed and orientaion when bug is off screen
Enemy.prototype.updateSpeedOrientation = function(dt) {
    a
    return speed = (Math.floor(Math.random() * (250 - 100 + 1)) + 100) * dt;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//// my player that I play with it and avoid enemy
var Player = function(start_P_x, start_P_y) {
    this.sprite = 'images/char-pink-girl.png';
    this.x = start_P_x;
    this.y = start_P_y;
    this.change_p_x = 0;
    this.change_p_y = 0;
};
//// to update the position of player 
Player.prototype.update = function() {
    if (this.x + this.change_p_x < 0) {
        this.x = 0;
    } else if (this.x + this.change_p_x > 400) {
        this.x = 400;
    }
    //// when the player arrive to the river then back to real position to achieve new score.
    else if (this.y + this.change_p_y < 40) {
        this.y = 370;
    } else if (this.y + this.change_p_y > 370) {
        this.y = 370;
    } else {
        this.x += this.change_p_x;
        this.y += this.change_p_y;
    }
    this.change_p_x = 0;
    this.change_p_y = 0;
    this.collect();
};
//// check if wrong something is happen so reset everything from begin.
Player.prototype.collect = function () {
    
    for(var reset=0; reset < allEnemies.length; reset++) {
        if (this.x < allEnemies[reset].x + 50 && this.x + 50 > allEnemies[reset].x && this.y <                                    allEnemies[reset].y + 30 && this.y + 30 > allEnemies[reset].y) {
            console.log("corrrrrrect");
            this.Player_reset();
            allEnemies[reset].bugReset();
        }    
    }
};
//// to reset player again
Player.prototype.Player_reset = function() {
    this.x = 200;
    this.y = 400;
};
//// Draw player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
///// to handle the input value 
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'right':
            this.change_p_x = 100;
            break;
        case 'left':
            this.change_p_x = -100;
            break;
        case 'up':
            this.change_p_y = -80;
            break;
        case 'down':
            this.change_p_y = 80;
            break;
        default:
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 370);
var allEnemies = [];
var reset = 0;
while (reset < 4) {
    allEnemies.push(new Enemy(reset));
    reset++;
}

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