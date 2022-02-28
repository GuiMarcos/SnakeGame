function main(){
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fps = 20;

class Snake {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.tail = [{ x: this.x, y: this.y }];
        this.rotateX = 1;
        this.rotateY = 0;
        this.color = color;
    }

    move() {
        let newRect;
        if (this.rotateX === 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateY === 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        } else if (this.rotateX === -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateY === -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }
        for (let i in this.tail) {
            if (newRect.x === this.tail[i].x && newRect.y === this.tail[i].y) {
                gameOver = true;
                break;
            }
        }
        this.tail.shift();
        this.tail.push(newRect);
    }
}

class Apple {
    constructor() {
        let isTouching;
        while (true) {
            this.color = '#A91B0D';
            this.size = snake.size;
            isTouching = false;
            this.x = Math.floor(Math.random() * (canvas.width) / snake.size) * snake.size;
            this.y = Math.floor(Math.random() * (canvas.height) / snake.size) * snake.size;
            for (let i = 0; i < snake.tail.length; i++) {
                if (this.x === snake.tail[i].x && this.y === snake.tail[i].y) {
                    isTouching = true;
                }
            }
            if (!isTouching) {
                break;
            }
        }
    }
}
let snakeColor = 'rgb(115, 122, 50)';
let pieceLenght = 20;
let snake = new Snake(100, 100, pieceLenght, snakeColor);
let apple = new Apple();
let gameOver = false;

window.onload = () => {
    gameLoop();
}


const gameLoop = () => {
    setInterval(game, 1000 / fps);
}

function game() {
    update();
    if (gameOver) {
        alert(`Game Over! Score: ${snake.tail.length - 1 }`);
        gameOver = false;
        document.location.reload(true);
    }
    draw();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    snake.move();
    checkWall();
    eatApple();
}

function checkWall() {
    if (snake.tail[snake.tail.length - 1].x < 0) {
        snake.tail[snake.tail.length - 1].x = canvas.width;
    } else if (snake.tail[snake.tail.length - 1].x === canvas.width) {
        snake.tail[snake.tail.length - 1].x = 0;
    } else if (snake.tail[snake.tail.length - 1].y < 0) {
        snake.tail[snake.tail.length - 1].y = canvas.height;
    } else if (snake.tail[snake.tail.length - 1].y === canvas.height) {
        snake.tail[snake.tail.length - 1].y = 0;
    }
}

function eatApple() {
    if (snake.tail[snake.tail.length - 1].x === apple.x && snake.tail[snake.tail.length - 1].y === apple.y) {
        snake.tail.push({ x: apple.x, y: apple.y });
        apple = new Apple();
    }
}

function draw() {
    paintCanvas(0, 0, canvas.width, canvas.height, 'black');
    for (let i = 0; i < snake.tail.length; i++) {
        paintCanvas(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, snake.color);
    }
    paintCanvas(apple.x, apple.y, apple.size, apple.size, apple.color);
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${(snake.tail.length - 1) } `, 15, 30);
}

function paintCanvas(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height)
}

window.addEventListener('keydown', (e) => {
    setTimeout(() => {
        switch (e.keyCode) {
            case 37:
                if (snake.rotateX !== 1) {
                    snake.rotateX = -1;
                    snake.rotateY = 0;
                }
                break;
            case 38:
                if (snake.rotateY !== 1) {
                    snake.rotateX = 0;
                    snake.rotateY = -1;
                }
                break;
            case 39:
                if (snake.rotateX !== -1) {
                    snake.rotateX = 1;
                    snake.rotateY = 0;
                }
                break;
            case 40:
                if (snake.rotateY !== -1) {
                    snake.rotateX = 0;
                    snake.rotateY = 1;
                }
                break;
            default:
                break;
        }
    }, 1);
})
}
main();
