const taskInput = document.querySelector(".AjouTask input");
taskItem = document.querySelector(".taskItem")

//local storage
let todos = JSON.parse(localStorage.getItem("todo-list"));

function showTodo() {
    let li = "";
    if(todos){
        todos.forEach((todo, id) => {
            li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateSatuts(this)" type="checkbox" id="${id}">
                            <div class="infoTask">
                            <p>${todo.name}</p>
                            </div>
                            <h2></h2>
                        </label>
                        <div class="settings">
                            <button>Supprimer</button>
                            <img src="" alt="">
                        </div>
                    </li>`;
        });
    }
    taskItem.innerHTML = li;
}
showTodo();
function updateSatuts(selectedTask) {
    let taskName = selectedTask.parentElement.lastChildElement;
    if(selectedTask.checked) {
        taskName.classList.add("checked")
    }else {
        taskName.classList.remove("checked");
    }
}
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        
        if(!todos){ //if todo isn't exist, pass an empty array to todos
            todos = [];
        }
        taskInput.value = "";
        let taskInfo = {name: userTask, status:"encours"};
        todos.push(taskInfo); // ajouter un nouveau tache
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
});