const audioTurn = new Audio('MUSIC/ting.mp3');
const gameOver =  new Audio('MUSIC/gameover.mp3');

let turn = "X";
let isGameover= false

// function to change the turn

const changeTurn=()=>{
    return turn === 'X'?'0':'X'
}

// Function to check for a win
const checkWin = () =>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins=[  
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],

    ]

    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText +  " Won"
            gameOver.play();
             isGameover= true
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
        }
    })
}

// Game logic 

let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element =>{
    let boxText =element.querySelector('.boxtext');
    element.addEventListener('click',()=>{
        if(boxText.innerText === ''){
            boxText.innerText = turn;   
            turn =changeTurn();
            audioTurn.play();
            checkWin();
            if (!isGameover){
                let info =document.getElementsByClassName('info')
                info.innerText="Trun for "+turn
            }
        }

    })
})



// Add onclick listener to reset the Game

reset.addEventListener('click',()=>{
    let boxTexts =document.querySelectorAll('.boxtext');
    Array.from(boxTexts).forEach(e =>{
        e.innerText =''
    })
    turn ='X'
    isGameover= 
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"

})