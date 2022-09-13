export const inputMemory = []; //array for remembering the user questions
export const answerMemory = []; //array for remembering the 8ball answers


//appends question and answer to table to the top row
export const showTable = () => {
    const userQuestion = document.getElementsByClassName('table-data-question')[0]
    const userAnswer = document.getElementsByClassName('table-data-response')[0]
    const userInput = document.getElementById("message").value.toLowerCase()
    const userInputIndex = inputMemory.findIndex(element => element === userInput)
    const answerMemoryIndex = answerMemory[userInputIndex];
    userQuestion.innerHTML = userInput; 
    userAnswer.innerHTML = answerMemoryIndex;
}
// creates a new table row with associated td elements to be appended to index.html table
export const createTableRow = () => {
    const tr = document.createElement('tr'); //create table row html element
    tr.classList.add('table-row-data'); //add class of table-row-data to table row
    const table = document.getElementById('table');
    const row = table.insertRow(-1);
    row.classList.add('table-row-data')
}

//adds td to last row in table
export const createUserTd = () => {
    const td = document.createElement('td');
    td.classList.add('table-data','table-data-response');
    const lastTrElement = document.getElementsByClassName('table-row-data').length - 1;
    const latestTableRow = document.getElementsByClassName('table-row-data')[lastTrElement]; //get last element in class array
    latestTableRow.appendChild(td);
}

//adds td to last row in table    
export const createQuestionTd = () => {
    const td = document.createElement('td');
    td.classList.add('table-data', 'table-data-question');
    const lastTrElement = document.getElementsByClassName('table-row-data').length - 1;
    const latestTableRow = document.getElementsByClassName('table-row-data')[lastTrElement]; //get last element in class array
    latestTableRow.appendChild(td);
}

export const moveTable = () => {
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
