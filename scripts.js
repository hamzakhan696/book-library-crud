let bookList = [];

function addBook(){
        const name = document.getElementById("name").value;
        const author = document.getElementById("author").value;
        const date = document.getElementById("date").value; 
    // Get the selected value of the radio button for "Availability"
    const availabilityTrue = document.getElementById("availability-true").checked;
    let availability = availabilityTrue ? "Yes" : "No";
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

    if(localStorage.getItem('bookList') !==null && bookList.length > 0) {
        document.getElementById("info").style.display = "none";
    }
    else{
  // If there is no data in localStorage then show the message.
        document.getElementById("info").style.display = "block";
    }

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


let isDescending = false;
function nameDesc(){
    isDescending =! isDescending;
    bookList.sort((a,b) =>{
        if(isDescending){
            return b.name.localeCompare(a.name);
        }
        else{
            return a.name.localeCompare(b.name);
        }

    });
    displayBooks();
}

//  load book data from local storage
window.addEventListener('load',()=>{
    const data = localStorage.getItem('bookList')
    if(data){
        bookList = JSON.parse(data);
        bookList.sort((a,b)=> a.name.localeCompare(b.name));

        displayBooks();
    }
});

// delete function
    function deleteBook(index) {
        if (confirm("Are you sure you want to delete this book?")) {
            bookList.splice(index, 1);
            document.getElementById("delete").style.display = "block";
            setTimeout(function(){
                document.getElementById("delete").style.display = "none";
            },3000); 
            saveDataToLocalStorage();
            displayBooks();
        }
    } 

    function editBook(index) {
        const book = bookList[index];
        document.getElementById("name").value = book.name;
        document.getElementById("author").value = book.author;
        document.getElementById("date").value = book.date;
    
        // Set the selected value of the radio button for "Availability"
        const availabilityRadio = book.availability === "Yes" ? "availability-true" : "availability-false";
        document.getElementById(availabilityRadio).checked = true;
    
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
         // Get the selected value of the radio button for "Availability"
    const availabilityTrue = document.getElementById("availability-true").checked;
    let availability = availabilityTrue ? "Yes" : "No";
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
        function searchBar() {
            let searchInput = document.getElementById("search");
            let filter = searchInput.value.toUpperCase();
            let table = document.getElementById("book-list"); 
            let rows = table.getElementsByTagName("tr");
        
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                let cells = row.getElementsByTagName("td"); 
        
                let rowMatchesFilter = false;
        
                for (let j = 0; j < cells.length; j++) {
                    let cell = cells[j];
                    let cellText = cell.textContent || cell.innerText; // Get the text content of the cell
        
                    if (cellText.toUpperCase().indexOf(filter) > -1) {
                        rowMatchesFilter = true;
                        break; // No need to check other cells in the row if one matches
                    }
                }
        
                // Show or hide the row based on whether it matches the filter
                if (rowMatchesFilter) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            }
        }
        
        
        