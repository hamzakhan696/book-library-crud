let bookList = [];

function addBook(){
        const name = document.getElementById("name").value;
        const author = document.getElementById("author").value;
        const date = document.getElementById("date").value;
        const availability = document.getElementById("availability").value;
        const pages = document.getElementById("pages").value;
    if(name && author && date && availability && pages){
        const book ={
            name,
            author,
            date, 
            availability,
            pages,
        };
        bookList.push(book);
        saveDataToLocalStorage();
        clearform();
        
        document.getElementById("success").style.display = "block"; //show the success message
        displayBooks();
    }
    else{
            document.getElementById("valid-fields").style.display = "block";
            document.getElementById("success").style.display = "none"}; 
}

  function saveDataToLocalStorage() {
    localStorage.setItem('bookList', JSON.stringify(bookList));
  }

 
 // after adding or updating form will be clear n

  function clearform()
  {
    document.getElementById("name").value = "";
    document.getElementById("author").value = "";
    document.getElementById("date").value = "";
    document.getElementById("availability").value = "";
    document.getElementById("pages").value = "";
  }

  function displayBooks() {
    bookList.sort((a,b) => a.name.localeCompare(b.name)) //sorting names
     
    const bookTable = document.getElementById("book-list");
    bookTable.innerHTML = ""; // Clear the table

    for (let i = 0; i < bookList.length; i++) {
        const book = bookList[i];
        const newRow = bookTable.insertRow();
        newRow.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.date}</td>
            <td>${book.availability}</td>
            <td>${book.pages}</td>
            <td>
                <a href="#" data-toggle="modal" data-target="#exampleModalCenter"
                 class="btn btn-warning btn-sm edit" onclick="editBook(${i})">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete" onclick="deleteBook(${i})">Delete</a>
            </td>
        `;
    }
}
//  load book data from local storage
window.addEventListener('load',()=>{
    const data = localStorage.getItem('bookList')
    if(data){
        bookList = JSON.parse(data);
        displayBooks();
    }
})

// delete function
    function deleteBook(index) {
        if (confirm("Are you sure you want to delete this book?")) {
            bookList.splice(index, 1);
            saveDataToLocalStorage();
            displayBooks();
        }
    } 

    function editBook(index) {
        const book = bookList[index];
        document.getElementById("name").value = book.name;
        document.getElementById("author").value = book.author;
        document.getElementById("date").value = book.date;
        document.getElementById("availability").value = book.availability;
        document.getElementById("pages").value = book.pages;
    
        // Remove the edited book from the list temporarily
        bookList.splice(index, 1);
    
        // Update the submit button's click event to handle the update
        document.getElementById("book-form").onsubmit = function (event) {
            event.preventDefault();
            updateBook(index);
        };
    }
    
   
    function updateBook(index){
        const name =  document.getElementById('name').value;
        const author = document.getElementById('author').value;
        const date = document.getElementById('date').value;
        const availability = document.getElementById('availability').value;
        const pages = document.getElementById('pages').value;
        if(name && author && date && availability && pages){
            let updatedBookObj ={
                name,
                author,
                date,
                availability,
                pages
            }
            bookList.splice(index, 0 , updatedBookObj);
            saveDataToLocalStorage();
            clearform();
            displayBooks();
            }
        }
        