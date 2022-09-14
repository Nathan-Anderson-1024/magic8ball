import { moveTable, inputMemory, answerMemory } from "../js/createTable.js";
import { stopReload } from "./stopReload.js";
import { sleep } from "./sleep.js";
//WHO answers the 8ball can give
const whoAnswers = ['Robert Downey Jr.', 'Emma Stone', 'SpongeBob SquarePants', 'Sandra Bullock', 'Brad Pitt', 'Natalie Portman',
'Leonardo DiCaprio', 'Scarlett Johansson', 'Patrick Star'];

// WHEN answers the 8ball can give
const whenAnswers = ['Tomorrow', 'In two days', 'In a week', 'In a month', 'In five years', 'Never', 'In one year', 'In 3 months', 'In six months',
'In five days'];

//WHY answers the 8ball can give
const whyAnswers = ['Whynot', 'Because I said so', 'No one knows', 'To keep things interesting', 'Because of a bet'];

//WHERE answers the 8ball can give
const whereAnswers = ['The Bahamas', 'Disneyland', 'Disney World', 'Fresno, CA', 'Antartica', 'The North Pole', 'The South Pole', 
'The East Coast', 'The West Coast', 'At the mall'];

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


export const randomNumberGenerator = (array) => {
    randomNum = Math.floor(Math.random() * array.length);
    return randomNum;
}

const returnAnswer = (array) => {
    answerMemory.push(array[randomNum]);
    alert(array[randomNum]);
    document.getElementById("message").value = '';
}

async function spinBall(array) {
    const insideBall = document.getElementById('options-text');
    let x = 1;
    for (const answer of array) {
        await sleep(x);
        insideBall.innerHTML = answer;
        x += 25;
    }
    insideBall.innerHTML = array[randomNum];
}

// Capture user question and check if its already been asked before.
const getUserQuestion = () => {
    const userInput = document.getElementById("message").value.toLowerCase(); //captures user question
    if (userInput === '' || userInput.length < 5) {
        return alert('Please ask a valid question.');
    }
    else if (!inputMemory.includes(userInput) && userInput.substring(0,3).includes('who')) {
        inputMemory.push(userInput);
        randomNumberGenerator(whoAnswers)
        spinBall(whoAnswers).then(() => {
            returnAnswer(whoAnswers);
            moveTable();
            
        })
    }
    else if (!inputMemory.includes(userInput) && userInput.substring(0,4).includes('when')) {
        inputMemory.push(userInput);
        randomNumberGenerator(whenAnswers)
        spinBall(whenAnswers).then(() => {
            returnAnswer(whenAnswers);
            moveTable();
            
        })
    }
    else if (!inputMemory.includes(userInput) && userInput.substring(0,3).includes('why')) {
        inputMemory.push(userInput);
        randomNumberGenerator(whyAnswers)
        spinBall(whyAnswers).then(() => {
            returnAnswer(whyAnswers);
            moveTable();
            
        })
    }
    else if (!inputMemory.includes(userInput) && userInput.substring(0,5).includes('where')) {
        inputMemory.push(userInput);
        randomNumberGenerator(whereAnswers)
        spinBall(whereAnswers).then(() => {
            returnAnswer(whereAnswers);
            moveTable();
            
        })
    }
    //if question hasnt been asked then return an answer and push the question into memory.
    else if (!inputMemory.includes(userInput) && userInput.includes('will')) {
        inputMemory.push(userInput);
        randomNumberGenerator(answerArray);
        spinBall(answerArray).then(() => {
            returnAnswer(answerArray);
            moveTable();
            
        })
    }
    
    // if question has been asked then return the question and the answer that was given at the time.
    else {
        const userInputIndex = inputMemory.findIndex(element => element === userInput);
        const answerMemoryIndex = answerMemory[userInputIndex];
        const insideBall = document.getElementById('options-text');
        insideBall.innerHTML = answerMemoryIndex;
        alert(`You already asked me '${userInput}', my answer is still '${answerMemoryIndex}'.`);
        document.getElementById("message").value = '';
    }
}

const submitBtn = document.getElementById('submit-button');
submitBtn.addEventListener('click', getUserQuestion);