let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

// initial config
let box = 32;
let direction = "up";
let food = {};
let snake = [];
let timer = 0;

function renderFrame() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

document.addEventListener('keydown', event => {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
})

function newFood() {
  food.x = Math.floor(Math.random() * 15 + 1) * box;
  food.y = Math.floor(Math.random() * 15 + 1) * box;

  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x == food.x && snake[i].y == food.y) newFood();
  }
}

function renderFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

function renderSnake() {

  // Move snake
  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);

  // Adjust snake position on border
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;

  // Check if the snake collided with its body
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) stopGame();
  }

  // Chekc if snake ate the food
  if (snakeX == food.x && snakeY == food.y) newFood();
  else snake.pop();

  // Render snake
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function renderScreen(bool) {
  if (bool) {
    timer = setInterval(function () {
      renderFrame();
      renderSnake();
      renderFood();
    }, 100);
  } else {
    clearInterval(timer);
  }
}

function startGame() {
  snake = [];
  snake.unshift({ x: 8 * box, y: 8 * box });
  if(!food.x) newFood();
  renderScreen(true);
}

function stopGame(){
  renderScreen(false);
  alert('Game over');
}

startGame();

