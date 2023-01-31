"use strict";

var gameArray = new Array(9);
var flagArray = [];
const playGround = document.querySelector('#playground');
const message = document.querySelector('#message');
const restart = document.querySelector('#restart');
const box = document.querySelectorAll('.box');

box.forEach(function(elem,key){
    elem.addEventListener('mouseover', function(){
        let [room] = elem.children;
        const player = getPlayer();
        const mark = (player === 'player1') ? 'O' : 'X';
        if(!gameArray[key]){
            room.innerText = mark;
            (mark === 'O') ? elem.classList.add('hover-success') : elem.classList.add('hover-danger');
        }
    });
    elem.addEventListener('mouseout', function(){
        let [room] = elem.children;
        const player = getPlayer();
        const mark = (player === 'player1') ? 'O' : 'X';
        if(!gameArray[key]){
            room.innerText = '';
            (mark === 'O') ? elem.classList.remove('hover-success') : elem.classList.remove('hover-danger');
        }
    });
    elem.addEventListener('click', function(){
        let [room] = elem.children;
        const player = getPlayer();
        message.innerText = (player === 'player1') ? "player2's turn" : "player1's turn";
        const mark = (player === 'player1') ? 'O' : 'X';
        if(!gameArray[key]){
            gameArray[key] = mark;
            room.innerText = mark;
            (mark === 'O') ? elem.classList.add('text-success') : elem.classList.add('text-danger');
            elem.style.cursor = 'not-allowed';
        }
        if(getWinner()){
            message.innerText = `${player} is winner`;
            playGround.style.pointerEvents = 'none';
            console.log()
            gameOver();
            scoreUpdate(player);
        }
        else{
            flagArray.push(getWinner());
        }

        if(flagArray.length === 9){
            message.innerText = 'game is drawn';
            playGround.style.pointerEvents = 'none';
            gameOver();
            scoreUpdate();
        }
    });
});

function getPlayer(){
    const resultArray = gameArray.filter(item => item);
    if(resultArray && resultArray.length > 0){
        const size = resultArray.length;
        return (size % 2 !== 0) ? 'player2' : 'player1';
    }else{
        return 'player1';
    }
}

function getWinner(){
    if(gameArray[0] && gameArray[1] && gameArray[2] && gameArray[0] === gameArray[1] && gameArray[1] === gameArray[2]){
        return true;
    }else if(gameArray[3] && gameArray[4] && gameArray[5] && gameArray[3] === gameArray[4] && gameArray[4] === gameArray[5]){
        return true;
    }else if(gameArray[6] && gameArray[7] && gameArray[8] && gameArray[6] === gameArray[7] && gameArray[7] === gameArray[8]){
        return true;
    }else if(gameArray[0] && gameArray[3] && gameArray[6] && gameArray[0] === gameArray[3] && gameArray[3] === gameArray[6]){
        return true;
    }else if(gameArray[1] && gameArray[4] && gameArray[7] && gameArray[1] === gameArray[4] && gameArray[4] === gameArray[7]){
        return true;
    }else if(gameArray[2] && gameArray[5] && gameArray[8] && gameArray[2] === gameArray[5] && gameArray[5] === gameArray[8]){
        return true;
    }else if(gameArray[0] && gameArray[4] && gameArray[8] && gameArray[0] === gameArray[4] && gameArray[4] === gameArray[8]){
        return true;
    }else if(gameArray[2] && gameArray[4] && gameArray[6] && gameArray[2] === gameArray[4] && gameArray[4] === gameArray[6]){
        return true;
    }else{
        return false;
    }
}

function gameOver(){
    restart.classList.remove('invisible');
}

document.querySelector('#restart-btn')
.addEventListener('click', function(){
    restart.classList.add('invisible');
    playGround.style.pointerEvents = 'initial';
    gameArray = new Array(9);
    flagArray = [];
    console.log(gameArray);
    message.innerText = "player1's turn";
    box.forEach(function(elem,key){
        let [room] = elem.children;
        room.innerText = '';
        elem.style.cursor = 'pointer';
        elem.classList.remove('text-success');
        elem.classList.remove('text-danger');
        elem.classList.remove('hover-success');
        elem.classList.remove('hover-danger');
    });
});

function scoreUpdate(winnerPlayer=undefined){
    const target = winnerPlayer ? document.querySelector(`#${winnerPlayer}`) : document.querySelector('#draw');
    let score = parseInt(target.innerText);
    target.innerText = score + 1;
}