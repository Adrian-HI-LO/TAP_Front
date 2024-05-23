const taskForm = document.getElementById('taskForm')
const taskInput = document.getElementById('taskInput')
const taskList = document.getElementById('taskList')

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = taskInput.value;
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    })
    .then(() => {
        taskInput.value = ''
        getTasks()
    })
    .catch(err => console.error(err))
})

function getTasks() {
    fetch('http://localhost:3000/tasks')
    .then(res => res.json())
    .then(data => {
        taskList.innerHTML = ''
        data.forEach(task => {
            const li = document.createElement('li')
            li.textContent = task
            taskList.appendChild(li)
        });
    })
    .catch(err => console.error(err));
}

const deleteAllTasks = () => {
     fetch('http://localhost:3000/tasks', {
          method: 'DELETE'
     })
     .then(() => {
          getTasks()
     })
     .catch(err => console.error(err))
}
document.addEventListener('DOMContentLoaded', () => {
    getTasks()
})
