let body = document.querySelector('body');
let h2 = document.querySelector('h2');
let h3 = document.querySelector('h3');
let allBtns = document.querySelectorAll('.btn');

let btns = ["red", "blue", "green", "yellow"];
let userSeq = [];
let gameSeq = [];

let level = 0;
let highScore = 0;
let started = false;

document.addEventListener('keypress', function() {
    if(started == false) {
        started = true;
        console.log("Game Started");
    }
    levelUp();
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function btnFlash(btn) {
    btn.classList.add("flashBtn");
    setTimeout(function() {
        btn.classList.remove("flashBtn");
    }, 250);
}

for(btn of allBtns) {
    btn.addEventListener('click', userPress); 
}

function userPress() {
    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);


    checkAns(userSeq.length-1);
}

function checkAns(idx) {
    if(userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = `Game Over!. Press any key to start. \n Your Score is : ${level}`;
        if(highScore < level) {
            highScore = level;
            h3.innerText = `High Score: ${highScore}`;
        }
        resetGame();
        gameOver();
    }
}

function resetGame() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}

function gameOver() {
    body.classList.add("bg-red");
    setTimeout(function() {
        body.classList.remove("bg-red");
    }, 200);
}
