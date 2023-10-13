//CREATE A TASK OBJECT THAT CONTAINS A TAKSNAME AND TASKS ARRAY
let tasks = []
let taskNameHeading;
let activeTaskIndex = null

function saveTasksToLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
    console.log("tasks save to LocalStorage", tasks)
}

function loadtasksFromLocalStorage(){
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks){
        tasks = JSON.parse(storedTasks)
        console.log("tasks saved to the LocalStorage", tasks)
    
    }
}
loadtasksFromLocalStorage()


function createTask(){

    let task = {
        taskName : "Untitled",
        toDoList : []
    }

    if (activeTaskIndex !== null && tasks[activeTaskIndex].taskName.trim() !== ""){
        task.taskName = tasks[activeTaskIndex].taskName



    }

    tasks.push(task)
    activeTaskIndex = tasks.length -1
    console.log(task)
    renderTasks()
    renderToDos(task)
    saveTasksToLocalStorage();
}
//===============FUNCTION TO RENDER ALL TASK===============
function renderTasks(){
    let taskElement = document.getElementById("taskContainer")
    taskElement.innerHTML = "";

    for(let i = 0; i < tasks.length; i++) {
        let taskName = tasks[i].taskName;
        //============OBJECT TASK CONTAINER===========
        let listItem = document.createElement("div")
        listItem.style.width = "100%"
        listItem.style.padding = "1em 0"
        listItem.style.display = "flex"
        listItem.style.alignItems = "center"
        listItem.className = "task-container"

        //============BUTTONS CONTAINER=============
        let buttons = document.createElement("div")
        buttons.style.display = "flex"
        buttons.style.gap = "3em"
        buttons.className = "buttons-container"

        //=============TASK=============
        let taskObject = document.createElement("div")
        taskObject.style.fontSize = "25px"
        taskObject.style.width = "100%"
        // taskObject.id = "taskName"
        taskObject.classList.add("task-name") //this replaces the id for a class so that we don't have multiple objects with the same taskName id name
        taskObject.textContent = taskName

        //=============EDIT BUTTON==============
        let editButton = document.createElement("i")
        editButton.className = "fa-solid fa-pen-to-square"
        editButton.style.color = "#0073ff"
        editButton.style.fontSize = "25px"
        editButton.style.marginRight = "2em"
        editButton.setAttribute("data-type", "task")
        //Thi is to use the data attribute to store the taskIndex for this button
        editButton.setAttribute("data-task-index", i)
        editButton.addEventListener("click", function(event){
            let taskIndex = event.target.getAttribute("data-task-index")
            editTask(taskIndex,taskNameHeading)
        })

        //=============DELETE BUTTON============
        let deleteButton = document.createElement("i")
        deleteButton.className = "fa-solid fa-trash"
        deleteButton.style.color = "#0073ff"
        deleteButton.style.fontSize = "25px"
        deleteButton.setAttribute("data-type", "task")
        deleteButton.addEventListener("click", function(){
            deleteTask(i)

        })
        //=============OPEN TASK BUTTON==============
        let openTaskButton = document.createElement("i")
        openTaskButton.className = "fa-solid fa-chevron-right"
        openTaskButton.style.color = "#0073ff"
        openTaskButton.style.fontSize = "25px"
        openTaskButton.setAttribute("data-task-index", i)
        openTaskButton.setAttribute("data-type", "task")
        // openTaskButton.addEventListener("click", openTask)
        openTaskButton.addEventListener("click", function(event){
            let taskIndex = event.target.getAttribute("data-task-index")
            openTask(taskIndex)
        })

        taskElement.appendChild(listItem)
        listItem.appendChild(editButton)
        listItem.appendChild(taskObject)
        listItem.appendChild(buttons)
        buttons.appendChild(deleteButton)
        buttons.appendChild(openTaskButton)
        
    }

    //=== DYNAMICALY CREATES THE CREATE TASK BUTTON ===
    let buttonContainer = document.getElementById("taskContainer")
    let addButton = document.createElement("button")
    addButton.id = "add-task"
    addButton.className = "ml-4 w-fit"
    addButton.addEventListener("click", createTask)

    let addIcon = document.createElement("i")
    addIcon.className = "fa-solid fa-plus mr-1 add-task bg-primary-blue rounded-2xl"
    addIcon.style.color = "white"

    addButton.appendChild(addIcon)
    buttonContainer.appendChild(addButton)
}
//=========FUNCTION TO RENDER TO DO BUTTONS========
function renderToDos(taskIndex){
    let toDoListElement = document.getElementById("toDoList")
    toDoListElement.innerHTML = ""
    //CONTAINER FORT HE GO BACK BUTTON & HEADING
    let toDoHeading = document.createElement("div")
    toDoHeading.className = "toDoHeading flex place-items-center w-full"

    // GENERATES THE GO BACK BUTTON
    let goBackButton  = document.createElement("i")
    goBackButton.className = "fa-solid fa-chevron-left"
    goBackButton.style.color = "#0073ff"
    goBackButton.style.fontSize = "25px"
    goBackButton.style.width = "10%"
    // goBackButton.style.marginRight = "-15.63px"
    goBackButton.addEventListener("click", closeTask)

    // GENERATES THE TASK NAME HEADING
    if(taskIndex !== null && tasks[taskIndex] && tasks[taskIndex].taskName){
        taskNameHeading = taskNameHeading || document.createElement("h2")
        taskNameHeading.className = "w-80 text-center"
        taskNameHeading.style.fontSize = "25px"
        taskNameHeading.textContent = tasks[taskIndex].taskName
        
    } else {
        taskNameHeading = taskNameHeading || document.createElement("h2")
        taskNameHeading.className = "w-80 text-center"
        taskNameHeading.style.fontSize = "25px"
        taskNameHeading.textContent = "Untitled"
    }
    console.log(taskIndex)
    // GENERTES THE ADD TO DO BUTTON
    let addToDoButton = document.createElement("button")
    addToDoButton.id = "addToDoButton"
    addToDoButton.className = "w-fit bg-primary-blue p-3 rounded-3xl flex flex-col justify-center place-items-center mt-4"
    addToDoButton.textContent = `Add To Do`

    toDoListElement.appendChild(toDoHeading)
    toDoHeading.appendChild(goBackButton)
    toDoHeading.appendChild(taskNameHeading)
    toDoListElement.appendChild(addToDoButton)
   
}

function setActiveTask(index){
    activeTaskIndex = index
}
//=============DELETE TASK FUNCTION===========
function deleteTask(taskIndex){
    if (confirm("Are you sure you want to delete this task?")){
        tasks.splice(taskIndex, 1)
        if (activeTaskIndex === taskIndex){
            activeTaskIndex = null
        }
        renderTasks()
    }
    saveTasksToLocalStorage(activeTaskIndex)
}

//=============EDIT TASK FUNCTION================

//This array separates all input fields so that each task has its own, rather than all sharing the same, which could cause issues by editing all names of tasks at once.
let editInputFields = []

function editTask(taskIndex, taskNameHeading){
    let taskObject = document.getElementById("taskContainer").children[taskIndex]
    let taskNameElement = taskObject.querySelector(".task-name")
    // Get the existing task name
    let currentTaskName = taskNameElement.textContent
    //Display the input field and set its value to the task name
    //If the input field does not exist, create it
    if (!editInputFields[taskIndex]){
        editInputFields[taskIndex] = document.createElement("input")
        editInputFields[taskIndex].style.width = "100%"
        editInputFields[taskIndex].style.color = "black"
        editInputFields[taskIndex].style.marginRight = "3em"
        editInputFields[taskIndex].style.padding = ".5em"
    }
    // This is meant for convenience to focus on the input field
    editInputFields[taskIndex].focus()
    // Thi is to add an event listener to handle the editing
    editInputFields[taskIndex].addEventListener("blur", function(){
        //When the input field loses focus, update the task name
        let newTaskName = editInputFields[taskIndex].value
        tasks[taskIndex].taskName = newTaskName

        if(taskNameHeading){
            taskNameHeading.textContent = newTaskName
        }
        
        //hide the input field an show the updated task name
        editInputFields[taskIndex].style.display = "none"
        taskNameElement.style.display = "block"
        taskNameElement.textContent = newTaskName

        renderTasks()
        saveTasksToLocalStorage()
    })
    editInputFields[taskIndex].addEventListener("keyup", function(event){
        if(event.keyCode === 13){
            editInputFields[taskIndex].blur()
        }
    })
    editInputFields[taskIndex].value = currentTaskName
    editInputFields[taskIndex].style.display = "block"
    taskNameElement.style.display = "none"
    taskObject.insertBefore(editInputFields[taskIndex], taskObject.querySelector(".buttons-container"));
}

//============OPEN TASKS FUNCTION============
function openTask(activeTaskIndex){
   const toDoList = document.getElementById("toDoList")
   const taskContainer = document.getElementById("taskContainer")

   taskContainer.style.transition = "width 0.5s ease-in-out, padding 0.6s ease-in-out, opacity 0.4s ease-in-out";
   toDoList.style.transition = "width 0.5s ease-in-out, padding 0.5s ease-in-out, opacity 0.5s ease-in-out";

   // Hide the taskContainer by reducing its width and padding to 0
   taskContainer.style.width = "0";
   taskContainer.style.padding = "0";
   taskContainer.style.opacity = "0"

   // Expand the toDoList by increasing its width to 100% and adding padding
   toDoList.style.width = "100%";
   toDoList.style.padding = "2rem";
   toDoList.style.opacity = "100"
   renderToDos(activeTaskIndex)
}

//============CLOSE TASK FUNCTION============

function closeTask(){
    const toDoList = document.getElementById("toDoList")
    const taskContainer = document.getElementById("taskContainer")
 
    taskContainer.style.transition = "width 0.5s ease-in-out, padding .6s ease-in-out, opacity 0.65s ease-in-out";
    toDoList.style.transition = "width 0.5s ease-in-out, padding .6s ease-in-out, opacity 0.5s ease-in-out";
    // Hide the taskContainer by reducing its width and padding to 0
    toDoList.style.width = "0";
    toDoList.style.padding = "0";
    toDoList.style.opacity = "0"
 
    // Expand the toDoList by increasing its width to 100% and adding padding
    taskContainer.style.width = "100%";
    taskContainer.style.padding = "1rem";
    taskContainer.style.opacity = "100"
 }


renderTasks()
