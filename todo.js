//CREATE A TASK OBJECT THAT CONTAINS A TAKSNAME AND TASKS ARRAY
let tasks = []
let activeTaskIndex = null

function saveTasksToLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
    console.log("tasks save to LovalStorage", tasks)
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
        itemList : []
    }
    tasks.push(task)
    activeTaskIndex = tasks.length -1
    console.log(task)
    renderTasks()


    saveTasksToLocalStorage();
}
// let newTask = document.getElementById('add-task');

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

        //============BUTTONS CONTAINER=============
        let buttons = document.createElement("div")
        buttons.style.display = "flex"
        buttons.style.gap= "3em"

        //=============TASK=============
        let taskObject = document.createElement("div")
        taskObject.style.fontSize = "25px"
        taskObject.style.width = "100%"
        taskObject.id = "taskName"
        taskObject.textContent = "Untitled"

        //=============EDIT BUTTON==============
        let editButton = document.createElement("i")
        editButton.className = "fa-regular fa-clipboard"
        editButton.style.color = "#0073ff"
        editButton.style.fontSize = "25px"
        editButton.style.marginRight = "2em"
        editButton.setAttribute("data-type", "task")
        editButton.addEventListener("click", function(){
            editTask(activeTaskIndex, index)
        })

        //=============DELETE BUTTON============
        let deleteButton = document.createElement("i")
        deleteButton.className = "fa-solid fa-trash"
        deleteButton.style.color = "#0073ff"
        deleteButton.style.fontSize = "25px"
        deleteButton.setAttribute("data-type", "task")
        deleteButton.addEventListener("click", function(){
            deleteTask(i)

            listItem.appendChild(deleteButton)

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

renderTasks()