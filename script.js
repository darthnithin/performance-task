//get element
var myButton = document.getElementById("todo-submit");
loadTodo();
function addTodo(todoText, myList) {
  console.log(todoText + "hi");
  var myItem = document.createElement("li");
  var myDelete = document.createElement("button");
  var myCheck = document.createElement("input");
  var myDiv = document.createElement("div");
  var myEditable = document.createElement("input");
  var myEdit = document.createElement("button");
  var myCheckButtonContainer = document.createElement("button");

  myCheck.setAttribute("type", "checkbox");

  myEditable.value = todoText;
  myCheckButtonContainer.appendChild(myCheck);
  myDiv.appendChild(myCheckButtonContainer);
  myDiv.appendChild(myEditable);
  myItem.appendChild(myDiv);
  myDiv.appendChild(myEdit);
  myDiv.appendChild(myDelete);

  myEditable.classList.add("form-control");
  myCheckButtonContainer.classList.add("btn", "btn-secondary");
  myDiv.classList.add("input-group", "listitem");
  myDelete.classList.add("delete", "btn", "btn-danger");
  myEdit.classList.add("edit", "btn", "btn-warning");

  myEdit.addEventListener("click", function (event) {
    event.preventDefault();
    editItem(item);
  });
  myList.appendChild(myItem);
  addEdit(myItem);

  myDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  myEdit.innerHTML = '<i class="fa-solid fa-edit"></i>';
  //delete item
  myDelete.addEventListener("click", function (event) {
    event.preventDefault();
    deleteItem(myItem);
  });
  //check item
  myCheck.addEventListener("click", function (event) {
    event.preventDefault();
    myItem.classList.toggle("done");
  });
}
function createTodo(event) {
  event.preventDefault();
  var myInput = document.getElementById("todo-input");
  var myList = document.getElementById("todo-list");
  addTodo(myInput.value, myList);
  // Reset input
  myInput.value = "";
  saveTodo();
}
// State management
// Local storage
// Save todo list
function saveTodo() {
  var myList = document.getElementById("todo-list");
  var myListItems = myList.children;
  var myListArray = [];
  for (var i = 0; i < myListItems.length; i++) {
    myListArray.push(myListItems[i].innerText);
  }
  localStorage.setItem("todoList", JSON.stringify(myListArray));
}
// Load todo list
function loadTodo() {
  var myList = document.getElementById("todo-list");
  var myListArray = JSON.parse(localStorage.getItem("todoList"));
  if (myListArray != null) {
    for (var i = 0; i < myListArray.length; i++) {
      console.log(myListArray[i]);
      addTodo(myListArray[i], myList);
    }
  }
}
// Clear todo list
function clearTodo() {
  var myList = document.getElementById("todo-list");
  var myListItems = myList.children;
  for (var i = 0; i < myListItems.length; i++) {
    myList.removeChild(myListItems[i]);
  }
}
// Clear completed items
function clearCompleted() {
  var myList = document.getElementById("todo-list");
  var myListItems = myList.children;
  for (var i = 0; i < myListItems.length; i++) {
    if (myListItems[i].classList.contains("done")) {
      myList.removeChild(myListItems[i]);
    }
  }
  saveTodo();
}
// Clear all items
function clearAll() {
  var myList = document.getElementById("todo-list");
  var myListItems = myList.children;
  for (var i = 0; i < myListItems.length; i++) {
    myList.removeChild(myListItems[i]);
  }
}
// Delete specific item
function deleteItem(item) {
  var myList = document.getElementById("todo-list");
  myList.removeChild(item);
  saveTodo();
}
// add edit button
function addEdit(item) {}
// edit item
function editItem(item) {
  var myInput = document.getElementById("todo-input");
  myInput.value = item.innerText;

  saveTodo();
}
