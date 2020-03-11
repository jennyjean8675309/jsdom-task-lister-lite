document.addEventListener("DOMContentLoaded", () => {
  // your code here
});
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded...")
  // add an event listener that 'listens' for form submission
  let form = document.getElementById('create-task-form')
  form.addEventListener("submit", submitForm)
})

// functions that return DOM nodes

function getTaskList() {
  return document.getElementById('tasks')
}

function submitForm(event) {
  // all event callbacks have access to event
  event.preventDefault()
  
  let descInput = document.querySelector("#new-task-description").value
  let priorityInput = document.querySelector("#priority-level").value

  let taskItem = document.createElement('li')
  taskItem.className = priorityInput
  taskItem.innerText = descInput
  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = "Delete"
  deleteBtn.addEventListener("click", deleteItem)

  // let insertedNode = parentNode.insertBefore(newNode, referenceNode)
  // getTaskList().insertBefore

  if (priorityInput === "high") {
    let mediumPriority = document.querySelector('.medium')
    getTaskList().insertBefore(taskItem, mediumPriority)
  } else if (priorityInput === "medium") {
    let lowPriority = document.querySelector('.low')
    getTaskList().insertBefore(taskItem, lowPriority)
  } else {
    getTaskList().appendChild(taskItem)
  }

  taskItem.appendChild(deleteBtn)

  event.target.reset()
}

function deleteItem(event) {
  let deleteTask = event.target.parentElement
  deleteTask.remove()
}