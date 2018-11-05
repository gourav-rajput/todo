

function saveLocally(name = "", obj = {}){
  if (deleteExistingLocal(name)) {
    localStorage.setItem(name, JSON.stringify(obj));
  }
}

function deleteExistingLocal(name = ""){
  localStorage.removeItem(name);
  return true;
}

function fetchLocalData(){

  if(localStorage.getItem("to-do-item-container")){
    let todoList = JSON.parse(localStorage.getItem("to-do-item-container"));
    if (todoList.length !== 0) {
      for(let index in todoList){
      addItem(todoList[index].itemValue, todoContainer, todoList[index].uniqueId);
      }
    } else showToDoNoDataScreen();
  } else showToDoNoDataScreen();

  if(localStorage.getItem("completed-list-container")){
    let completedList = JSON.parse(localStorage.getItem("completed-list-container"));
    if (completedList.length !== 0) {
      for(let index in completedList){
      addItem(completedList[index].itemValue, completedListContainer, completedList[index].uniqueId);
      }
    } else showCompletedNoDataScreen();
  } else showCompletedNoDataScreen();

}