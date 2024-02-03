class ToDo {
    constructor(title, status = false){
        this.title = title
        this.status = status
        this.id = new Date().valueOf()
    }
}

let todos = []

const form = document.querySelector("form")
const titleInput = document.querySelector('#todoInput')
const todoList = document.querySelector('#todoList')

function renderItem(item) {
    const {title, status, id} = item

    const li = document.createElement('li')
    const checkbox = document.createElement ('input')

    checkbox.type = 'checkbox'
    checkbox.setAttribute('hidden', true)
    checkbox.id = id

    const label = document.createElement('label')
    label.textContent = title
    label.htmlFor = id
    label.title = "Click on me if you have completed your task";
    

    checkbox.addEventListener('change', function(){
        label.classList.toggle('done')
        item.status= !item.status

        console.log(todos)

    })

    

    const buttonsContainer = document.createElement ('div')

    const editButton = document.createElement('button')
    editButton.textContent = 'Edit'
    editButton.classList.add ('button', 'edit-button')

    let isEditingMode = false
    const editingInput = document.createElement('input')


    editButton.addEventListener('click', function(){

        if(isEditingMode){

             // update ui 
             
             label.style.display = 'block'
             label.textContent = editingInput.value
             editButton.textContent = 'Edit'
            
             // update data
             item.title = editingInput.value
             editingInput.remove()
            isEditingMode = false

        }else {
            editButton.textContent = 'Update'
            label.style.display = 'none'

            
            editingInput.classList.add('edit-input')
            editingInput.value = item.title

            li.prepend(editingInput)

            isEditingMode = true
        }

        console.log(editingInput);


    })

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.classList.add ('button', 'delete-button')

    deleteButton.addEventListener('click', function(){
       const isConfirmed = confirm(`Are you sure you want to delete ${title}?`)

       if(!isConfirmed){
        return;
       }

       li.remove()

       todos= todos.filter(i => i.id !== id)
       console.log(todos)
    })

    buttonsContainer.append(editButton, deleteButton)
    li.append(checkbox, label, buttonsContainer)

    todoList.appendChild(li)
}

function handleSubmit(event) {
    event.preventDefault()


    const title = titleInput.value
    const newTodo = new ToDo(title,false)

    todos.push(newTodo)
    console.log(todos)

    renderItem(newTodo)
    form.reset()
}

form.addEventListener('submit', handleSubmit)

