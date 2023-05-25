const input = document.getElementById('input');
const todoList = document.querySelector('.todo__list');
const form = document.querySelector('form');

function getTodos() {
    return JSON.parse(localStorage.getItem('todoList')) ?? [];
}

function setTodos() {
    localStorage.setItem('todoList', JSON.stringify(todos));
}

let todos = getTodos();

function onChange(e, id) {

    console.log(e.value)
    todos.forEach(todo => {
        if (todo.id == id) {
            todo.isCompleted = !todo.isCompleted;
        }
    });

    todoList.innerHTML = '';
    todos.forEach(addTodo);
    setTodos();
}

if (todos.length > 0) {
    todos.forEach(addTodo);
}

function addTodo(todo) {
    todoList.innerHTML += `
        <li class="list__item">
            <div class="checkbox">
                <input type="checkbox" ${todo.isCompleted ? "checked" : ""} onchange="onChange(event, '${todo.id}')">
            </div>
                <p style="text-decoration: ${todo.isCompleted ? "line-through" : "none"}">${todo.text}</p>
                <span class="delete__icon" onclick="onDelete('${todo.id}')"><i class="fa-regular fa-trash-can"></i></span>
            </li>`;
}

function generateRandomId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

form.addEventListener('submit', (e) => {

    e.preventDefault();

    if (input.value.length <= 0) {
        return;
    }
    let todo = {
        id: generateRandomId(6),
        text: input.value,
        isCompleted: false,
    };

    addTodo(todo);
    todos.push(todo);
    input.value = '';

    setTodos();
});


function onDelete(id) {
    let index = todos.findIndex((todo) => todo.id == id);
    console.log(todos, index);
    if (index > -1) {
        todos = [...todos.slice(0, index), ...todos.slice(index + 1)];
        todoList.innerHTML = '';
        todos.forEach(addTodo);
        setTodos();
    }
    console.log(todos);
}