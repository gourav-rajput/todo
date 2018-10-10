// Drop element in the ToDo list
function dropElementInToDo(event) {
  let {uniqueId, itemValue, containerId} = getDropData(event);
  if (!isItemPresentInContainer(itemValue, todoListContainerId)) {
    deleteItem(uniqueId, completedListContainer);
    addItem(itemValue, todoContainer, uniqueId);
  }
}

// Drop element in the completed list
function dropElementInComplete(event) {
  let {uniqueId, itemValue, containerId} = getDropData(event);
  if (!isItemPresentInContainer(itemValue, completedListContainerId)) {
    deleteItem(uniqueId, todoContainer);
    addItem(itemValue, completedListContainer, uniqueId);
  }
}

// Get data to be dropped in the list
function getDropData(event){
  let uniqueId = event.dataTransfer.getData('uniqueId');
  let itemValue = event.dataTransfer.getData('itemValue'); 
  let containerId = event.dataTransfer.getData('containerId');
  return {uniqueId, itemValue, containerId};
}


// Return true if item is prensent in the given container
function isItemPresentInContainer(value = "", containerId = ""){
  let itemList = getElementRef(containerId, 'id').getElementsByTagName('li');
  for(let i = 0; i < itemList.length; i++){
    if (itemList[i].getElementsByClassName('left')[0].innerHTML.localeCompare(value) === 0) {
      return true;
    }
  }
  return false;
}


function allowDrop(event) {
  event.preventDefault()
}

function dragElement(event) {
  // Set data to be passed to drop in the list
  event.dataTransfer.setData("uniqueId", event.target.id);
  event.dataTransfer.setData("itemValue", event.path[0].querySelectorAll('div.left')[0].innerText);
  event.dataTransfer.setData("containerId", event.path[1].id);
}

