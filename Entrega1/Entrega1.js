// Variables simples
let todos = [];
let id = 1;

// Agregar tarea
function addTask() {
    let input = document.getElementById('InputTexto');
    let text = input.value;
    if (text === '') return;
    todos.push({ id: id, title: text, completed: false });
    id++;
    input.value = '';
    showTodos();
}

function toggleTask(taskId) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === taskId) {
            todos[i].completed = !todos[i].completed;
            break;
        }
    }
    showTodos();
}

function deleteTask(taskId) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === taskId) {
            todos.splice(i, 1);
            break;
        }
    }
    showTodos();
}

function downloadTasks() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(function(response) { return response.json(); })
        .then(function(data) {
            for (let i = 0; i < 10 && i < data.length; i++) {
                todos.push({ id: id, title: data[i].title, completed: data[i].completed });
                id++;
            }
            showTodos();
        })
        .catch(function() {
            alert('Error al descargar');
        });
}


function showTodos() {
    let list = document.getElementById('todoList');
    list.innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        let li = document.createElement('li');
        li.className = todo.completed ? 'todo-item completed' : 'todo-item';
        let checkbox = todo.completed ? 'checked' : '';
        li.innerHTML = `
            <input type="checkbox" ${checkbox} onchange="toggleTask(${todo.id})">
            <span class="task-text">${todo.title}</span>
            <button class="delete-btn" onclick="deleteTask(${todo.id})">X</button>
        `;
        list.appendChild(li);
    }
}

document.getElementById('add_btn').onclick = addTask;
document.getElementById('InputTexto').onkeypress = function(e) {
    if (e.key === 'Enter') addTask();
};
var btnDescarga = document.getElementById('btn_descarga');
if (btnDescarga) btnDescarga.onclick = downloadTasks;

showTodos();
