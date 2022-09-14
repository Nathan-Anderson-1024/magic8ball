export const inputMemory = []; //array for remembering the user questions
export const answerMemory = []; //array for remembering the 8ball answers

// creates a new table row with associated td elements to be appended to index.html table
export const createTableRow = () => {
    const tr = document.createElement('tr'); //create table row html element
    tr.classList.add('table-row-data'); //add class of table-row-data to table row
    const table = document.getElementById('table');
    const row = table.insertRow(-1);
    row.classList.add('table-row-data');
}

//adds td to last row in table    
export const createTd = (className) => {
    const td = document.createElement('td');
    td.classList.add('table-data', className);
    const lastTrElement = document.getElementsByClassName('table-row-data').length - 1;
    const latestTableRow = document.getElementsByClassName('table-row-data')[lastTrElement]; //get last element in class array
    latestTableRow.appendChild(td);
}

export const moveTable = () => {
    createTableRow(); //creates new row at the end of the table
    createTd('table-data-question'); //sets last elements html to the second to last value in the array
    createTd('table-data-response');
    for (let i = 0; i < answerMemory.length; i++) {
        const iterateQuestion = document.getElementsByClassName('table-data-question')[i];
        iterateQuestion.innerHTML = inputMemory[i];
        const iterateResponse = document.getElementsByClassName('table-data-response')[i];
        iterateResponse.innerHTML = answerMemory[i];
    }
}
