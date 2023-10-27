const { Button } = require("semantic-ui-react");

function dark() {
    document.body.classList.toggle("dark");
}
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }
    var taskList = document.getElementById("taskList");
    var listItem = document.createElement("li");
    listItem.innerHTML = taskText;
    var addButton = document.createElement("button");
    addButton.innerText = "Add";
    addButton.onclick = function () {
        var clonedTask = listItem.cloneNode(true);
        clonedTask.removeChild(clonedTask.lastChild); 
        document.getElementById("taskList").appendChild(clonedTask);
    };
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
        taskList.removeChild(listItem);
    };

    listItem.appendChild(addButton);
    listItem.appendChild(deleteButton);
    taskInput.value = "";
    var taskItems = taskList.getElementsByTagName("li");
    var middleIndex = Math.floor(taskItems.length / 2);
    if (taskItems.length === 0) {
        taskList.appendChild(listItem);
    } else if (middleIndex === taskItems.length / 2) {
        taskList.insertBefore(listItem, taskItems[middleIndex + 1]);
    } else {
        taskList.insertBefore(listItem, taskItems[middleIndex]);
    }
}

