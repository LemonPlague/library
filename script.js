// --------TODO--------
// 1. remove the "book type" options and instead use
// javascript to parse the input of 'length' and
// mark the entry as either audio or paper based on the 
// type of units that were used.
// 2. come up with pseudo code to color code cards based
// on above information
// 3. come up with pseudo code to color code cards based
// on the read-status of the book



// ------------INITIAL VARIABLES------------
const addNewBookButton = document.querySelector('.add-that-book');
const submitButton = document.querySelector('.submit-button');
const dialog = document.querySelector('#book-dialog');




// ------------ MAIN CODE ------------
// Array to hold multiple cards
const myLibrary = [];


// this should happen when the submit button is pushed.
function addBookToLibrary() {
    //1. get value from the forms
    const newBook = getValuesFromDialog();

    //2. push that data into the object
    myLibrary.push(newBook);
    
    //3. loop through array to put object data into cards
    bookObjectToCardData(newBook);
}


// ------------EVENT LISTENERS------------
// open the dialog when the button is clicked
addNewBookButton.addEventListener('click', () => {
    dialog.showModal();
})
// close the dialog when clicking outside of it
dialog.addEventListener('click', (event) => {
    if(event.target === dialog){
      dialog.close();
    }
});



// ------------ FUNCTIONS ------------
// Book constructor
function Book(newTitle, newAuthor, newLength, newReadStatus) {
    this.title = newTitle;
    this.author = newAuthor;
    this.length = newLength;
    this.readStatus = newReadStatus;
}

// get values from dialog
function getValuesFromDialog() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const length = document.querySelector('#length').value;
    const readStatus = document.querySelector('#checkboxes').checked;
    return new Book(title, author, length, readStatus);
}

function bookObjectToCardData(newBook) {
    //get card-space div
    const cardSpace = document.querySelector('.card-space');

    //1. begin creating from largest to smallest. 

    //LARGEST (top section of the card)
    //create card section
    let card = document.createElement('div');
    card.setAttribute(`class`, `card`);
    //create cover section
    let coverDiv = document.createElement('div');
    coverDiv.setAttribute(`class`, `cover`);
    //create div to hold the title
    let titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', `title`);    
    //title
    let titleH2 = document.createElement('h2');
    titleH2.textContent = newBook.title;
    //div to hold the author
    let authorDiv = document.createElement('div');
    authorDiv.setAttribute('class', 'author');
    //author
    let authorH4 = document.createElement('h4');
    authorH4.textContent = newBook.author;

    //LARGEST (bottom section of the card)
    //div to hold info (length and status)
    let infoDiv = document.createElement('div');
    infoDiv.setAttribute('class', 'info');
    //div to hold length
    let lengthDiv = document.createElement('div');
    lengthDiv.setAttribute('class', 'length');
    //length
    let lengthP = document.createElement('p');
    lengthP.textContent = newBook.length;
    //div to hold status
    let statusDiv = document.createElement('div');
    statusDiv.setAttribute('class', 'status');
    //status
    let statusP = document.createElement('p');
    statusP.textContent = newBook.readStatus;

    
    //2. prepend from smallest to largest, bottom to top
    statusDiv.appendChild(statusP);
    lengthDiv.appendChild(lengthP);
    infoDiv.appendChild(lengthDiv);
    infoDiv.appendChild(statusDiv);
    authorDiv.appendChild(authorH4);
    titleDiv.appendChild(titleH2);
    coverDiv.appendChild(titleDiv);
    coverDiv.appendChild(authorDiv);
    card.appendChild(coverDiv);
    card.appendChild(infoDiv);
    cardSpace.appendChild(card);


    myLibrary.forEach(loopOverObject);
}

function loopOverObject() {
    
}