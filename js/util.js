// const validateInput = (val) => {
//   return val !== '' && val !== ' ' && val !== null && val !== undefined;
// }

// var Utility = {

// }

const componentsPath = "../components";

function validateInput(val){
  return val !== '' && val !== ' ' && val !== null && val !== undefined;
}

function isContainerIdToDo(val){
  return val === "to-do-item-container";
}

function generateHTMLElement(element = "div", className = "", id = "", value = ""){
  let ele = document.createElement(element);
  ele.setAttribute('class', className);
  if (id !== "") {
    ele.setAttribute('id', id);
  }
  if (value !== "") {
    ele.innerText = value;
  }
  return ele;
}

function appendList(container, list){
  container.prepend(list);
}

function generateButton(type = "", dump_json = ""){
  let button = document.createElement("button");
  switch(type){
    case 'complete' :
      button.innerText = "Completed";
      button.setAttribute('class','complete-button');
      button.addEventListener('click', toggleComplete.bind(this, dump_json));
      break;
    case 'delete' :
      button.innerText = "Delete";
      button.setAttribute('class','delete-button');
      button.addEventListener('click', deleteItem.bind(this, dump_json.uniqueId, dump_json.container));
      break;
    case 'not-complete' :
      button.innerText = "Not Complete";
      button.setAttribute('class','not-complete-button');
      button.addEventListener('click', toggleComplete.bind(this, dump_json));
      break;
    default:
      button = null;  
      break;
  }
  return button;
}

function getElementRef(ref, type){
  let _ = document;
  return (type === 'class' ? _.getElementsByClassName(ref) : _.getElementById(ref));
}

function getUniqueId(itemValue){
  let id = ""
  itemValue.replace(/\s/g, "");
  let idString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"+itemValue;
  for(let i = 0; i < 6; i++){
    id += idString.charAt(Math.floor(Math.random() * idString.length));
  }
  return id;
}

function showToDoNoDataScreen(){
  let request = new XMLHttpRequest();
  request.open('GET', componentsPath+"/no-data-screens/to-do-list.html", true);
  request.onload = function() {
    let data = request.responseText;
    if (validateInput(data)) {
      todoContainer.innerHTML = data
    } else console.log("error");
  }
  request.send();
}

function showCompletedNoDataScreen(){
  let request = new XMLHttpRequest();
  request.open('GET', componentsPath+"/no-data-screens/completed-list.html", true);
  request.onload = function() {
    let data = request.responseText;
    if (validateInput(data)) {
      completedListContainer.innerHTML = data
    } else console.log("error");
  }
  request.send();
}

function toggleDisplayButton(id = '', list = []){
  if (list.length !== 0) {
    getElementRef(id, 'id').style.display = 'block'
  } else {
    getElementRef(id, 'id').style.display = 'none'
  }
  console.log(id, list)
  // list.length !== 0 ? getElementRef(id, 'id').style.display = 'block' : getElementRef(id, 'id').style.display = 'none';
}


