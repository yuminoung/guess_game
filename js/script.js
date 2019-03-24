/*
    Author: Yu Min Oung
    Date  : 24 March 2019
*/

let gameState = {
    incorrectGuesses: [],
    remainingGuesses: 10
};

let word = []


//print word tiles
function printTiles() {
    let tiles = document.getElementById('tiles')
    for (let i = 0; i < word.length; i++) {
        let tile = document.createElement('div')
        tile.className = 'col ' + word[i]
        tile.style = 'border:1px solid #000; text-align:center; color:white;'
        tile.innerHTML = word[i]
        tiles.appendChild(tile)
    }
}


function check() {

    var guessChar = document.getElementById('submit_guess').value
    document.getElementById('submit_guess').value = ''
    if (gameState['remainingGuesses'] == 1) {
        alert('you lose')
        reset()
    }
    else if (word.length == 0) {
        alert('you must submit a word first')
    }
    else if (guessChar.length != 1) {
        alert('guess can only contain 1 character')
    }
    else {
        console.log(word)
        console.log(guessChar)

        if (word.includes(guessChar)) {
            console.log('correct giess')
            let wordClass = document.getElementsByClassName(guessChar)
            for (let i = 0; wordClass.length > i; i++) {
                wordClass[i].style = 'border:1px solid #000; text-align:center; color:black;'
                console.log(wordClass[i])
            }

        }
        else {
            console.log('incorrect')
            gameState['remainingGuesses'] -= 1

            if (gameState['remainingGuesses'] == 0) {
                alert('you lose')
                reset()
                return;
            }

            gameState['incorrectGuesses'].push(guessChar)
            console.log(gameState)
            updateBoard()
        }
    }
}

function updateBoard() {
    let tbody = document.getElementById('gameboard')
    let trow = document.createElement('tr')
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')

    let rg = gameState['remainingGuesses']
    td1.innerHTML = gameState['incorrectGuesses'][9 - rg]
    td2.innerHTML = gameState['remainingGuesses']
    trow.appendChild(td1)
    trow.appendChild(td2)
    tbody.appendChild(trow)
}

//set new word for guessing
function setWord() {
    reset()
    let submit_word = document.getElementById('submit_word').value
    document.getElementById('submit_word').value = ''
    if (submit_word.length > 15) {
        alert('word must less than 15 chars')
        return;
    }
    word = submit_word.split('')
    printTiles()
}

//restart the game
function reset() {
    gameState['incorrectGuesses'] = []
    gameState['remainingGuesses'] = 10
    word = []
    document.getElementById('tiles').innerHTML = ''
    document.getElementById('gameboard').innerHTML = ''
}