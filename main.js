var addBtn = document.getElementsByClassName("add-btn");
var inputName = document.getElementById("nameTask");
var inputEst = document.getElementById("estTask");
var column = document.getElementsByClassName("column");
var task = document.getElementsByClassName("task");
var snack = document.getElementById("snackbar");
var showBtn = document.getElementById("showBtn");
var taskForm = document.getElementById("taskForm");

function addTask() {
    if (taskForm.classList.contains("display-none")) {
        taskForm.classList.toggle("display-none");
        showBtn.classList.toggle("display-none");
        return
    }
    
    if (inputName.value == "" || inputEst.value == "") {
        snack.className = "show";
        setTimeout(function() {
            snack.className = snack.className.replace("show", "");
        }, 3000);
        return;
    }

    var newTask = task[0].cloneNode(true);
    newTask.classList.remove("display-none");
    var newTaskName = newTask.getElementsByClassName("task-name")[0];
    var newTaskEst = newTask.getElementsByClassName("task-est")[0];

    newTask.querySelector(".prev-btn").addEventListener("click", moveTask);
    newTask.querySelector(".next-btn").addEventListener("click", moveTask);
    newTask.querySelector(".delete-btn").addEventListener("click", deleteTask);
    
    newTaskName.innerHTML = inputName.value;
    newTaskEst.innerHTML = inputEst.value;
    
    newTask.insertBefore(newTaskName, newTaskEst);
    
    console.log(newTask);

    if (this.id == "todoBtn") {
        column[0].insertBefore(newTask, column[0].lastElementChild);
    } else if (this.id == "progressBtn") {
        column[1].insertBefore(newTask, column[1].lastElementChild);
    } else if (this.id == "testedBtn") {
        column[2].insertBefore(newTask, column[2].lastElementChild);
    } else if (this.id == "doneBtn") {
        column[3].insertBefore(newTask, column[3].lastElementChild);
    }

    inputName.value = "";
    inputEst.value = "";

    taskForm.classList.toggle("display-none");
    showBtn.classList.toggle("display-none");  

    hideBtn();
}

for (var i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener("click", addTask);
}  


showBtn.addEventListener("click", function() {
    taskForm.classList.toggle("display-none");
    showBtn.classList.toggle("display-none");
});

function hideBtn() {
    for (var i = 0; i < task.length; i++) {
        if (task[i].parentElement.previousElementSibling == null) {
            task[i].querySelector(".prev-btn").classList.add("task_none");
        } else {
            task[i].querySelector(".prev-btn").classList.remove("task_none");
        }

        if (task[i].parentElement.nextElementSibling == null) {
            task[i].querySelector(".next-btn").classList.add("task_none");
        } else {
            task[i].querySelector(".next-btn").classList.remove("task_none");
        }
    }
}

hideBtn();

function moveTask() {
    var task = this.parentElement;
    var newTask = task.cloneNode(true);
    
    newTask.querySelector(".prev-btn").addEventListener("click", moveTask);
    newTask.querySelector(".next-btn").addEventListener("click", moveTask);
    newTask.querySelector(".delete-btn").addEventListener("click", deleteTask);
    
    console.log(task.parentElement);
    
    if (this.classList.contains("prev-btn")) {
        task.parentElement.previousElementSibling.insertBefore(newTask, task.parentElement.previousElementSibling.lastElementChild);
    } else if (this.classList.contains("next-btn")) {
        task.parentElement.nextElementSibling.insertBefore(newTask, task.parentElement.nextElementSibling.lastElementChild);
    }
    
    task.remove();
    hideBtn();
}

var prevBtn = document.getElementsByClassName("prev-btn");
var nextBtn = document.getElementsByClassName("next-btn");

for (var i = 0; i < prevBtn.length; i++) {
    prevBtn[i].addEventListener("click", moveTask);
}

for (var i = 0; i < nextBtn.length; i++) {
    nextBtn[i].addEventListener("click", moveTask);
}

function deleteTask() {
    this.parentElement.remove();
}

var deleteBtn = document.getElementsByClassName("delete-btn");

for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", deleteTask);
}