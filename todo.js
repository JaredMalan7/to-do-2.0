//CREATE A TASK OBJECT THAT CONTAINS A TAKSNAME AND TASKS ARRAY
let tasks = []
let taskNameHeading
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

    // if (activeTaskIndex !== null && tasks[activeTaskIndex].taskName.trim() !== ""){
    //     task.taskName = tasks[activeTaskIndex].taskName

    // }

    tasks.push(task)
    activeTaskIndex = tasks.length -1
    console.log(task)
    renderTasks()
    renderToDos(activeTaskIndex)
    saveTasksToLocalStorage()
}
//===============FUNCTION TO RENDER ALL TASK===============
function renderTasks(){
    let taskElement = document.getElementById("taskContainer")
    taskElement.innerHTML = ""

    for(let i = 0; i < tasks.length; i++) {
        let taskName = tasks[i].taskName
        //============OBJECT TASK CONTAINER===========
        let listItem = document.createElement("div")
        listItem.style.width = "100%"
        listItem.style.padding = "1rem"
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
//=========CREATES TO-DO ELEMENTS=============
function addToDo(taskIndex){
    
    if(activeTaskIndex === taskIndex) {
        let task = tasks[taskIndex]
        let toDoInput = document.querySelector("#toDoList input[type='text']")

        if(toDoInput.style.display === "block"){
            let toDoDescription = toDoInput.value
            if(toDoDescription.trim() !== ""){
                let newToDo = {
                    description: toDoDescription,
                    completed: false,
                }
                task.toDoList.push(newToDo)
                saveTasksToLocalStorage()
                renderToDos(taskIndex)
            }
            toDoInput.style.display = "none"
            
        }else{
            toDoInput.style.display = "block"
            toDoInput.focus()
        }
    }
}

//=========RENDERS TO-DO BUTTONS & LIST========
function renderToDos(taskIndex){
    let toDoListElement = document.getElementById("toDoList")
    toDoListElement.innerHTML = ""


    let toDoInput = document.createElement("input")
    toDoInput.type = "text"
    toDoInput.placeholder = "Enter a to-do item"
    toDoInput.style.margin = "1rem"
    toDoInput.style.padding = "1rem"
    toDoInput.style.color = "black"
    toDoInput.style.display = "none"
    toDoInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addToDo(taskIndex)
        }
    })
    

    //CONTAINER FORT HE GO BACK BUTTON & HEADING
    let toDoHeading = document.createElement("div")
    toDoHeading.className = "toDoHeading flex place-items-center w-full"
    toDoHeading.style.padding = "1rem"
    toDoHeading.style.backgroundColor = "#272727"

    // GENERATES THE GO BACK BUTTON
    let goBackButton  = document.createElement("i")
    goBackButton.className = "fa-solid fa-chevron-left"
    goBackButton.style.color = "#0073ff"
    goBackButton.style.fontSize = "25px"
    goBackButton.style.width = "10%"
    goBackButton.addEventListener("click", closeTask)

    // GENERATES THE TASK NAME HEADING
    if(taskIndex !== null && tasks[taskIndex]){
        activeTaskIndex = taskIndex //sets the active task index
        taskNameHeading = document.createElement("h2")
        taskNameHeading.className = "w-80 text-center"
        taskNameHeading.style.fontSize = "25px"
        taskNameHeading.textContent = tasks[taskIndex].taskName
        
        // Append taskNameHeading before to-do items
        toDoHeading.appendChild(goBackButton)
        toDoHeading.appendChild(taskNameHeading)
        toDoListElement.appendChild(toDoHeading)

        tasks[taskIndex].toDoList.forEach((toDoItem, index) =>{
            let toDoContainer = document.createElement("div")
            toDoContainer.className = `to-do-item flex place-items-center p-4 ${toDoItem.completed ? "line-through" : ""}`
            // toDoContainer.textContent = toDoItem.description
            // toDoContainer.style.alignItems = "center"

            // creates a checkbox for the to-do-item
            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.checked = toDoItem.completed
            

            // Attach an event listener to the checkbox to mark as completed
            checkbox.addEventListener("change", function () {
            toDoItem.completed = checkbox.checked
            toDoContainer.classList.toggle("line-through")

     
            saveTasksToLocalStorage()
            renderToDos(taskIndex)
        })

        let toDoValue = document.createElement("div")
        toDoValue.className = "toDoValue"
        toDoValue.textContent = toDoItem.description
        toDoValue.style.padding = "1rem"
        toDoValue.style.fontSize = "20px"

        toDoContainer.appendChild(checkbox)

        toDoContainer.appendChild(toDoValue)

        toDoListElement.appendChild(toDoContainer)
        })

        if (tasks[taskIndex].toDoList.some((item) => item.completed)) {
            let deleteCompletedButton = document.createElement("button")
            deleteCompletedButton.className = "bg-primary-blue p-2.5 rounded-full"
            deleteCompletedButton.textContent = "Delete Completed"
            deleteCompletedButton.style.position = "absolute"
            deleteCompletedButton.style.right = "2%"
            deleteCompletedButton.style.fontSize = "14px"
            deleteCompletedButton.addEventListener("click", function () {
                // Remove completed to-do items and save changes
                tasks[taskIndex].toDoList = tasks[taskIndex].toDoList.filter(
                    (item) => !item.completed
                )
                saveTasksToLocalStorage()
                renderToDos(taskIndex)
            })
            toDoListElement.appendChild(toDoInput)
            toDoHeading.appendChild(deleteCompletedButton)
        }


    }

    // console.log(taskIndex)
    // GENERATES THE ADD TO DO BUTTON
    let addToDoButton = document.createElement("button")
    addToDoButton.id = "addToDoButton"
    addToDoButton.className = "w-fit bg-primary-blue p-2 rounded-3xl flex flex-col justify-center place-items-center"
    addToDoButton.style.margin = "2rem"
    addToDoButton.textContent = `Add To Do`

    addToDoButton.addEventListener("click", function(){
        addToDo(taskIndex)
    })
    
    toDoListElement.appendChild(toDoInput)
    toDoListElement.appendChild(addToDoButton)

}
//==========SETS THE ACTIVE TASK BY INDEX=========
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

//This array separates all input fields so that each task has its own, rather than all sharing the same, which could cause issues by editing all names of tasks at once.
let editInputFields = []
//=============EDIT TASK FUNCTION================
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
    taskObject.insertBefore(editInputFields[taskIndex], taskObject.querySelector(".buttons-container"))
}

//============OPEN TASKS FUNCTION============
function openTask(activeTaskIndex){
   const toDoList = document.getElementById("toDoList")
   const taskContainer = document.getElementById("taskContainer")

   taskContainer.style.transition = "width 0.5s ease-in-out, padding 0.6s ease-in-out, opacity 0.4s ease-in-out"
   toDoList.style.transition = "width 0.5s ease-in-out, padding 0.5s ease-in-out, opacity 0.5s ease-in-out"

   // Hide the taskContainer by reducing its width and padding to 0
   taskContainer.style.width = "0"
   taskContainer.style.padding = "0"
   taskContainer.style.opacity = "0"
   taskContainer.style.overflow = "hidden"
   // Expand the toDoList by increasing its width to 100% and adding padding
   toDoList.style.width = "100%"
//    toDoList.style.padding = "2rem"
   toDoList.style.opacity = "100"
   renderToDos(activeTaskIndex)
}

//============CLOSE TASK FUNCTION============
function closeTask(){
    const toDoList = document.getElementById("toDoList")
    const taskContainer = document.getElementById("taskContainer")
 
    taskContainer.style.transition = "width 0.5s ease-in-out, padding .6s ease-in-out, opacity 0.65s ease-in-out"
    toDoList.style.transition = "width 0.5s ease-in-out, padding .6s ease-in-out, opacity 0.5s ease-in-out"
    // Hide the taskContainer by reducing its width and padding to 0
    toDoList.style.width = "0"
    toDoList.style.padding = "0"
    toDoList.style.opacity = "0"
 
    // Expand the toDoList by increasing its width to 100% and adding padding
    taskContainer.style.width = "100%"
    taskContainer.style.padding = "0"
    taskContainer.style.opacity = "100"
 }

renderTasks()