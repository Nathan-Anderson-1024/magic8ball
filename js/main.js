const inputMemory = []; //array for remembering the user questions
const answerMemory = []; //array for remembering the 8ball answers
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
    'hazy, but I say it will happen',
    "you will",
    'concentrate and ask again',
    'no way'
];

let randomNum; //defines global variable randomNum

const noSubmitForm = document.getElementById("form");
// Stops reload of the page after submitting
const stopReload = (event) => {
    return event.preventDefault();
}
noSubmitForm.addEventListener('submit', stopReload);

// sleep function to wait
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


const randomNumberGenerator = () => {
    randomNum = Math.floor(Math.random() * answerArray.length);
    return randomNum;
}

const returnAnswer = () => {
    answerMemory.push(answerArray[randomNum]);
    return alert(answerArray[randomNum]);
};

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
        return alert('Please ask a valid question.')
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
        console.log(userInput)
        return alert("Please start your question with 'Will'.")
    }
    // if question has been asked then return the question and the answer that was given at the time.
    else {
        const userInputIndex = inputMemory.findIndex(element => element === userInput)
        const answerMemoryIndex = answerMemory[userInputIndex];
        const insideBall = document.getElementById('options-text');
        insideBall.innerHTML = answerMemoryIndex;
        return alert(`You already asked me '${userInput}', my answer is still '${answerMemoryIndex}'.`)
    }
}
//appends question and answer to table to the top row
const showTable = () => {
    const userQuestion = document.getElementsByClassName('table-data-question')[0]
    const userAnswer = document.getElementsByClassName('table-data-response')[0]
    const userInput = document.getElementById("message").value.toLowerCase()
    const userInputIndex = inputMemory.findIndex(element => element === userInput)
    const answerMemoryIndex = answerMemory[userInputIndex];
    userQuestion.innerHTML = userInput; 
    userAnswer.innerHTML = answerMemoryIndex;
}
// creates a new table row with associated td elements to be appended to index.html table
const createTableRow = () => {
    const tr = document.createElement('tr'); //create table row html element
    tr.classList.add('table-row-data'); //add class of table-row-data to table row
    const table = document.getElementById('table');
    const row = table.insertRow(-1);
    row.classList.add('table-row-data')
}

//adds td to last row in table
const createUserTd = () => {
    const td = document.createElement('td');
    td.classList.add('table-data','table-data-response');
    const lastTrElement = document.getElementsByClassName('table-row-data').length - 1;
    const latestTableRow = document.getElementsByClassName('table-row-data')[lastTrElement]; //get last element in class array
    latestTableRow.appendChild(td);
}

//adds td to last row in table    
const createQuestionTd = () => {
    const td = document.createElement('td');
    td.classList.add('table-data', 'table-data-question');
    const lastTrElement = document.getElementsByClassName('table-row-data').length - 1;
    const latestTableRow = document.getElementsByClassName('table-row-data')[lastTrElement]; //get last element in class array
    latestTableRow.appendChild(td);
}

const moveTable = () => {
    createTableRow(); //creates new row at the end of the table
    createQuestionTd(); //sets last elements html to the second to last value in the array
    createUserTd(); //sets last elements html to the second to last value in the array
    for (let i = 0; i < answerMemory.length; i++) {
        const iterateQuestion = document.getElementsByClassName('table-data-question')[i]
        iterateQuestion.innerHTML = inputMemory[i]
        const iterateResponse = document.getElementsByClassName('table-data-response')[i]
        iterateResponse.innerHTML = answerMemory[i]
    }
}
