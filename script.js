let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="delete" onclick="toggleDone(${index})">✓</button>
        <button class="delete" onclick="deleteTask(${index})">✕</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();

  if (!text) return;

  tasks.push({ text, done: false });
  input.value = '';
  saveTasks();
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  render();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addBtn').addEventListener('click', addTask);
  document.getElementById('taskInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });
});

render();