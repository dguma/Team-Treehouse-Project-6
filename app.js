// JavaScript Document
let missed = 0;
const btnReset = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const onScreenKeyboard = document.getElementById('qwerty');
const lives = document.querySelectorAll('img');
const phrases = new Array(
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
		let letters =  document.createElement('li');
		letters.innerHTML = arr[i];
		if(arr[i].includes(' ')){
			letters.className = 'space';
		}else {
			letters.className = 'letter';
		}
	document.getElementById('phrase').appendChild(letters);
	}
}

addPhraseToDisplay(phraseArray);

function checkLetter(btnClicked){
	
    let letters = document.querySelectorAll('li');
    let matchingLetter = null; 
	
    for (let i = 0; i < letters.length; i++){
         if(letters[i].innerHTML === btnClicked.innerHTML){
            letters[i].className += ' show';
            matchingLetter += letters[i].innerHTML;
         }
    }
    return matchingLetter;
}


onScreenKeyboard.addEventListener('click', (e) => { 
	
	let letterFound = checkLetter(e.target); 
	
    if (e.target.tagName === 'BUTTON'){
        e.target.className = 'chosen';
    } 
	
	if (e.target.className === 'chosen'){	
        e.target.disabled = 'true';
	}
        
	if (letterFound === null){
        lives[missed].setAttribute('src', 'images/lostHeart.png');
		missed += 1;
    }
	
checkWin();

function checkWin (){
    const letters = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    const h2 = document.querySelector('.title')

    if (letters.length === show.length){
        overlay.className = 'win';
        h2.textContent = 'congratulations';
        overlay.style.display = 'flex';
        btnReset.textContent = 'exit';

    }else if (missed > 4 ){
        overlay.className = 'lose';
        h2.textContent = 'lost';
        overlay.style.display = 'flex';
        btnReset.textContent = 'exit'
    }   
	}
})




