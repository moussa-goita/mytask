// Sélection des éléments HTML nécessaires
const taskInput = document.querySelector(".AjouTask input"); // Champ de saisie de la tâche
const addTaskButton = document.getElementById("addTaskButton"); // Bouton pour ajouter une tâche
 const taskItem = document.querySelector(".taskItem"); // Conteneur des éléments de tâche

// Gestion de la fenêtre modale
const modalContainer = document.querySelector(".modal-container"); // Conteneur de la fenêtre modale
const modalTriggers = document.querySelectorAll(".modal-trigger"); // Déclencheurs de la fenêtre modale

// Ajout d'écouteurs d'événements pour chaque déclencheur de la fenêtre modale
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

// Fonction pour basculer l'état de la fenêtre modale entre actif et inactif
function toggleModal(){
  modalContainer.classList.toggle("active")
}

// Données stockées localement
let todos = JSON.parse(localStorage.getItem("todo-list")) || []; // Récupération des tâches depuis le stockage local, initialisation à un tableau vide s'il n'y a pas de données

// Ajout d'un écouteur d'événements pour ajouter une nouvelle tâche
addTaskButton.addEventListener("click", () => {
    let userTask = taskInput.value.trim();
    if (userTask) {
        // Récupérer le nom de la tâche depuis le champ de saisie
        let taskInfo = {
            name: userTask,
            date: "", // Initialiser la date à vide
            priority: "", // Initialiser la priorité à vide
            status: "" // Initialiser le statut à vide
        };
        // Afficher le formulaire modal
        toggleModal();
        // Stocker temporairement les détails de la tâche dans le sessionStorage
        sessionStorage.setItem("tempTaskInfo", JSON.stringify(taskInfo));
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
});

const modalForm = document.querySelector('.modal form');
// Ajoutez un gestionnaire d'événements pour le formulaire de la fenêtre modale
modalForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêchez le formulaire de se soumettre normalement

    // Récupérez les valeurs des champs de saisie du formulaire
    let priorityValue = document.querySelector('.box-input[name="priorite"]').value;
    let dateValue = document.querySelector('.box-input[name="date"]').value;
    let statusValue = document.querySelector('.box-input[name="status"]').value;

    // Récupérez les détails de la tâche initiale depuis le sessionStorage
    let tempTaskInfo = JSON.parse(sessionStorage.getItem("tempTaskInfo"));

    // Mettez à jour les détails de la tâche initiale avec les valeurs récupérées
    tempTaskInfo.date = dateValue;
    tempTaskInfo.priority = priorityValue;
    tempTaskInfo.status = statusValue;

    // Ajoutez la tâche mise à jour à votre liste de tâches
    todos.push(tempTaskInfo);

    // Mettez à jour le localStorage avec le nouveau tableau 'todos'
    localStorage.setItem("todo-list", JSON.stringify(todos));

    // Actualisez l'affichage des tâches dans votre interface utilisateur
    showTodo();

    // Réinitialisez les champs de saisie du formulaire modal
    modalForm.reset();

    // Fermez la fenêtre modale
    toggleModal();

    // Réinitialisez le champ de saisie de la tâche principale
    taskInput.value = "";
});

// Fonction pour afficher les tâches dans l'interface utilisateur
function showTodo() {
    let li = ""; // Variable pour stocker le contenu HTML des éléments de tâche
    todos.forEach((todo, id) => {
        // Construction de chaque élément de tâche avec les informations stockées localement
        li += `<li class="task">
                <div class="task-content">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}">
                        <div class="infoTask">
                            <p>${todo.name}</p>
                            <p class="date">${todo.date}</p>
                        </div>
                    </label>
                    <div class="settings">
                        <p class="priority">${todo.priority}</p> <!-- Affichage de la priorité de la tâche -->
                        <img onclick= src="/images/delete.png" alt="">
                        <button onclick="deleteTask(${id})">X</button> <!-- Bouton pour supprimer la tâche -->
                    </div>
                </div>
                </li>`;
    });
    taskItem.innerHTML = li; // Injection du contenu HTML dans le conteneur des éléments de tâche
}
// $(document).ready(function () {
//     $(btnAdd).click(function(){
//         $(li).fadeIn();
//     })
// });
// Fonction pour mettre à jour le statut de la tâche (en cours/terminée) lorsqu'on coche/décoche la case à cocher
function updateStatus(selectedTask) {
    let taskId = parseInt(selectedTask.id); // Récupération de l'ID de la tâche
    let taskName = selectedTask.parentElement.lastElementChild.querySelector("p"); // Sélection du nom de la tâche
    if (selectedTask.checked) {
        taskName.classList.add("checked"); // Ajout du style de tâche terminée (barrée)
        // Mise à jour du statut de la tâche à "terminée" dans le tableau des tâches
        todos[taskId].status = "terminée";
    } else {
        taskName.classList.remove("checked"); // Retrait du style de tâche terminée (barrée)
        // Mise à jour du statut de la tâche à "en cours" dans le tableau des tâches
        todos[taskId].status = "en cours";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos)); // Mise à jour des données dans le stockage local
}

// Fonction pour supprimer une tâche
function deleteTask(id) {
    todos.splice(id); // Suppression de la tâche du tableau des tâches
    localStorage.setItem("todo-list", JSON.stringify(todos)); // Mise à jour des données dans le stockage local
    showTodo(); // Actualisation de l'affichage des tâches
}

// Ajoutez un écouteur d'événements pour l'élément "Tout"
document.getElementById("allTasks").addEventListener("click", function() {
    showTodo(); // Afficher toutes les tâches
});

// Ajoutez un écouteur d'événements pour l'élément "A faire"
document.getElementById("todoTasks").addEventListener("click", function() {
    let todoTasks = todos.filter(todo => todo.status === "en attente");
    displayFilteredTasks(todoTasks); // Afficher les tâches en attente
});

// Ajoutez un écouteur d'événements pour l'élément "En cours"
document.getElementById("inProgressTasks").addEventListener("click", function() {
    let inProgressTasks = todos.filter(todo => todo.status === "encours");
    displayFilteredTasks(inProgressTasks); // Afficher les tâches en cours
});

// Ajoutez un écouteur d'événements pour l'élément "Terminé"
document.getElementById("completedTasks").addEventListener("click", function() {
    let completedTasks = todos.filter(todo => todo.status === "terminé");
    displayFilteredTasks(completedTasks); // Afficher les tâches terminées
});

// Fonction pour afficher les tâches filtrées
function displayFilteredTasks(filteredTasks) {
    let li = ""; // Variable pour stocker le contenu HTML des éléments de tâche filtrés
    filteredTasks.forEach((todo, id) => {
        // Vérifie si la tâche est terminée
        let taskClass = todo.status === "terminé" ? "task completed" : "task";

        li += `<li class="${taskClass}">
            <div class="task-content">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${todo.status === "terminé" ? "checked" : ""}>
                    <div class="infoTask">
                        <p>${todo.name}</p>
                        <p class="date">${todo.date}</p>
                    </div>
                    <h2></h2>
                </label>
                <div class="settings">
                    <p class="priority">${todo.priority}</p> <!-- Affichage de la priorité de la tâche -->
                    <img src="" alt="">
                    <button onclick="deleteTask(${id})">X</button> <!-- Bouton pour supprimer la tâche -->
                </div>
            </div>
        </li>`;
    });
    taskItem.innerHTML = li; // Injection du contenu HTML dans le conteneur des éléments de tâche
}

// Sélectionnez tous les éléments span dans la catégorie des filtres
const filterSpans = document.querySelectorAll('.filtrages span');

// Ajoutez un écouteur d'événements à chaque élément span
filterSpans.forEach(span => {
    span.addEventListener('click', () => {
        // Supprimez la classe "active" de tous les éléments span
        filterSpans.forEach(s => s.classList.remove('active'));
        // Ajoutez la classe "active" à l'élément span actuellement cliqué
        span.classList.add('active');
    });
});

// Affichage des tâches au chargement de la page
showTodo();


