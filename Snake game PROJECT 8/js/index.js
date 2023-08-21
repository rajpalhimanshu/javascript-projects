// Game constants and Variables

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 5
let score = 0
let lastPaintTime = 0;

let snakeArr = [
    { x: 15, y: 16 }
];

food = {
    x: 10, y: 11
}

// Game Functions

// This function control by game loop

let main = (ctime) => {
    window.requestAnimationFrame(main)
    // console.log(ctime) 
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

// This is my main game function 

let gameEngine = () => {
    // Part 1 : Updating the snake array & Food

    // Updating the snake
    gameOver = document.querySelector('#game-over');
    let isCollide = (snake) => {
       // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            gameOver.style.transition = 'all 2s linear';
            gameOver.style.transform = 'translate(1%,154%)';
            gameOver.style.visibility="visible";
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        gameOver.style.transition = 'all 2s linear';
        gameOver.style.transform = 'translate(1%,154%)';
        gameOver.style.visibility="visible";
        return true;
    }
        
    return false;
    }

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        // alert("Press any key to restart this game");
        snakeArr=[{x:13,y:14}]
        musicSound.play();
        score = 0;
    }

    // Update the food 

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        })
        let a=2;
        let b=16;
        food ={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)* Math.random())}
    }

    document.onkeydown = function (e) {
        if (e.keyCode == 13) {
            location.reload();
        }
    }
    // Moving the snake
    for (let i= snakeArr.length -2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y

    // Part 2 : Display the snake array & Food

    // Display the snake 

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

// This part of the code store its  game logic
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    // inputDir = { x: 0, y: -1 }; 
    GameStart.style.visibility='hidden'
    moveSound.play();
    musicSound.play();

    switch (e.key) {
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;
            console.log('ArrowUp')
            break;

        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;
            console.log('ArrowDown')
            break;

        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            console.log('ArrowLeft')
            break;

        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            console.log('ArrowRight')
            break;


        default:
            break;
    }

})


    // b1.addEventListener('click',()=>{
    //     location.reload();
    // })

   

