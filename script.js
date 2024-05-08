// --------TODO--------
// 1. get index of the card in which updateStatus button was pushed, 
// and ensure color changes happen as status are changed

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
});
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
        const card = document.createElement('div');
        card.setAttribute(`class`, `card`);
        card.id = `card${index}`;
        //div to hold title & author
        const coverDiv = document.createElement('div');
        coverDiv.setAttribute(`class`, `cover`);
        //create div to hold the title
        const titleDiv = document.createElement('div');
        titleDiv.setAttribute('class', `title`);    
        //title
        const titleH2 = document.createElement('h2');
        //div to hold the author
        const authorDiv = document.createElement('div');
        authorDiv.setAttribute('class', 'author');
        //author
        const authorH4 = document.createElement('h4');

        //----element creation from largest to smallest(bottom section)----
        //div to hold length and status
        const infoDiv = document.createElement('div');
        infoDiv.setAttribute('class', 'info');
        //div to hold length
        const lengthDiv = document.createElement('div');
        lengthDiv.setAttribute('class', 'length');
        //length
        const lengthP = document.createElement('p');
        //div to hold status
        const statusDiv = document.createElement('div');
        statusDiv.setAttribute('class', 'status');
        //status
        const statusP = document.createElement('p');
        //status update button
        const statusButton = document.createElement('button');
        statusButton.setAttribute('class', 'update-button');
        statusButton.setAttribute('type', 'button');
        statusButton.id = `button${index}`;
        statusButton.textContent = "Update";
        //readStatus update function
        statusButton.addEventListener('click', () => {
            //clear status div
            statusDiv.innerHTML = '';
            updateReadStatus(statusDiv, index);
        }, false);      

        //2. populate appropriate elements with data
        titleH2.textContent = book.title;
        authorH4.textContent = book.author;
        lengthP.textContent = book.length;
        statusP.textContent = book.readStatus;

        //3. prepend elements from smallest to largest, bottom to top
        statusDiv.appendChild(statusP);
        statusDiv.appendChild(statusButton);
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
            lengthDiv.style.backgroundColor = '#d66fc8';
        } else {
            lengthDiv.style.backgroundColor = '#8b5ba7';
        }

        // --read status--
        if (statusP.textContent == 'on hold') {
            statusDiv.style.backgroundColor = '#eca95d';
        } else if (statusP.textContent == 'in progress') {
            statusDiv.style.backgroundColor = '#5dc3ec';
        } else {
            statusDiv.style.backgroundColor = '#8cc98c';
        }
    })    
}

function updateReadStatus(statusDiv, index) {

    //create common attributes for the following inputs
    const inputAttributes = {
        name: 'newStatus',
        type: 'radio',        
    }
    //---create 3 radio buttons---
    //1. on hold
    const holdRadio = document.createElement('input');    
    Object.assign(holdRadio, inputAttributes);
    holdRadio.setAttribute('value', 'on hold');
    holdRadio.id = `on-hold-${index}`;
    const holdLabel = document.createElement('label');
    holdLabel.setAttribute(`for`, `on-hold-${index}`);
    holdLabel.textContent = "on hold";
    holdRadio.addEventListener('click', () => {
        //update readStatus of object in library
        myLibrary[index].readStatus = holdRadio.value;
        //rebuild the cards
        myLibraryToCards();
    });
    //2. in progress
    const progRadio = document.createElement('input');
    Object.assign(progRadio, inputAttributes);
    progRadio.setAttribute('value', 'in progress');
    progRadio.id = `in-progress-${index}`;
    const progLabel = document.createElement('label');
    progLabel.setAttribute(`for`, `in-progress-${index}`);
    progLabel.textContent = "in progress";
    progRadio.addEventListener('click', () => {
        //update readStatus of object in library
        myLibrary[index].readStatus = progRadio.value;
        //rebuild the cards
        myLibraryToCards();
    });
    //3. complete
    const completeRadio = document.createElement('input');
    Object.assign(completeRadio, inputAttributes);
    completeRadio.setAttribute('value', 'complete');
    completeRadio.id = `complete-${index}`;
    const completeLabel = document.createElement('label');
    completeLabel.setAttribute(`for`, `complete-${index}`);
    completeLabel.textContent = "complete";
    completeRadio.addEventListener('click', () => {
        //update readStatus of object in library
        myLibrary[index].readStatus = completeRadio.value;
        //rebuild the cards
        myLibraryToCards();
    });

    //append the radios
    statusDiv.appendChild(holdRadio);
    statusDiv.appendChild(holdLabel);
    statusDiv.appendChild(progRadio);
    statusDiv.appendChild(progLabel);
    statusDiv.appendChild(completeRadio);
    statusDiv.appendChild(completeLabel);
}