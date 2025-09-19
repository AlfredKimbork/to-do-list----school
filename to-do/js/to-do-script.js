//  add form and relatives
const formBtn = document.querySelector("#open-close-form-button")
const form = document.querySelector("form")

const titleInput = document.querySelector("#title-input");
const priorityInput = document.querySelector("#priority")
const descInput = document.querySelector("#desc-input");
const addToDoBtn = document.querySelector("#add-todo-button");

// autocomplete
const autocompleteContainer = document.querySelector("#autocomplete-container")
let autocompleteSuggestions = document.querySelector("#autautocomplete-suggestionocomplete-suggestions")
const autocomplete = title => {
    titleInput.value = title; 
    
    autocompleteContainer.innerHTML = ""
}

// sections
const incompleteTasksSection = document.querySelector("#incomplete-tasks");
const completedTasksSection = document.querySelector("#completed-tasks");
const deletedTasksSection = document.querySelector("#deleted-tasks");

//section toggling
const incompleteTasksToggle = document.querySelector("#incomplete-tasks-toggle");
const completedTasksToggle = document.querySelector("#completed-tasks-toggle");
const deletedTasksToggle = document.querySelector("#deleted-tasks-toggle");
const sectionToggle = (sectionToggle, section) => {
    sectionToggle.addEventListener("click", () => {
        section.classList.toggle("opened")
    })
}

// sorting by priority - high
const highPriorityIncompleteTasks = document.querySelector("#incomplete-tasks .high-priority");
const highPriorityCompletedTasks = document.querySelector("#completed-tasks .high-priority");
const highPriorityDeletedTasks = document.querySelector("#deleted-tasks .high-priority");

// sorting by priority - medium
const mediumPriorityIncompleteTasks = document.querySelector("#incomplete-tasks .medium-priority");
const mediumPriorityCompletedTasks = document.querySelector("#completed-tasks .medium-priority");
const mediumPriorityDeletedTasks = document.querySelector("#deleted-tasks .medium-priority");

// sorting by priority - low
const lowPriorityIncompleteTasks = document.querySelector("#incomplete-tasks .low-priority");
const lowPriorityCompletedTasks = document.querySelector("#completed-tasks .low-priority");
const lowPriorityDeletedTasks = document.querySelector("#deleted-tasks .low-priority");

// sorting by priority - none
const nonePriorityIncompleteTasks = document.querySelector("#incomplete-tasks .none-priority");
const nonePriorityCompletedTasks = document.querySelector("#completed-tasks .none-priority");
const nonePriorityDeletedTasks = document.querySelector("#deleted-tasks .none-priority");

// no tasks to show
const incompleteTasksNone = document.querySelector("#incomplete-tasks p");
const completedTasksNone = document.querySelector("#completed-tasks p");
const deletedTasksNone = document.querySelector("#deleted-tasks p");

// effect all of type
const completeAllButton = document.querySelector("#complete-all-button")
const deleteAllButton = document.querySelector("#delete-all-button")
const clearAllButton = document.querySelector("#clear-all-button")

// setting a placeholder to kickstart

localStorage.setItem(0, '{"title":"placeholder","priority":"none","description":"","status":"placeholder"}');

// opening and closing the add form and adding tasks

formBtn.addEventListener("click", () => {
    form.classList.toggle("form-show")
    formBtn.classList.toggle("close")
})

addToDoBtn.addEventListener("click", () => {
    if(titleInput.value != "") {
        inputTask = {
            "title": titleInput.value,
            "priority": priorityInput.value,
            "description": descInput.value,
            "status": "incomplete"
        };

        id = localStorage.length

        localStorage.setItem(id, JSON.stringify(inputTask))

        location.reload()
    }
});

// toggling sections

sectionToggle(incompleteTasksToggle, incompleteTasksSection)
sectionToggle(completedTasksToggle, completedTasksSection)
sectionToggle(deletedTasksToggle, deletedTasksSection)

// completing tasks and uncompleting

completeAllButton.addEventListener("click", () => {

    for(let i = 0; i < localStorage.length; i++) {
        savedTask = localStorage.getItem(i);
        task = JSON.parse(savedTask);

        if(task.status == "incomplete") {
            document.querySelector(`#task-${i}`).classList.add("completed")
            task = {
               "title": task.title, 
               "priority": task.priority,
               "description": task.description,
               "status": "completed"
           }

           localStorage.setItem(i, JSON.stringify(task))
   
           setTimeout(() =>{
               location.reload()
           }, 750)
        }
        
    }
});

const handleComplete = completedTask => {
    document.querySelector(`#task-${completedTask}`).classList.add("completed")

    savedTask = localStorage.getItem(completedTask)
    task = JSON.parse(savedTask)

    let date = new Date();
    let timeOfCompletion = `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()} ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

    task = {
        "title": task.title, 
        "priority": task.priority,
        "description": task.description,
        "timeOfCompletion": timeOfCompletion,
        "status": "completed"
    };

    localStorage.setItem(completedTask, JSON.stringify(task))


    setTimeout(() =>{
        location.reload()
    }, 1250)
}

const handleUncomplete = uncompletedTask => {
    document.querySelector(`#task-${uncompletedTask}`).classList.remove("completed")

    savedTask = localStorage.getItem(uncompletedTask)
    task = JSON.parse(savedTask)

    task = {
        "title": task.title, 
        "priority": task.priority,
        "description": task.description,
        "status": "incomplete"
    };

    localStorage.setItem(uncompletedTask, JSON.stringify(task))


    setTimeout(() =>{
        location.reload()
    }, 1250)
}

// Deleting tasks and restoring them

deleteAllButton.addEventListener("click", () => {

    for(let i = 0; i < localStorage.length; i++) {
        savedTask = localStorage.getItem(i)
        task = JSON.parse(savedTask)

        if(task.status == "completed") {
            document.querySelector(`#task-${i}`).classList.add("deleted")

            task = {
               "title": task.title, 
               "priority": task.priority,
               "description": task.description,
               "status": "deleted"
           }
   
           localStorage.setItem(i, JSON.stringify(task))
   
           setTimeout(() =>{
               location.reload()
           }, 750)
        }
        
    }
});

const handleDelete = deletedTask => {
        document.querySelector(`#task-${deletedTask}`).classList.add("deleted")
    
        savedTask = localStorage.getItem(deletedTask)
        task = JSON.parse(savedTask)

        task = {
            "title": task.title, 
            "priority": task.priority,
            "description": task.description,
            "status": "deleted"
        };

        localStorage.setItem(deletedTask, JSON.stringify(task))

        setTimeout(() =>{
            location.reload()
        }, 1250)
    
}

const handleRestore = restoreTask => {
    document.querySelector(`#task-${restoreTask}`).classList.remove("deleted")

    savedTask = localStorage.getItem(restoreTask)
    task = JSON.parse(savedTask)

    task = {
        "title": task.title, 
        "priority": task.priority,
        "description": task.description,
        "status": "incomplete"
    };

    localStorage.setItem(restoreTask, JSON.stringify(task))

    setTimeout(() =>{
        location.reload()
    }, 1250)
}

// clear deleted tasks

clearAllButton.addEventListener("click", () => {

    for(let i = 0; i < localStorage.length; i++) {
        savedTask = localStorage.getItem(i)
        task = JSON.parse(savedTask)

        if(task.status == "deleted") {
            task = {
                "title": task.title, 
                "priority": task.priority,
                "description": task.description,
                "status": "cleared"
            }
    
            localStorage.setItem(i, JSON.stringify(task))
    
            location.reload()           
        }
    }
});

const handleClear = clearTask => {
    document.querySelector(`#task-${clearTask}`).classList.add("cleared")

    savedTask = localStorage.getItem(clearTask)
    task = JSON.parse(savedTask)

    task = {
        "title": task.title, 
        "priority": task.priority,
        "description": task.description,
        "status": "cleared"
    };

    localStorage.setItem(clearTask, JSON.stringify(task))

    setTimeout(() =>{
        location.reload()
    }, 1250)
}

// rendering all tasks

let anyIncomplete;
let anyCompleted
let anyDeleted
for(i = 0; i < localStorage.length; i++) {
    savedTask = localStorage.getItem(i)
    task = JSON.parse(savedTask)

    //incomplete
    task.status == "incomplete" ? anyIncomplete = true : "";
    anyIncomplete ? incompleteTasksNone.innerText = "" : incompleteTasksNone.innerText = "You currently don't any active tasks";

    isIncomplete = task.status == "incomplete"  

    isIncomplete && task.priority == "high" ? highPriorityIncompleteTasks.innerHTML += `<article id="task-${i}"><button onClick="handleComplete('${i}')" class="complete-btn"><span></span></button><div class="outline"><span class="background"><span class="cross"></span><span class="cross"></span></span></div><h3 class="title"><span class="high">!!!</span> ${task.title}</h3><p class="description">${task.description}</p><button onClick="handleDelete('${i}')" class="delete-btn"><img src="img/icons8-trash-can-48.png" alt=delete"><p>Delete</p></button></article>` : "";
    isIncomplete && task.priority == "medium" ? mediumPriorityIncompleteTasks.innerHTML += `<article id="task-${i}"><button onClick="handleComplete('${i}')" class="complete-btn"><span></span></button><div class="outline"><span class="background"><span class="cross"></span><span class="cross"></span></span></div><h3 class="title"><span class="medium">!!</span> ${task.title}</h3><p class="description">${task.description}</p><button onClick="handleDelete('${i}')" class="delete-btn"><img src="img/icons8-trash-can-48.png" alt=delete"><p>Delete</p></button></article>` : "";
    isIncomplete && task.priority == "low" ? lowPriorityIncompleteTasks.innerHTML += `<article id="task-${i}"><button onClick="handleComplete('${i}')" class="complete-btn"><span></span></button><div class="outline"><span class="background"><span class="cross"></span><span class="cross"></span></span></div><h3 class="title"><span class="low">!</span> ${task.title}</h3><p class="description">${task.description}</p><button onClick="handleDelete('${i}')" class="delete-btn"><img src="img/icons8-trash-can-48.png" alt=delete"><p>Delete</p></button></article>` : "";
    isIncomplete && task.priority == "none" ? nonePriorityIncompleteTasks.innerHTML += `<article id="task-${i}"><button onClick="handleComplete('${i}')" class="complete-btn"><span></span></button><div class="outline"><span class="background"><span class="cross"></span><span class="cross"></span></span></div><h3 class="title">${task.title}</h3><p class="description">${task.description}</p><button onClick="handleDelete('${i}')" class="delete-btn"><img src="img/icons8-trash-can-48.png" alt=delete"><p>Delete</p></button></article>` : "";

    // completed
    task.status == "completed" ? anyCompleted = true : "";
    anyCompleted ? completedTasksNone.innerText = "" : completedTasksNone.innerText = "No tasks has been completed yet";

    isCompleted = task.status == "completed"  

    isCompleted && task.priority == "high" ? highPriorityCompletedTasks.innerHTML += `<article id="task-${i}" class="completed"><button onClick="handleUncomplete('${i}')" class="uncomplete-btn"><span></span></button><div class="outline"><span class="background"><span class="cross"></span><span class="cross"></span></span></div><h3 class="title"><span class="high">!!!</span> ${task.title}</h3><p class="description">${task.description}</p><span class="time-of-completion">Completed :: ${task.timeOfCompletion}</span><button onClick="handleDelete('${i}')" class="delete-btn"><img src="img/icons8-trash-can-48.png" alt=delete"><p>Delete</p></button></article>` : "";
    isCompleted && task.priority == "medium" ? mediumPriorityCompletedTasks.innerHTML += `<article id="task-${i}" class="completed"><button onClick="handleUncomplete('${i}')" class="uncomplete-btn"><span></span></button><div class="outline"><span class="background"><span class="cross"></span><span class="cross"></span></span></div><h3 class="title"><span class="medium">!!</span> ${task.title}</h3><p class="description">${task.description}</p><span class="time-of-completion">Completed :: ${task.timeOfCompletion}</span><button onClick="handleDelete('${i}')" class="delete-btn"><img src="img/icons8-trash-can-48.png" alt=delete"><p>Delete</p></button></article>` : "";
    isCompleted && task.priority == "low" ? lowPriorityCompletedTasks.innerHTML += `<article id="task-${i}" class="completed"><button onClick="handleUncomplete('${i}')" class="uncomplete-btn"><span></span></button><div class="outline"><span class="background"><span class="cross"></span><span class="cross"></span></span></div><h3 class="title"><span class="low">!</span> ${task.title}</h3><p class="description">${task.description}</p><span class="time-of-completion">Completed :: ${task.timeOfCompletion}</span><button onClick="handleDelete('${i}')" class="delete-btn"><img src="img/icons8-trash-can-48.png" alt=delete"><p>Delete</p></button></article>` : "";
    isCompleted && task.priority == "none" ? nonePriorityCompletedTasks.innerHTML += `<article id="task-${i}" class="completed"><button onClick="handleUncomplete('${i}')" class="uncomplete-btn"><span></span></button><div class="outline"><span class="background"><span class="cross"></span><span class="cross"></span></span></div><h3 class="title">${task.title}</h3><p class="description">${task.description}</p><span class="time-of-completion">Completed :: ${task.timeOfCompletion}</span><button onClick="handleDelete('${i}')" class="delete-btn"><img src="img/icons8-trash-can-48.png" alt=delete"><p>Delete</p></button></article>` : "";

    // deleted
    task.status == "deleted" ? anyDeleted = true : "";
    anyDeleted ? deletedTasksNone.innerText = "" : deletedTasksNone.innerText = "No tasks has been deleted yet";

    isDeleted = task.status == "deleted" 
    
    isDeleted && task.priority == "high" ? highPriorityDeletedTasks.innerHTML += `<article id="task-${i}" class="deleted"><div class="outline"><span class="background" onClick="handleClear('${i}')"><span class="cross"></span><span class="cross"></span></span></div><h3 class="title"><span class="high">!!!</span> ${task.title}</h3><p class="description">${task.description}</p><button onClick="handleRestore('${i}')" class="restore-btn"><span></span><span></span><span></span><p>Restore</p></button></article>` : "";
    isDeleted && task.priority == "medium" ? mediumPriorityDeletedTasks.innerHTML += `<article id="task-${i}" class="deleted"><div class="outline"><span class="background" onClick="handleClear('${i}')"><span class="cross"></span><span class="cross"></span></span></div><h3 class="title"><span class="medium">!!</span> ${task.title}</h3><p class="description">${task.description}</p><button onClick="handleRestore('${i}')" class="restore-btn"><span></span><span></span><span></span><p>Restore</p></button></article>` : "";
    isDeleted && task.priority == "low" ? lowPriorityDeletedTasks.innerHTML += `<article id="task-${i}" class="deleted"><div class="outline"><span class="background" onClick="handleClear('${i}')"><span class="cross"></span><span class="cross"></span></span></div><h3 class="title"><span class="low">!</span> ${task.title}</h3><p class="description">${task.description}</p><button onClick="handleRestore('${i}')" class="restore-btn"><span></span><span></span><span></span><p>Restore</p></button></article>` : "";
    isDeleted && task.priority == "none" ? nonePriorityDeletedTasks.innerHTML += `<article id="task-${i}" class="deleted"><div class="outline"><span class="background" onClick="handleClear('${i}')"><span class="cross"></span><span class="cross"></span></span></div><h3 class="title">${task.title}</h3><p class="description">${task.description}</p><button onClick="handleRestore('${i}')" class="restore-btn"><span></span><span></span><span></span><p>Restore</p></button></article>` : "";
}

titleInput.addEventListener("input", () => {
    autocompleteContainer.innerHTML = `<div id="autocomplete-suggestions"></div>`  
    autocompleteSuggestions = document.querySelector("#autocomplete-suggestions")

    // autocompleteSuggestions.innerHTML = ""

    for (let i = 0; i < localStorage.length; i++) {

        if (titleInput.value.length >= 1) {

            savedTask = localStorage.getItem(i);
            task = JSON.parse(savedTask);
    
            isCleared = task.status == "cleared" 
            alreadyThere = false;
    
            suggestions = document.querySelectorAll(".autocomplete-suggestion");
            suggestions.forEach(suggestion => {
                suggestion.innerText == task.title ? alreadyThere = true : "";
            });

            isCleared && task.title.startsWith(titleInput.value) && !alreadyThere ? autocompleteSuggestions.innerHTML += `<p class="autocomplete-suggestion" onClick="autocomplete('${task.title}')">${task.title}</p>` : ""
            
            // suggestions.forEach(suggestion => {
            //     suggestion.innerText == task.description ? alreadyThere = true : "";
            // });

            // isCleared && task.description.startsWith(descInput.value) && !alreadyThere ? autocompleteSuggestions.innerHTML += `<p class="autocomplete-suggestion" onClick="autocomplete('${task.description}')">${task.description}</p>` : ""
            
        } 
    }
    
    autocompleteSuggestions.innerText == "" ? autocompleteContainer.innerHTML = "" : "";
    
});