//CREATE A TASK OBJECT THAT CONTAINS A TAKSNAME AND TASKS ARRAY
let tasks = []
// let activeTaskIndex = null

function createTask(){
    let task = {
        taskName : "",
        itemList : []
    }
    tasks.push(task);
    console.log(task)
    renderTasks()

}
// let newTask = document.getElementById('add-task');

function renderTasks(){
    let taskElement = document.getElementById("taskContainer")
    taskElement.innerHTML = "";

    for(let i = 0; i < tasks.length; i++) {
        let taskName = tasks[i].name;
        //============OBJECT TASK CONTAINER===========
        let listItem = document.createElement("div")
        listItem.style.width = "100%"
        listItem.style.padding = "1em 0"
        listItem.style.display = "flex"

        //============BUTTONS CONTAINER=============
        let buttons = document.createElement("div")
        buttons.style.display = "flex"
        buttons.style.gap= "2em"

        //=============TASK=============
        let taskObject = document.createElement("div")
        taskObject.style.fontSize = "20px"
        taskObject.style.width = "100%"
        taskObject.id = "taskName"
        taskObject.textContent = "Untitled"


        //=============OPEN LIST BUTTON==============
        let openTask = document.createElement("i")
        openTask.className = "fa-solid fa-chevron-right"
        openTask.style.color = "#0073ff"
        openTask.style.fontSize = "25px"
        openTask.setAttribute("data-type", "task")


        //=============DELETE BUTTON============
        let deleteButton = document.createElement("i");
        deleteButton.className = "fa-solid fa-trash";
        deleteButton.style.color = "#0073ff";
        deleteButton.style.fontSize = "25px"
        deleteButton.setAttribute("data-type", "task");



        //=========DIVIDING LINE==========
        // let divider = document.createElement("hr")
        // divider.setAttribute("data-type", "task")
        // divider.style.color = "rgb(50, 50, 50)";
        // divider.style.marginTop = ".5em"

        listItem.textContent= taskName;

        taskElement.appendChild(listItem)
        listItem.appendChild(taskObject)
        listItem.appendChild(buttons)
        buttons.appendChild(deleteButton)
        buttons.appendChild(openTask)
        // listItem.appendChild(taskContainer)
    }
}


renderTasks();