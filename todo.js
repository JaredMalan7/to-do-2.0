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
        itemList : []
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

        //=============OPEN LIST BUTTON==============
        let openTask = document.createElement("i")
        openTask.className = "fa-solid fa-chevron-right"
        openTask.style.color = "#0073ff"
        openTask.style.fontSize = "25px"
        openTask.setAttribute("data-type", "task")

    

        taskElement.appendChild(listItem)
        listItem.appendChild(editButton)
        listItem.appendChild(taskObject)
        listItem.appendChild(buttons)
        buttons.appendChild(deleteButton)
        buttons.appendChild(openTask)

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

let editInputField = null

function editTask(taskIndex){
    let taskObject = document.getElementById("taskContainer").children[taskIndex]
    let taskNameElement = taskObject.querySelector(".task-name")

    // Get the existing task name
    let currentTaskName = taskNameElement.textContent

    //this is meant to hide the task name element
    // taskNameElement.style.display = "none"


    //Display the input field and set its value to the task name
    //If the input field does not exist, create it
    if (!editInputField){
        editInputField = document.createElement("input")
        editInputField.style.width = "100%"
        editInputField.style.color = "black"
        editInputField.style.marginRight = "3em"
        editInputField.style.padding = ".5em"
    }



//    inputField.value = currentTaskName
//    taskObject.appendChild(inputField) //I commented this out because I am appending it down using the insert before method


    // This is meant for convenience to focus on the input field
    editInputField.focus()

    // Thi is to add an event listener to handle the editing
    editInputField.addEventListener("blur", function(){

        //When the input field loses focus, update the task name
        let newTaskName = editInputField.value
        tasks[taskIndex].taskName = newTaskName


        //hide the input field an show the updated task name
        editInputField.style.display = "none"
        taskNameElement.style.display = "block"
        taskNameElement.textContent = newTaskName


        saveTasksToLocalStorage()
    })


    editInputField.addEventListener("keyup", function(event){

        if(event.keyCode === 13){
            editInputField.blur()
        }
    })

    editInputField.value = currentTaskName
    editInputField.style.display = "block"
    taskNameElement.style.display = "none"


    taskObject.insertBefore(editInputField, taskObject.querySelector(".buttons-container"));
}

renderTasks()