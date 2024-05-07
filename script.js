// --------TODO--------
// 1. add a [CHANGE] button to the readStatus section on each card
// to populate radio buttons, and ensure color changes happen as status are changed

// 2. due to HTML issues, the form controls must be implimented in javascript

// 3. add a delete button on each book that triggers a warning confirmation

// 4. add a date to the forms

// 5. implement a save feature

// 6. add another readStatus: "watchList"


// ------------INITIAL VARIABLES------------
const addNewBookButton = document.querySelector('.add-that-book');
const submitButton = document.querySelector('.submit-button');
const dialog = document.querySelector('#book-dialog');
const cardSpace = document.querySelector('.card-space');
// Array to hold multiple cards
const myLibrary = [];



// ------------ MAIN FUNCTION ------------
//----when the submit button is pushed----

function addNewBook() {

    //1. get values from the dialog stored into newBook
    const newBook = getValuesFromDialog();

    //2. clear & close dialog
    ClearDialog();
    dialog.close();    
    
    //3. check if new book is already in library
    const bookMatch = checkForMatch(newBook);

    //4. if the title does not already exist, push it to myLibrary and rebuild cards
    if (!bookMatch) {        
        myLibrary.push(newBook);
        myLibraryToCards();
    } else {
        console.log(`The title you entered already exists
        in your library`);
    }  
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
//cancel dialog-server communication and then
//execute main functions
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    addNewBook();
});


// ------------ FUNCTIONS ------------
// Book constructor
function Book(newTitle, newAuthor, newLength, newReadStatus) {
    this.title = newTitle;
    this.author = newAuthor;
    this.length = newLength;
    this.readStatus = newReadStatus;
}

function getValuesFromDialog() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const length = document.querySelector('#length').value;
    const readStatus = document.querySelector('input[name="status"]:checked').value;
    return new Book(title, author, length, readStatus);
}

function ClearDialog() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#length').value = '';
    document.querySelector('input[name="status"]').checked = 'false';
}

function checkForMatch(newBook) {
    if (myLibrary.length === 0) return false;
    
    for (let i = 0; i < myLibrary.length; i++) {
      if (newBook.title == myLibrary[i].title && newBook.author == myLibrary[i].author) {
        return true; //found a match
      }
    }    
    return false; //did not find a match
}

//function used to rebuild the cards after any change to myLibrary
function myLibraryToCards() {   
    //first remove all cards
    cardSpace.innerHTML = '';

    myLibrary.forEach((book, index) => {
        //1. create a card for each book in the library
        //----element creation from largest to smallest (top section)----
        let card = document.createElement('div');
        card.setAttribute(`class`, `card`);
        card.id = `card${index}`;
        //div to hold title & author
        let coverDiv = document.createElement('div');
        coverDiv.setAttribute(`class`, `cover`);
        //create div to hold the title
        let titleDiv = document.createElement('div');
        titleDiv.setAttribute('class', `title`);    
        //title
        let titleH2 = document.createElement('h2');
        //div to hold the author
        let authorDiv = document.createElement('div');
        authorDiv.setAttribute('class', 'author');
        //author
        let authorH4 = document.createElement('h4');

        //----element creation from largest to smallest(bottom section)----
        //div to hold length and status
        let infoDiv = document.createElement('div');
        infoDiv.setAttribute('class', 'info');
        //div to hold length
        let lengthDiv = document.createElement('div');
        lengthDiv.setAttribute('class', 'length');
        //length
        let lengthP = document.createElement('p');
        //div to hold status
        let statusDiv = document.createElement('div');
        statusDiv.setAttribute('class', 'status');
        //status
        let statusP = document.createElement('p');

        //2. populate appropriate elements with data
        titleH2.textContent = book.title;
        authorH4.textContent = book.author;
        lengthP.textContent = book.length;
        statusP.textContent = book.readStatus;

        //3. prepend elements from smallest to largest, bottom to top
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
        
        //4. pimp out the aesthetics
        // --book length--
        const lengthType = lengthP.textContent.split(' ');
        if (lengthType[1] == 'hours') {
            lengthDiv.style.backgroundColor = '#c98cc1';
        } else {
            lengthDiv.style.backgroundColor = '#8c90c9';
        }

        // --read status--
        if (statusP.textContent == 'on-hold') {
            statusDiv.style.backgroundColor = '#eca95d';
        } else if (statusP.textContent == 'in-progress') {
            statusDiv.style.backgroundColor = '#5dc3ec';
        } else {
            statusDiv.style.backgroundColor = '#8cc98c';
        }
    })    
}