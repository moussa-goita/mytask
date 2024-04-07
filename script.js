const taskInput = document.querySelector(".AjouTask input");
const addTaskButton = document.getElementById("addTaskButton");
const taskItem = document.querySelector(".taskItem");

//popup
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
  modalContainer.classList.toggle("active")
}

// Local storage
let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

function showTodo() {
    let li = "";
    todos.forEach((todo, id) => {
        li += `<li class="task">
                <div class="task-content">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}">
                        <div class="infoTask">
                            <p>${todo.name}</p>
                            <p class="date">${todo.date}</p>
                        </div>
                        <h2></h2>
                    </label>
                    <div class="settings">
                    <p class="priority">${todo.priority}</p>                    <img src="" alt="">
                    <button onclick="deleteTask(${id})">X</button>
                    </div>
                </div>
                </li>`;
    });
    taskItem.innerHTML = li;
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild.querySelector("p");
    if (selectedTask.checked) {
        taskName.classList.add("checked");
    } else {
        taskName.classList.remove("checked");
    }
}

function deleteTask(id) {
    todos.splice(id, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}
addTaskButton.addEventListener("click", () => {
    let userTask = taskInput.value.trim();
    if (userTask) {
        let taskInfo = { name: userTask  };
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
        taskInput.value = ""; // Efface le champ d'entrée après l'ajout de la tâche
        showPopup("Votre tache a été ajouté avec succès", "", "", "encours");
               
    }
});

function showPopup(message, priority, date, status) {
    const modalContainer = document.querySelector('.modal-container');
    const modalTitle = document.getElementById('modalTitle');
    const priorityInput = document.querySelector('.box-input[name="priorite"]');
    const dateInput = document.querySelector('.box-input[name="date"]');
    const statusInput = document.querySelector('.box-input[name="status"]');
    
    modalTitle.textContent = message;
    priorityInput.value = priority;
    dateInput.value = date;
    statusInput.value = status;

    modalContainer.classList.add('active');
}

// Afficher les tâches au chargement de la page
showTodo();




// const taskInput = document.querySelector(".AjouTask input");
// taskItem = document.querySelector(".taskItem")

// //local storage
// let todos = JSON.parse(localStorage.getItem("todo-list"));

// function showTodo() {
//     let li = "";
//     if(todos){
//         todos.forEach((todo, id) => {
//             li += `<li class="task">
//                         <label for="${id}">
//                             <input onclick="updateSatuts(this)" type="checkbox" id="${id}">
//                             <div class="infoTask">
//                             <p>${todo.name}</p>
//                             </div>
//                             <h2></h2>
//                         </label>
//                         <div class="settings">
//                             <button>Supprimer</button>
//                             <img src="" alt="">
//                         </div>
//                     </li>`;
//         });
//     }
//     taskItem.innerHTML = li;
// }
// showTodo();
// function updateSatuts(selectedTask) {
//     let taskName = selectedTask.parentElement.lastChildElement;
//     if(selectedTask.checked) {
//         taskName.classList.add("checked")
//     }else {
//         taskName.classList.remove("checked");
//     }
// }
// taskInput.addEventListener("keyup", e => {
//     let userTask = taskInput.value.trim();
//     if(e.key == "Enter" && userTask){
        
//         if(!todos){ //if todo isn't exist, pass an empty array to todos
//             todos = [];
//         }
//         taskInput.value = "";
//         let taskInfo = {name: userTask, status:"encours"};
//         todos.push(taskInfo); // ajouter un nouveau tache
//         localStorage.setItem("todo-list", JSON.stringify(todos));
//         showTodo();
//     }
// });