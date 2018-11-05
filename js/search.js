//Check if string item1 contains string item2
function checkStringIncludes(item1, item2, searchType = ""){
  if (searchType !== "exactSearch") {
    return item1.localeCompare(item2) === 0;
  }
  return (item1.toLowerCase()).indexOf(item2.toLowerCase()) > -1;
}

//Triggers on search input
function searchList(value){
  let itemList = liList;
  for(let i = 0; i < itemList.length; i++){
    if (checkStringIncludes(itemList[i].getElementsByClassName('float-left')[0].innerText, value)) {
      itemList[i].style.display = 'block';
      itemList[i].style.background = 'yellow';
    } else {
      itemList[i].style.display = 'none';
    }
  }
}

function isAlreadyPresent(value){
  let itemList = liList;
  for(let i = 0; i < itemList.length; i++){
    if (checkStringIncludes(itemList[i].getElementsByClassName('float-left')[0].innerText, value, "exactSearch")) {
      return true;
    }
  }
}
