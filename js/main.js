// Stops reload of the page after submitting
const noSubmitForm = document.getElementById("form");
const stopReload = (event) => {
    event.preventDefault();
}
noSubmitForm.addEventListener('submit', stopReload);


//arrat for remembering the user questions
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

// Capture user question and check if its already been asked before.
const getUserQuestion = () => {
    const userInput = document.getElementById("message").value; //captures user question
    const randomNum = Math.floor(Math.random() * answerArray.length); //picks random number
    //returnAnswer pushed 8ball response to array and returns an alert to the user of the answer
    const returnAnswer = () => {
        answerMemory.push(answerArray[randomNum]);
        return alert(answerArray[randomNum]);
    };
    if (userInput === '' || userInput.length < 5) {
        return alert('Please ask a question.')
    }
    //if question hasnt been asked then return an answer and push the question into memory.
    if (inputMemory.includes(userInput) === false) {
        inputMemory.push(userInput);
        returnAnswer()
    }
    // if question has been asked then return the question and the answer that was given at the time.
    else {
        const userInputIndex = inputMemory.findIndex(element => element === userInput)
        const answerMemoryIndex = answerMemory[userInputIndex];
        return alert(`You already asked me '${userInput}', my answer is still ${answerMemoryIndex} `)
    }
}

