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
const cardSpace = document.querySelector('.card-space');
let indexID = 0;
// Array to hold multiple cards
const myLibrary = [];



// ------------ MAIN FUNCTION ------------
//----when the submit button is pushed----

function addBookToLibrary() {
    //1. get values from the dialog
    const newBook = getValuesFromDialog();

    //2. clear the dialog
    ClearDialog();
    //2.1 close dialog
    dialog.close();    
    
    //3. check if new book is already in library
    const bookMatch = LoopOverMyLibrary(newBook);

    //if the same title is not present in library, add a card
    //then push that book into the library.
    if (bookMatch == 0) {
        bookObjectToCardData(newBook);
        myLibrary.push(newBook);
    } else {
        console.log(`book has already been entered?!`);
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
    addBookToLibrary();
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
    const readStatus = document.querySelector('#checkboxes').checked;
    return new Book(title, author, length, readStatus);
}

function bookObjectToCardData(book) {    
    //1. create a card for each book
    //----element creation from largest to smallest (top section)----
    let card = document.createElement('div');
    card.setAttribute(`class`, `card`);
    card.id = `card${indexID}`;
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
}

function ClearDialog() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#length').value = '';
    document.querySelector('#checkboxes').checked = '';
}

function LoopOverMyLibrary(newBook) {
    let match = 0;

    for (let i = 0; i <= myLibrary.length; i++) {

        if (myLibrary.length == 0) {
            return 0;
        } 
        //if the title of newBook == title of current iterated book, break
        else if (newBook.title == myLibrary[i].title) {
            console.log(`newBook Title = ${newBook.title}. Book title at index ${myLibrary[i]} is ${myLibrary[i].title}`);
            match = 1;
            continue;
        //if the title of newBook != title of current iterated book and this is not the last book, 
        //go to next loop
        } else if (newBook.title != myLibrary[i].title && i != myLibrary.length -1) {
            console.log(`newBook Title = ${newBook.title}. Book title at ${myLibrary[i]} is ${myLibrary[i].title}`);
            continue;
        //if the title of newBook != title of current iterated book and this IS the last book, 
        //execute the code below
        } else {
            indexID = i + 1;
            return match;
        }
    }
}

