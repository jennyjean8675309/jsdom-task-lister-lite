document.addEventListener("DOMContentLoaded", () => {
   getForm().addEventListener('submit', getUserInput)
});

// functions to grab DOM elements
function getForm() {
  return document.getElementById('create-task-form')
}

function getTaskList() {
  return document.getElementById('tasks')
}

function getDescriptionInput() {
  return document.getElementById('new-task-description')
}

function getPriorityInput() {
  return document.getElementById('priority-level')
}

function getDateInput() {
  return document.getElementById('date-due')
}

function getSubmitButton() {
  return document.getElementById('submit')
}

// other functions
function getUserInput(event) {
  event.preventDefault()

  let descriptionInput = getDescriptionInput().value
  let priorityInput = getPriorityInput().value
  let dateInput = getDateInput().value

  let taskItem;

  if (getSubmitButton().value === 'Edit Task') {
    taskItem = itemToEdit
  } else {
    taskItem = document.createElement('li')
  }

  event.target.reset()

  taskItem.className = priorityInput
  taskItem.innerText = `${descriptionInput}; ${dateInput}; `

  deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete Task'
  deleteButton.addEventListener('click', deleteItem)

  editButton = document.createElement("button")
  editButton.innerText = 'Edit Task'
  editButton.addEventListener("click", editTask)

  taskItem.append(deleteButton, editButton)
  getTaskList().appendChild(taskItem)

  // this is a function that will automatically sort the tasks for me
  prioritySort()

  // or, I can use insertBefore() to insert the new tasks as they're made
  // if (priorityInput === "red") {
  //   let mediumLi = document.querySelector(".yellow")
  //   getTaskList().insertBefore(taskItem, mediumLi)
  // } else if (priorityInput === "yellow") {
  //   let lowLi = document.querySelector(".green") 
  //   getTaskList().insertBefore(taskItem, lowLi)
  // } else {
  //   getTaskList().appendChild(taskItem)
  // }
}

let itemToEdit = null

function editTask(e) {
  let editItem = e.target.parentElement
  
  let editDescription = editItem.innerText.split('; ')[0]
  let editPriority = editItem.classList[0]
  let editDate = editItem.innerText.split('; ')[1]

  getDescriptionInput().value = editDescription
  getPriorityInput().value = editPriority
  getDateInput().value = editDate

  getSubmitButton().value = 'Edit Task'
  itemToEdit = editItem
}

function deleteItem(event) {
  let listItem = event.target.parentElement
  getTaskList().removeChild(listItem)
}

function prioritySort() {
  let tasks = document.getElementsByTagName('li')
  
  let highPriority = []

  let mediumPriority = []

  let lowPriority = []
    
  for(i = 0; i < tasks.length; i++) {
    if (tasks[i].className.includes("red")) {
      highPriority.push(tasks[i])
    } else if (tasks[i].className.includes("yellow")) {
      mediumPriority.push(tasks[i])
    } else {
      lowPriority.push(tasks[i])
    }
  }

  highPriority.forEach(task => getTaskList().appendChild(task))
  mediumPriority.forEach(task => getTaskList().appendChild(task))
  lowPriority.forEach(task => getTaskList().appendChild(task))
}
