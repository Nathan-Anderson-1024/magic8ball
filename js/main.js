import { moveTable, inputMemory, answerMemory } from "../js/createTable.js";
import { stopReload } from "./stopReload.js";
import { sleep } from "./sleep.js";

// Answers the 8ball can give
const answerArray = [
    'Definitely.',
    'No.',
    'Possibly.',
    'There is a small chance.',
    'It is very likely.',
    'No chance.',
    'My sources say yes!',
    'Without a doubt yes!',
    'Hazy, but I say it will happen',
    "You will",
    'Concentrate and ask again',
    'No way'
]

let randomNum; //defines global variable randomNum

const noSubmitForm = document.getElementById("form");
noSubmitForm.addEventListener('submit', stopReload);


const randomNumberGenerator = () => {
    randomNum = Math.floor(Math.random() * answerArray.length);
    return randomNum;
}

const returnAnswer = () => {
    answerMemory.push(answerArray[randomNum]);
    alert(answerArray[randomNum]);
    document.getElementById("message").value = '';
}

async function spinBall() {
    const insideBall = document.getElementById('options-text');
    let x = 1;
    for (const answer of answerArray) {
        await sleep(x);
        insideBall.innerHTML = answer;
        x += 25;
    }
    insideBall.innerHTML = answerArray[randomNum];
}

// Capture user question and check if its already been asked before.
const getUserQuestion = () => {
    const userInput = document.getElementById("message").value.toLowerCase(); //captures user question
    if (userInput === '' || userInput.length < 5) {
        return alert('Please ask a valid question.');
    }
    //if question hasnt been asked then return an answer and push the question into memory.
    else if (inputMemory.includes(userInput) === false && userInput.includes('will')) {
        inputMemory.push(userInput);
        randomNumberGenerator();
        spinBall().then(() => {
            returnAnswer();
            moveTable();
            
        })
    }
    else if (!userInput.includes('will')) {
        return alert("Please start your question with 'Will'.");
    }
    // if question has been asked then return the question and the answer that was given at the time.
    else {
        const userInputIndex = inputMemory.findIndex(element => element === userInput);
        const answerMemoryIndex = answerMemory[userInputIndex];
        const insideBall = document.getElementById('options-text');
        insideBall.innerHTML = answerMemoryIndex;
        return alert(`You already asked me '${userInput}', my answer is still '${answerMemoryIndex}'.`);
    }
}

const submitBtn = document.getElementById('submit-button');
submitBtn.addEventListener('click', getUserQuestion);