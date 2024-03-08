const currentDate = new Date()
let counter = 1
const button = document.querySelector(".started");
const main = document.querySelector("main");
const addBook = document.getElementById("add");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");
const bookLibrary = document.querySelector("#book-library")
const form = document.forms[0];
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read")
const spanClarify = document.querySelector("#book-library .clarify");
const deleteButton = document.querySelectorAll(".check-buttons .delete");
const copyright = document.getElementById("copyright");
copyright.innerHTML = `Copyright &copy; ${currentDate.getFullYear()} BodiAli.`
button.addEventListener("click", function () {
  main.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
});

addBook.addEventListener("click", function(ev){
  dialog.showModal()
  title.value = ""
  author.value = ""
  pages.value = ""
})

document.addEventListener("click", function(ev){
  if (dialog.open && ev.target.tagName === "DIALOG"){
    dialog.close()
    
  }
});

const myLibrary = [];
const localStorageLibrary = JSON.parse(localStorage.getItem("localStorageLibrary")) || [];
class Book{
  constructor(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read
  this.bookID = myLibrary.length + 1
 }
}
function addBookToLibrary(){
  let titleValue = title.value;
  let authorValue = author.value;
  let pagesValue = pages.value;
  const readValue = read.checked;
  const book = new Book(titleValue, authorValue, pagesValue, readValue);
  myLibrary.push(book);
  localStorageLibrary.push(book)
  localStorage.setItem("localStorageLibrary", JSON.stringify(localStorageLibrary))

  renderBooks()
}


form.addEventListener("submit", addBookToLibrary);

function renderBooks() {
  bookLibrary.innerHTML = ""
  localStorageLibrary.forEach(function(book){
  const newDiv = document.createElement("div");
  newDiv.classList.add("books");
  newDiv.appendChild(document.createElement("span"));
  newDiv.firstElementChild.classList.add("clarify");
  newDiv.firstElementChild.textContent = "Title:"
  newDiv.appendChild(document.createElement("p"));
  newDiv.children[1].classList.add("input");
  newDiv.appendChild(document.createElement("span"));
  newDiv.children[2].classList.add("clarify");
  newDiv.children[2].textContent = "Author:"
  newDiv.appendChild(document.createElement("p"));
  newDiv.children[3].classList.add("input");
  newDiv.appendChild(document.createElement("span"));
  newDiv.children[4].classList.add("clarify");
  newDiv.children[4].textContent = "Pages";
  newDiv.appendChild(document.createElement("p"));
  newDiv.children[5].classList.add("input");
  newDiv.appendChild(document.createElement("div"));
  newDiv.children[6].classList.add("check-buttons");
  newDiv.children[6].appendChild(document.createElement("input"));
  newDiv.children[6].firstElementChild.setAttribute("id", "checkbox" + counter);
  newDiv.children[6].firstElementChild.setAttribute("type", "checkbox");
  newDiv.children[6].firstElementChild.classList.add("dynamic-checkbox");
  newDiv.children[6].appendChild(document.createElement("label"));
  newDiv.children[6].children[1].setAttribute("for", "checkbox" + counter);
  newDiv.children[6].children[1].classList.add("label");
  newDiv.children[6].children[1].textContent = "I have read the book!";
  newDiv.children[6].appendChild(document.createElement("button"));
  newDiv.children[6].children[2].classList.add("delete");
  newDiv.children[6].children[2].textContent = "Delete";
  newDiv.children[6].children[2].bookID = myLibrary.length + 1
  newDiv.children[1].textContent = book.title;
  newDiv.children[3].textContent = book.author;
  newDiv.children[5].textContent = book.pages;
  if(book.read){
    newDiv.children[6].firstElementChild.setAttribute("checked", "");
  };
  counter++;
    bookLibrary.appendChild(newDiv);
  })

}
// delete the book from the library array
bookLibrary.addEventListener("click", function(ev){
  if(ev.target.className === "delete"){
    const idToDelete = ev.target.bookID;
    ev.target.parentElement.parentElement.remove();
   let res = localStorageLibrary.find(function(item){
     return item.bookID === idToDelete
    })
   let index = localStorageLibrary.indexOf(res)
   
    localStorageLibrary.splice(index, 1)
    localStorage.setItem("localStorageLibrary", JSON.stringify(localStorageLibrary))
    console.log(localStorageLibrary)
 } 
})

document.addEventListener("DOMContentLoaded", renderBooks())