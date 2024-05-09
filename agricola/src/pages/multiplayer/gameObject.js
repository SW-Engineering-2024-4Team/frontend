
// PlayerBall.js
export class PlayerBall {
    constructor(id, color, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
        this.state = 1;
        this.radius = 16;
        this.playerSpeed = 4;
    }
}

// EnemyBall.js
export class EnemyBall {
    constructor(x, y, destinationX, destinationY, wall) {
        this.color = "#000000";
        this.x = x;
        this.y = y;
        this.destinationX = destinationX;
        this.destinationY = destinationY;
        this.initialX = x;
        this.initialY = y;
        this.wall = wall;
        this.radius = 10;
        this.aliveTime = 300;
        this.speedX = 0;
        this.speedY = 0;
    }
}

// StraightEnemyBall.js
export class StraightEnemyBall {
    constructor(x, y, destinationX, destinationY, wall) {
        this.color = "#000000";
        this.x = x;
        this.y = y;
        this.destinationX = destinationX;
        this.destinationY = destinationY;
        this.initialX = x;
        this.initialY = y;
        this.wall = wall;
        this.radius = 10;
        this.aliveTime = 300;
    }
}

// ItemBall.js
export class ItemBall {
    constructor(x, y, destinationX, destinationY, wall, name) {
        this.color = "#6f4e37";
        this.x = x;
        this.y = y;
        this.destinationX = destinationX;
        this.destinationY = destinationY;
        this.initialX = x;
        this.initialY = y;
        this.wall = wall;
        this.radius = 20;
        this.aliveTime = 1000;
        this.name = name;
    }

    getColor(name) {
        return name === "hotsix" ? "#0067a3" : this.color;
    }
}