//CREATE A TASK OBJECT THAT CONTAINS A TAKSNAME AND TASKS ARRAY
let tasks = []
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
        // taskName : activeTaskIndex !== null ? tasks[activeTaskIndex].
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
    saveTasksToLocalStorage();
}

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
            editTask(taskIndex)
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
        openTaskButton.setAttribute("data-type", "task")
        openTaskButton.addEventListener("click", openTask)
        

        taskElement.appendChild(listItem)
        listItem.appendChild(editButton)
        listItem.appendChild(taskObject)
        listItem.appendChild(buttons)
        buttons.appendChild(deleteButton)
        buttons.appendChild(openTaskButton)

    }
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
let editInputFields = []
// let editInputField = null
function editTask(taskIndex){
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
        //hide the input field an show the updated task name
        editInputFields[taskIndex].style.display = "none"
        taskNameElement.style.display = "block"
        taskNameElement.textContent = newTaskName
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

//============OPEN TASK FUNCTION============

function openTask(){
   const toDoList = document.getElementById("toDoList")
   const taskContainer = document.getElementById("taskContainer")

   taskContainer.style.transform = "translateX(0)"
   toDoList.style.transform = "translateX(100%)"

   taskContainer.style.transition = "transform 0.5s ease-in-out"
   toDoList.style.transition = "transform 0.5s ease-in-out"

   setTimeout(() =>{
    taskContainer.style.transform = "translateX(-100%)"
    toDoList.style.transform = "translateX(0)"
   }, 100)
}

renderTasks()