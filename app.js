//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector(".item__input-header");//Add a new item__task.
var addButton = document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement = function (taskString) {

    var listItem = document.createElement("li");

    //input (checkbox)
    var checkbox = document.createElement("input");//checkbx
    //label
    var label = document.createElement("label");//label
    //input (item__input-text)
    var editInput = document.createElement("input");//item__input-text
    //button.edit
    var editButton = document.createElement("button");//edit button

    //button.delete
    var deleteButton = document.createElement("button");//delete button
    var deleteButtonImg = document.createElement("img");//delete button image

    label.innerText = taskString;
    label.className = 'item__task';

    //Each elements, needs appending
    checkbox.type = "checkbox";
    editInput.type = "item__input-text";

    editButton.innerText = "edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "edit";

    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    deleteButtonImg.src = './remove.svg';
    deleteButton.innerHTML = (`<svg class="svg__delete" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 489.425 489.425"
    style="enable-background:new 0 0 489.425 489.425;" xml:space="preserve">
    <g>
      <g>
        <path d="M122.825,394.663c17.8,19.4,43.2,30.6,69.5,30.6h216.9c44.2,0,80.2-36,80.2-80.2v-200.7c0-44.2-36-80.2-80.2-80.2h-216.9
     c-26.4,0-51.7,11.1-69.5,30.6l-111.8,121.7c-14.7,16.1-14.7,40.3,0,56.4L122.825,394.663z M29.125,233.063l111.8-121.8
     c13.2-14.4,32-22.6,51.5-22.6h216.9c30.7,0,55.7,25,55.7,55.7v200.6c0,30.7-25,55.7-55.7,55.7h-217c-19.5,0-38.3-8.2-51.5-22.6
     l-111.7-121.8C23.025,249.663,23.025,239.663,29.125,233.063z" />
        <path
          d="M225.425,309.763c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l47.8-47.8l47.8,47.8c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6
     c4.8-4.8,4.8-12.5,0-17.3l-47.9-47.8l47.8-47.8c4.8-4.8,4.8-12.5,0-17.3s-12.5-4.8-17.3,0l-47.8,47.8l-47.8-47.8
     c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l47.8,47.8l-47.8,47.8C220.725,297.263,220.725,304.962,225.425,309.763z" />
      </g>
    </g>
  </svg>`);

    listItem.classList.add('list__item')
    checkbox.classList.add('checkbox',)
    label.classList.add('item__task', 'item__edit-mode-label')
    // label.classList.add('item__task', , 'item__edit-mode-label')
    // editInput.classList.add('item__task', 'item__task-input', 'input', )
    editInput.classList.add('item__task', 'item__input-hidden', 'item__task-input', 'input', 'item__input-text')
    editButton.classList.add('edit', 'item__btn',)
    deleteButton.classList.add('delete', 'item__btn',)

    //and appending.
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}




var addTask = function () {
    console.log("Add item__task...");
    //Create a new list item with the item__input-text from the #item__input-header:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

//Edit an existing task.

var editTask = function () {
    console.log("edit item__task...");
    console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector('input[type=item__input-text]');
    var label = listItem.querySelector("label");
    var edititem__btn = listItem.querySelector(".edit");
    var containsClass = listItem.classList.contains("list__item__edit-mode");
    //If class of the parent is .list__item__edit-mode
    if (containsClass) {

        //switch to .list__item__edit-mode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        edititem__btn.innerText = "edit";
    } else {
        editInput.value = label.innerText;
        edititem__btn.innerText = "Save";
    }

    //toggle .list__item__edit-mode on the parent.
    listItem.classList.toggle("list__item__edit-mode");
};


//Delete task.
var deleteTask = function () {
    console.log("Delete item__task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}

//Mark task completed
var taskCompleted = function () {
    console.log("Complete item__task...");

    //Append the item__task list item to the #completed-tasks
    var listItem = this.parentNode;
    var label = listItem.querySelector('label')
    var btn = listItem.querySelector('button')

    if (listItem.classList.contains('list__item__edit-mode')) {
        listItem.classList.remove('list__item__edit-mode')
        btn.innerText = 'edit'
    }

    label.classList.add('complete-label')
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function () {
    console.log("Incomplete item__task...");
    //Mark item__task as incomplete.
    //When the checkbox is unchecked
    //Append the item__task list item to the #incomplete-tasks.
    var listItem = this.parentNode;
    listItem.querySelector('label').classList.remove('complete-label')
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



var ajaxRequest = function () {
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function (taskListItem, checkboxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    var checkbox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkboxEventHandler.
    checkbox.onchange = checkboxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}



//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.