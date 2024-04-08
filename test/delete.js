// Fonction à tester : deleteTask
function deleteTask(taskIndex) {
    // Récupérer les tâches depuis le localStorage
    let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

    // Vérifier si l'index de la tâche à supprimer est valide
    if (taskIndex < 0 || taskIndex >= todos.length) {
        throw new Error('L\'index de la tâche à supprimer est invalide.');
    }

    // Supprimer la tâche correspondant à l'index spécifié
    todos.splice(taskIndex, 1);

    // Mettre à jour le localStorage avec la nouvelle liste de tâches
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

// Tests unitaires
function testDeleteTask() {
    // Ajout de tâches pour les besoins des tests
    localStorage.setItem("todo-list", JSON.stringify([{ name: 'Task 1', status: 'en attente' }, { name: 'Task 2', status: 'en attente' }, { name: 'Task 3', status: 'en attente' }]));

    // Cas de test : Suppression d'une tâche existante
    let initialTasksCount = JSON.parse(localStorage.getItem('todo-list')).length;
    deleteTask(1);
    let updatedTasksCount = JSON.parse(localStorage.getItem('todo-list')).length;
    console.assert(updatedTasksCount === initialTasksCount - 1, 'Test de suppression de tâche existante a échoué.');

    // Cas de test : Suppression d'une tâche avec un index invalide
    try {
        deleteTask(5); // Index invalide car la liste ne contient que 2 éléments après la première suppression
    } catch (error) {
        console.assert(error.message === 'L\'index de la tâche à supprimer est invalide.', 'Test de suppression de tâche avec un index invalide a échoué.');
    }
}

// Exécution des tests
testDeleteTask();
