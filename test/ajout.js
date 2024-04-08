// Fonction à tester : addTask
function addTask(taskName) {
    // Vérifier si le nom de la tâche est vide
    if (taskName.trim() === '') {
        throw new Error('Le nom de la tâche ne peut pas être vide.');
    }

    // Récupérer les tâches existantes depuis le localStorage
    let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

    // Ajouter la nouvelle tâche à la liste des tâches
    todos.push({ name: taskName, status: 'en attente' });

    // Mettre à jour le localStorage avec la nouvelle liste de tâches
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

// Tests unitaires
function testAddTask() {
    // Cas de test : Ajout d'une tâche valide
    let initialTasksCount = JSON.parse(localStorage.getItem('todo-list') || '[]').length;
    addTask('Test Task');
    let updatedTasksCount = JSON.parse(localStorage.getItem('todo-list')).length;
    console.assert(updatedTasksCount === initialTasksCount + 1, 'Test d\'ajout de tâche valide a échoué.');

    // Cas de test : Ajout d'une tâche vide
    let tasksCount = JSON.parse(localStorage.getItem('todo-list') || '[]').length;
    try {
        addTask('');
    } catch (error) {
        console.assert(error.message === 'Le nom de la tâche ne peut pas être vide.', 'Test d\'ajout de tâche vide a échoué.');
    }
    let newTasksCount = JSON.parse(localStorage.getItem('todo-list')).length;
    console.assert(tasksCount === newTasksCount, 'La tâche vide a été ajoutée alors qu\'elle ne devrait pas l\'être.');
}

// Exécution des tests
testAddTask();
