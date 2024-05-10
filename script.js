// --------TODO (if expanding)--------
// 1. add a date to the forms
// 2. add filters for book view
// 3. add sort options


// ------------INITIAL VARIABLES------------
// Variables for main function
const addNewBookButton = document.querySelector('.add-that-book');
const submitButton = document.querySelector('.submit-button');
const dialog = document.querySelector('#book-dialog');
const cardSpace = document.querySelector('.card-space');
//variables for book removal
const removalDialog = document.querySelector('#remove-dialog');
const removeTitle = document.querySelector('#remove-title-name');
const cancelBtn = document.querySelector('.cancel-button');
const confirmBtn = document.querySelector('.confirm-button');
// Array to hold multiple objects(cards)
let myLibrary = [];



// ------------ MAIN FUNCTIONS ------------
//----when the submit button is pushed----

loadFromLocalStorage();

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
        // saveToLocalStorage();
        myLibraryToCards();
    } else {
        console.log(`The title you entered already exists
        in your library`);
    }  
}


// ------------EVENT LISTENERS (main)------------
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
    e.preventDefault(); //this also prevents native HTML form validation
                        //but which is throwing errors anyway so oh well!
    addNewBook();
});
// ------------EVENT LISTENERS (book removal)------------
cancelBtn.addEventListener('click', () => {
    removalDialog.close();
});
cardSpace.addEventListener('click', (e) => {   
    if (e.target.classList.contains('update-button')) {
        const index = e.target.closest('.card').id - 1;
        const statusDiv = e.target.closest('.status');
        if (statusDiv.style.backgroundColor === 'rgb(48, 47, 51)') statusDiv.style.color = '#FFFFFF';
        updateReadStatus(statusDiv, index);
    } else if (e.target.classList.contains('remove-button-IMG')) {
        const index = e.target.closest('.card').id - 1;
        console.log(`selected title's object index is ${index}`);
        removeTitle.textContent = myLibrary[index].title;
        // removalDialog.showModal();
        // deleteBook(index);
        if (confirm("Delete this title?")) {
            console.log(`deleted title at index ${index}`);
            myLibrary.splice(index, 1);
            saveToLocalStorage();
            myLibraryToCards();
        }
    }
});


// ------------ MAIN FUNCTIONS: FUNCTIONS ------------
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
    //loop over each object in library and make a card
    myLibrary.forEach((book, index) => {
        //1. create a card for each book in the library
        //----element creation from largest to smallest (top section)----
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = `${index + 1}`;
        //button to remove book from library
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.setAttribute('type', 'button');
        const removeButtonIMG = document.createElement('img');
        removeButtonIMG.setAttribute('src', 'assets/close-octagon.svg');
        removeButtonIMG.setAttribute('alt', 'remove book from library');
        removeButtonIMG.classList.add('remove-button-IMG');
        //div to hold title & author
        const coverDiv = document.createElement('div');
        coverDiv.classList.add(`cover`);
        //create div to hold the title
        const titleDiv = document.createElement('div');
        titleDiv.classList.add(`title`);    
        //title
        const titleH2 = document.createElement('h2');
        //div to hold the author
        const authorDiv = document.createElement('div');
        authorDiv.classList.add('author');
        //author
        const authorH4 = document.createElement('h4');

        //----element creation from largest to smallest(bottom section)----
        //div to hold length and status
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
        //div to hold length
        const lengthDiv = document.createElement('div');
        lengthDiv.classList.add('length');
        //length
        const lengthP = document.createElement('p');
        //div to hold status
        const statusDiv = document.createElement('div');
        statusDiv.classList.add('status');
        //status
        const statusP = document.createElement('p');
        //status update button
        const statusButton = document.createElement('button');
        statusButton.classList.add('update-button');
        statusButton.setAttribute('type', 'button');
        statusButton.textContent = "Update";

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
        removeButton.appendChild(removeButtonIMG);
        card.appendChild(removeButton);
        cardSpace.appendChild(card);
        
        //4. pimp out the aesthetics
        // --book length--
        const lengthType = lengthP.textContent.split(' ');
        if (lengthType[1] == 'hours') {
            lengthDiv.style.backgroundColor = '#e7aee0';
        } else if (lengthType[1] === 'pages') {
            lengthDiv.style.backgroundColor = '#e2d9bc';
        } else {
            lengthDiv.style.backgroundColor = '#302f33';
            lengthP.style.color = '#FFFFFF';
        }

        // --read status--
        if (statusP.textContent == 'on hold') {
            statusDiv.style.backgroundColor = '#eca95d';
        } else if (statusP.textContent == 'in progress') {
            statusDiv.style.backgroundColor = '#5dc3ec';
        } else if (statusP.textContent == 'complete') {
            statusDiv.style.backgroundColor = '#8cc98c';
        } else {
            statusDiv.style.backgroundColor = '#302f33';
            statusP.style.color = '#FFFFFF';
        }
    })
}

function updateReadStatus(statusDiv, index) {
    statusDiv.innerHTML = '';
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
        saveToLocalStorage();
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
        saveToLocalStorage();
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
        saveToLocalStorage();
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

// function deleteBook(index) {
//     confirmBtn.addEventListener('click', (e) => {
//         e.preventDefault();
//         removalDialog.close();
//         myLibrary.splice(index, 1);
//         console.log(`deleted book at index ${index}`);
//         myLibraryToCards();
//         // saveToLocalStorage();
//     });
// }

// ------------ SAVE LIBRARY ------------
function loadFromLocalStorage() {
    const storedLibrary = JSON.parse(localStorage.getItem('library'));
    if (storedLibrary) {
      myLibrary = storedLibrary.map(book => new Book(book.title, book.author, book.length, book.readStatus));
      myLibraryToCards();
    }
  }
  
  function saveToLocalStorage() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
  }