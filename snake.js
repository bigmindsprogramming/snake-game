const BG_COLOUR = 'lightgrey';
const SNAKE_COLOUR = 'teal';
const FOOD_COLOUR = 'red';

let score = 0;
const scoreBoard = document.querySelector('.score')

function updateScore() {
    scoreBoard.textContent = score++;
}
function resetScore() {
    scoreBoard.textContent = score = 0;
}


const canvas = document.getElementById('canvas')
const plane = canvas.getContext('2d')

canvas.width = canvas.height = 400;

const FR = 10;
const S = 20;
const T = canvas.width/S;

let pos, vel, food, snake;


function init() {
    pos = {x: 10, y: 10}
    vel = {x:0, y:0}

    snake = [
        {x: 8, y: 10},
        {x: 9, y: 10},
        {x: 10, y: 10},
    ]
    randomFood()
}
init();

function randomFood() {
    
    food = {
        x: Math.floor(Math.random() * T), //8
        y: Math.floor(Math.random() * T), //10
    }
    for(let i of snake){
        if(i.x === food.x && food.y === i.y) {
            return randomFood();
        } 
    }
}

document.addEventListener('keydown', keydown);

function keydown(e){
    switch(e.keyCode) {
      case 37: {
        return vel = {x: -1, y: 0}
      }
      case 38: {
        return vel = {x: 0, y: -1}
      }
      case 39: {
        return vel = {x: 1, y: 0}
      }
      case 40: {
        return vel = {x: 0, y: 1}
      }
    }
  }

setInterval(() => {
    requestAnimationFrame(gameLoop);
}, 1000/FR);


function gameLoop() {
    plane.fillStyle = BG_COLOUR;
    plane.fillRect(0, 0, canvas.width, canvas.height);
  
    plane.fillStyle = SNAKE_COLOUR;
    for (let cell of snake) {
      plane.fillRect(cell.x*S, cell.y*S, S,S);
    }
  
    plane.fillStyle = FOOD_COLOUR;
    plane.fillRect(food.x*S,food.y*S,S,S);

    pos.x += vel.x;
    pos.y += vel.y;

    if(pos.x < 0 || pos.x > T || pos.y < 0 || pos.y > T) {
        init();
        resetScore();
    }

    if(food.x === pos.x && food.y === pos.y) {
        snake.push({...pos});
        pos.x += vel.x;
        pos.y += vel.y;
        updateScore();
        randomFood();
    }
    if(vel.x || vel.y) {
        for(let cell of snake) {
            if(cell.x === pos.x && cell.y ==pos.y) {
                return init();
            }
        }
        snake.push({...pos})
        snake.shift();
    }

    



}

