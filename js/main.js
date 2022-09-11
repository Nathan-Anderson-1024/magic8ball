// Stops reload of the page after submitting
const noSubmitForm = document.getElementById("form");
const stopReload = (event) => {
    event.preventDefault();
}
noSubmitForm.addEventListener('submit', stopReload);


//array for remembering the user questions
const inputMemory = [];
//array for remembering the 8ball answers
const answerMemory = [];
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
    'hazy, try again',
    "you dont want to know the answer",
    'concentrate and ask again'
];

// sleep function to wait
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}



// Capture user question and check if its already been asked before.
const getUserQuestion = () => {
    const userInput = document.getElementById("message").value.toLowerCase(); //captures user question
    const randomNum = Math.floor(Math.random() * answerArray.length); //picks random number
    //returnAnswer pushed 8ball response to array and returns an alert to the user of the answer
    const returnAnswer = () => {
        answerMemory.push(answerArray[randomNum]);
        return alert(answerArray[randomNum]);
    };
    async function spinBall() {
        const insideBall = document.getElementById('options-text');
        let x = 200
        for (const answer of answerArray) {
            await sleep(x);
            insideBall.innerHTML = answer;
            x += 25;
        }
        insideBall.innerHTML = answerArray[randomNum];
    }
    if (userInput === '' || userInput.length < 5) {
        return alert('Please ask a valid question.')
    }
    //if question hasnt been asked then return an answer and push the question into memory.
    else if (inputMemory.includes(userInput) === false && userInput.includes('will')) {
        inputMemory.push(userInput);
        spinBall().then((result) => {
            returnAnswer();
            showTable();
        })
        //returnAnswer()
    }
    else if (!userInput.includes('will')) {
        console.log(userInput)
        return alert("I can't answer those types of questions.")
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
//appends question and answer to table
const showTable = () => {
    const userQuestion = document.getElementById('user-question');
    const userAnswer = document.getElementById('ball-answer');
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
    // td.setAttribute('id', 'ball-answer');
    const table = document.getElementById('table');
    const row = table.insertRow(-1);
    row.classList.add('table-row-data')
    //table.appendChild(tr);
}
createTableRow()

const createUserTd = () => {
    const td = document.createElement('td');
    td.classList.add('table-data');
    td.setAttribute('id', 'user-question');
    const lastTrElement = document.getElementsByClassName('table-row-data').length - 1;
    const latestTableRow = document.getElementsByClassName('table-row-data')[lastTrElement]; //get last element in class array
    td.innerHTML = 'TEST';
    latestTableRow.appendChild(td);
}
createUserTd();
    
const createQuestionTd = () => {
    const row = document.getElementsByClassName
    const td = document.createElement('td');
    td.classList.add('table-data');
    td.setAttribute('id', 'ball-answer');
    const lastTrElement = document.getElementsByClassName('table-row-data').length - 1;
    const latestTableRow = document.getElementsByClassName('table-row-data')[lastTrElement]; //get last element in class array
    td.innerHTML = 'TEST Question';
    latestTableRow.appendChild(td);
}
createQuestionTd()