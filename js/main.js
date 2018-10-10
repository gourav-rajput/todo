const todoListContainerId = 'to-do-item-container';
const completedListContainerId = 'completed-list-container';
const todoContainer = getElementRef(todoListContainerId, 'id');
const completedListContainer = getElementRef(completedListContainerId, 'id');
const addButton = getElementRef('to-do-add-button', 'id');
const todoInput = getElementRef('to-do-input','id');
const searchInput = getElementRef('search-input', 'id');
const liList = document.getElementsByTagName('li');
const clearToDoButtonId = 'clear-to-do-list';
const clearCompletedButtonId = 'clear-completed-list';
var todoList = [];
var completedList = [];


function addItem(itemValue, container, uniqueId){
  let buttonType = "";

  if (isContainerIdToDo(container.id)) {
    if (!todoList.length) {
      todoContainer.innerText = "";
    }
    buttonType = "complete";
  } else{
    if (!completedList.length) {
      completedListContainer.innerText = "";
    }
    buttonType = "not-complete";
  }

  uniqueId = uniqueId || getUniqueId(itemValue);

  let values = { uniqueId, container, buttonType, itemValue, containerId: container.id };

  let deleteButton = generateButton("delete", values);

  let liItem = generateHTMLElement("li", "", uniqueId, "");
  liItem.setAttribute('draggable', true);
  liItem.ondragstart = dragElement;
  let leftDiv = generateHTMLElement("div", "left", "", itemValue);
  let rightDiv = generateHTMLElement("div", "right", "", "");
  rightDiv.append(deleteButton);

  if (isContainerIdToDo(values.containerId)) {
    let completeButton = generateButton(values.buttonType, values);
    rightDiv.append(completeButton);
  } else{
    let notCompleteButton = generateButton(values.buttonType, values);
    rightDiv.append(notCompleteButton);  
  }

  liItem.appendChild(leftDiv);
  liItem.appendChild(rightDiv);
  appendList(container, liItem);
  
  updateJson(values);
}

function updateJson(json_dump = {}){
  if (!json_dump.uniqueId) {
    if (isContainerIdToDo(json_dump.container.id)) {
      todoList = [];
      console.log('here');
      console.log(json_dump.container.id);
      saveLocally(json_dump.container.id, todoList);
      toggleDisplayButton(clearToDoButtonId, todoList);
    } else{
      completedList = [];
      saveLocally(json_dump.container.id, completedList);
      toggleDisplayButton(clearCompletedButtonId, completedList);
    }
    return;
  }

  let tempObj = { uniqueId: json_dump.uniqueId, itemValue: json_dump.itemValue }
  if (isContainerIdToDo(json_dump.containerId)) {
    todoList.push(tempObj);
    saveLocally(json_dump.containerId, todoList);
    toggleDisplayButton(clearToDoButtonId, todoList);
  } else{
    completedList.push(tempObj);
    saveLocally(json_dump.containerId, completedList);
    toggleDisplayButton(clearCompletedButtonId, completedList);
  }
}

function modifyCurrentList(uniqueId, containerId){
  let result = todoList.filter((ele) => equilateItems(ele.uniqueId, uniqueId));
  if (result) {
    if (isContainerIdToDo(containerId)) {
      todoList.splice(todoList.indexOf(result[0]), 1);
      saveLocally(containerId, todoList);
      toggleDisplayButton(clearToDoButtonId, todoList);
      if (todoList.length === 0) showToDoNoDataScreen(); 
    } else{
      completedList.splice(completedList.indexOf(result[0]), 1);
      saveLocally(containerId, completedList);
      toggleDisplayButton(clearCompletedButtonId, completedList);
      if (completedList.length === 0) showCompletedNoDataScreen();
    }
  }
}

function equilateItems(item1, item2){
  return item1 === item2;
}

function deleteItem(i, c){
  var children = c.children
  for(let index = 0; index < children.length; index++){
    if (equilateItems(children[index].id, i)) {
      children[index].remove();
      modifyCurrentList(i, c.id);
      break;
    }
  }
}

function toggleComplete(json_dump = {}){
  var children = json_dump.container.children;
  for(let index = 0; index < children.length; index++){
    if (equilateItems(children[index].id, json_dump.uniqueId)) {
      if (isContainerIdToDo(json_dump.containerId)) {
        addItem(json_dump.itemValue, completedListContainer, json_dump.uniqueId);
      } else{
        addItem(json_dump.itemValue, todoContainer, json_dump.uniqueId);
      }
      children[index].remove();
      modifyCurrentList(json_dump.uniqueId, json_dump.container.id);
      break;
    }
  }
}

function deleteList(container = {}) {
  container.innerHTML = '';
  updateJson({container});
  if (isContainerIdToDo(container.id)) {
    showToDoNoDataScreen()
  } else{
    showCompletedNoDataScreen()
  }
}

function renderClearButtons(){
  toggleDisplayButton(clearToDoButtonId, todoList);
  toggleDisplayButton(clearCompletedButtonId, completedList);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchLocalData(); // Fetch list data from localstorage and add it to the list

  // Listen to add button on the page
  addButton.addEventListener("click", () => {
    if (validateInput(todoInput.value)) {  // check for the input is empty or not
      if (isAlreadyPresent(todoInput.value)) {  // Check if input is already exist or not
        alert("Alreay Present in the list");
        return;
      }
      addItem(todoInput.value, todoContainer);   // add input data in todo list
      todoInput.value = "";                      // 
    } else{
      alert("Please Enter Something to Add in List");
    }
  });

  renderClearButtons();

  searchInput.addEventListener('keyup', (ele) => {
    searchList(ele.target.value);
  });

  getElementRef(clearToDoButtonId, 'id').addEventListener("click", () => {
    deleteList(todoContainer);
  })

  getElementRef(clearCompletedButtonId, 'id').addEventListener("click", () => {
    deleteList(completedListContainer);
  })


});
