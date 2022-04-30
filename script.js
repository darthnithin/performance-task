//get element
var myButton = document.getElementById("todo-submit");
loadTodo();
function addTodo(todoText, myList) {
  var myItem = document.createElement("li");
  var myDelete = document.createElement("button");
  var myCheck = document.createElement("input");
  var myDiv = document.createElement("div");
  var myItemText = document.createElement("input");
  var myEdit = document.createElement("button");
  var myCheckButtonContainer = document.createElement("button");

  myCheck.setAttribute("type", "checkbox");
  myItemText.setAttribute("disabled", "true");
  myItemText.setAttribute("readonly", "true");
  myItemText.setAttribute("id", "myItemText");

  myItemText.value = todoText;

  myCheckButtonContainer.appendChild(myCheck);
  myDiv.appendChild(myCheckButtonContainer);
  myDiv.appendChild(myItemText);
  myItem.appendChild(myDiv);
  myDiv.appendChild(myEdit);
  myDiv.appendChild(myDelete);
  myList.appendChild(myItem);

  // Styling
  myItemText.classList.add("form-control");
  myCheckButtonContainer.classList.add("btn", "btn-secondary");
  myDiv.classList.add("input-group", "listitem");
  myDelete.classList.add("delete", "btn", "btn-danger");
  myEdit.classList.add("edit", "btn", "btn-warning");

  // Add Icons
  myDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  myEdit.innerHTML = '<i class="fa-solid fa-edit"></i>';

  // Event listeners
  myEdit.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("edit");
    editItem(myItemText);
  });
  myItemText.addEventListener("blur", function (event) {
    event.preventDefault();
    console.log("save");
    saveEdit(myItemText);
  });
  myDelete.addEventListener("click", function (event) {
    event.preventDefault();
    deleteItem(myItem);
  });
  myCheck.addEventListener("click", function (event) {
    myItem.classList.toggle("done");
    myItemText.classList.toggle("done");
  });
}
function createTodo(event) {
  event.preventDefault();
  var myInput = document.getElementById("todo-input");
  var myList = document.getElementById("todo-list");
  addTodo(myInput.value, myList, false);
  // Reset input
  myInput.value = "";
  saveTodo();
}
// State management
// Local storage
// Save todo list
function saveTodo() {
  var myListItems = document.querySelectorAll("#myItemText");
  var myListArray = [];
  for (var i = 0; i < myListItems.length; i++) {
    myListArray.push(myListItems[i].value);
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

// edit item
function editItem(item) {
  item.removeAttribute("disabled");
  item.removeAttribute("readonly");
  item.focus();
  item.select();
  saveTodo();
}
function saveEdit(item) {
  item.setAttribute("disabled", "true");
  item.setAttribute("readonly", "true");
  saveTodo();
}
