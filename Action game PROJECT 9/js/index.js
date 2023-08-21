score = 0;
cross = true;

let GameMusic = new Audio('music/music.mp3');
let GameOverMusic = new Audio('music/gameover.mp3');

setTimeout(() => {
    GameMusic.play();
}, 500);

obstacle = document.querySelector('.obstacle');
obstacle.classList.remove('oAnimation')
gs = document.querySelector('.GameStart')
setTimeout(() => {
    obstacle.classList.add('oAnimation')
    gs.style.transition = 'all 2s ease-in-out';
    gs.style.transform = 'translate(0%,-400%)';
}, 2000);
document.onkeydown = function (e) {
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('dAnimation');
        setTimeout(() => {
            dino.classList.remove('dAnimation');
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 300) + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = (dinoX - 300) + "px"
    }
    if(e.keyCode == 13){
        location.reload();
    }
     
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.game-over');
    obstacle = document.querySelector('.obstacle');

    dX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
    dY = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'))

    oX = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'))
    oY = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'))

    offSetX = Math.abs(dX - oX);
    offSetY = Math.abs(dY - oY);
    // console.log(offSetX, offSetY);
    if (offSetX < 80 && offSetY < 52) {
        obstacle.classList.remove('oAnimation');
        GameMusic.pause();
        GameOverMusic.play();
        setTimeout(() => {
            GameOverMusic.pause();
        }, 1000);
        gameOver.style.visibility = 'visible'
        gameOver.style.transition = 'all 2s linear';
        gameOver.style.transform = 'translate(5%,154%)';
    }
    else if (offSetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
       
        setTimeout(() => {
            cross = true;
               
        if (score > hiscoreval) {
            let hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            highScoreCont.innerHTML = "HighScore :" +hiscoreval;
            hsc.style.visibility='visible'
            setTimeout(() => {
                hsc.style.visibility='hidden'
            },1000);

        }

        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.002;
            obstacle.style.animationDuration = newDur + 's';
            // console.log('New animation duration: ', newDur)
        }, 500);

    }
    


}, 10);
let hiscore = localStorage.getItem("hiscore");
    if(hiscore === null){
        hiscoreval = 0;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
    }
    else{
        hiscoreval = JSON.parse(hiscore);
        highScoreCont.innerHTML = "HiScore: " + hiscore;
    }
     

function updateScore(score) {
    scoreCont.innerHTML = "Score: " + score
}