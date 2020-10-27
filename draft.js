// JavaScript Document
let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
let btnReset = document.querySelector('.btn__reset');
let overlay = document.getElementById('overlay');
let missed = 0;
const keyboard = document.getElementById('qwerty');
const tries = document.querySelectorAll('img');

let phrases = new Array(
	"have a good one",
	"good morning",
	"sleep tight",
	"pardon me",
	"excuse me"
);

btnReset.addEventListener('click', () => {
	overlay.style.display = "none";
});

function getRandomPhraseAsArray(arr) {
	let randomNum = Math.floor(Math.random() * arr.length);
	arr = arr[randomNum].split('');
	return arr;
}

const phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {

	for(let i = 0; i < arr.length; i++){
		let list =  document.createElement('li');
		list.innerHTML = arr[i];
		if(arr[i].includes(' ')){
			list.className = 'space';
		}else {
			list.className = 'letter';
		}
		
		document.getElementById('phrase').appendChild(list);
	
	}
}

addPhraseToDisplay(phraseArray);

function checkLetter (button){
    let letter = document.querySelectorAll('li'); //Letter spots within the phrase
    let match = null; 
    for (let i = 0; i < letter.length; i++){ // Letter length is the length of the phrase
         if(letter[i].textContent === button.textContent){ //Compares the chosen letter to whatever the button says
            letter[i].className = 'show letter'; // Gives the chosen letter the class name of show
            match += letter[i].textContent;
         }
    }
    return match;
};


keyboard.addEventListener('click', (e) => { 
    if (e.target.tagName === 'BUTTON'){    
        e.target.className = "chosen"; //adds class of chosen if button is clicked
    } if (e.target.className === 'chosen'){
        e.target.disabled = "true"; //disables button if it has been selected
        let letterFound = checkLetter(e.target); 
        if (letterFound === null){
            missed += 1;
            tries[missed - 1 ].src = "images/lostHeart.png"; // removes the hearts
        }
        checkWin();
    }  
});



function checkWin (){
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    let h2 = document.querySelector('.title')

    if (letter.length === show.length){
        overlay.className = 'win';
        h2.textContent = 'you win!!!';
        overlay.style.display = 'flex';
        btnReset.textContent = 'You win game over!';

    }else if (missed > 4 ){
        overlay.className = 'lose';
        h2.textContent = 'You lose!!!';
        overlay.style.display = 'flex';
        btnReset.textContent = 'You love, Gameover!'
     }   
};
