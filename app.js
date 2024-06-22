const wordDisplay=document.querySelector(".word-display");
const guessText=document.querySelector(".guesses-text b"); 
const keyboardDiv=document.querySelector(".keyboard");
const hangmanImage=document.querySelector(".hangman-box img");
const gamemodal=document.querySelector(".game-modal");
const playAgainBtn=document.querySelector(".play-again");

let CurrentWord,correctLetters,wrongGuessCount;
const maxGuesses=6;
const resetGame=()=>{
    correctLetters=[];
    wrongGuessCount=0;
    hangmanImage.src="images/hangman-0.svg";
    guessText.innerText=`${wrongGuessCount}/${maxGuesses}`;
    wordDisplay.innerHTML=CurrentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);
    gamemodal.classList.remove("show");

}
const getRandomWord=()=>{
    const{word,hint}=wordList[Math.floor(Math.random()*wordList.length)];
    CurrentWord=word;
    document.querySelector(".hint-text b").innerText=hint;
    resetGame();
}
const gameOver=(isVictory)=>{
    const modalText=isVictory?`You found the word: `:`The correct was:`;
    gamemodal.querySelector("img").src=`images/${isVictory?'victory':'lost'}.gif`;
    gamemodal.querySelector("h4").innerText=isVictory?'congrats!':'Game Over!';
    gamemodal.querySelector("p").innerHTML=`${modalText}<b>${CurrentWord}</b>`;
    gamemodal.classList.add("show");
}
const initGame=(button,clickedLetter)=>{
    if(CurrentWord.includes(clickedLetter)){
        [...CurrentWord].forEach((letter,index)=>{
            if(letter===clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")
                [index].innerText=letter;
                wordDisplay.querySelectorAll("li")
                [index].classList.add("guessed");
            }
        });
    }
    else{
        wrongGuessCount++;
        hangmanImage.src=`images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled=true;
    guessText.innerText=`${wrongGuessCount}/${maxGuesses}`;
    if(wrongGuessCount===maxGuesses)
        { return gameOver(false);}
    if(correctLetters.length===CurrentWord.length) 
       { return gameOver(true);}
}
for(let i=97;i<=122;i++)
    {
        const button=document.createElement("button");
        button.innerText=String.fromCharCode(i);
        keyboardDiv.appendChild(button);
        button.addEventListener("click",(e)=>initGame(e.target,String.fromCharCode(i)));

    }
    getRandomWord();
    playAgainBtn.addEventListener("click",getRandomWord);