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
let myLibrary = [];


// this should happen when the submit button is pushed.
function addBookToLibrary() {
    //1. need to get value from the forms
    getValuesFromDialog();

    //2. need to push that data into the object
    myLibrary.push(newBook);
    
    //3. need to loop through said object to put data into card
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
function Book(title, author, length, readStatus) {
    this.title = title;
    this.author = author;
    this.length = length;
    this.readStatus = readStatus;
}

// get valueS from dialog
function getValuesFromDialog() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const length = document.querySelector('#length').value;
    const readStatus = document.querySelector('#checkboxes').checked;
    let newBook = new Book(title, author, length, readStatus);
    return newBook;
}