// Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();


// load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// get tasks from local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // create li element 
        const li = document.createElement('li');
        // add class 
        li.className = 'collection-item';
        // create text node and apend to li
        li.appendChild(document.createTextNode(task));
        // create new line elment
        const link = document.createElement('a')
        // add class 
        link.className = "delete-item secondary-content"
        // add icon html
        link.innerHTML = '<i class= "fa fa-remove"></i>';
        // append the link to li
        li.appendChild(link);
        // append link to ul
        taskList.appendChild(li);
    });
}

// add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

// create li element 
    const li = document.createElement('li');
    // add class 
    li.className = 'collection-item';
    // create text node and apend to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new line elment
    const link = document.createElement('a')
    // add class 
    link.className = "delete-item secondary-content"
    // add icon html
    link.innerHTML = '<i class= "fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);
    // append link to ul
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    console.log(li);

    e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(tasks);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) { 
        if (confirm('Are you Sure?')) {
            e.target.parentElement.parentElement.remove();
            console.log(e.target);

        // remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
   } 
}
// remove  from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if (taskItem.textConstent === task) {
            tasks.spice(index, 1);
     }   
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// clear task 
function clearTasks() {
  //  taskList.innerHTML = '';
    
    // faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    
    // https://jsperf.com/innerhtml-vs-removechild

    // clear from ls
    clearTasksFromLocalStorage();
}

// clear tasks from ls
function clearTasksFromLocalStorage(); {
    localStorage.clear();
}

// filter tasks

function filterTasks(e) {
    const text = e.target.value.toLower();

    console.log(text);

    document.querySelectorAll('.collection-item').forEach();
    (function (tasks) {
        const item = task.firstChild.textConstent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';

        } else {
            task.style.display = 'none';

        }
    });
}