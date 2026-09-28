const check = document.querySelector(".check")
const input = document.querySelector(".input")
const contain = document.querySelector(".todo")
let count = 0
const items = document.querySelector(".items")
let total = 0
items.textContent = `${total} items left`

const all = document.getElementById("all")
const active = document.getElementById("active")
const erase = document.getElementById("erase")
const completed = document.getElementById("completed")

const lightheme = document.querySelector(".lighth")
let isClicked = false


lightheme.addEventListener('click', () => {
    if (isClicked === false) {
        document.body.classList.add("light")
        isClicked = true
        lightheme.src = "icon-moon.svg"
        const checkedOrNot1 = document.querySelectorAll(".todo input")
        const checkedOrNot2 = document.querySelectorAll(".todo div")
        const checkedOrNot3 = document.querySelectorAll(".todo label")
    
        checkedOrNot1.forEach(input => {
            if (isClicked === true) {
                input.style.border = "1px solid hsl(235, 24%, 19%)"
            }
        })
    
        checkedOrNot2.forEach(div => {
            if (isClicked === true) {
                div.style.background = "white"
            }
        })
    
        checkedOrNot3.forEach(label => {
            if (isClicked === true) {
                label.style.color = "hsl(235, 24%, 19%)"
            }
        })
    } else {
        document.body.classList.remove("light")
        isClicked = false
        lightheme.src = "icon-sun.svg"
        const checkedOrNot1 = document.querySelectorAll(".todo input")
        const checkedOrNot2 = document.querySelectorAll(".todo div")
        const checkedOrNot3 = document.querySelectorAll(".todo label")

        checkedOrNot1.forEach(input => {
            if (isClicked === false) {
                input.style.border = "1px solid hsl(234, 39%, 85%)"
            }
        })

        checkedOrNot2.forEach(div => {
            if (isClicked === false) {
                div.style.background = "hsl(235, 24%, 19%)"
            }
        })

        checkedOrNot3.forEach(label => {
            if (isClicked === false) {
                label.style.color = "hsl(234, 39%, 85%)"
            }
        })
    }
})

function createToDo() {
    const checkBox = document.createElement("input")
    checkBox.type = 'checkbox'
    const label = document.createElement("label")
    const div = document.createElement("div")
    const clear = document.createElement("img")
    
    
    clear.src = "icon-cross.svg"
    clear.style.marginLeft = "auto"
    clear.style.marginRight = "10px"
    clear.style.cursor = "pointer"
    
    label.textContent = input.value
    label.style.color = "hsl(234, 39%, 85%)"
    label.style.marginLeft = "10px"
    
    div.appendChild(checkBox)
    div.appendChild(label)
    div.appendChild(clear)
    
    div.style.display = "flex"
    div.style.width = "100%"
    div.style.background = "hsl(235, 24%, 19%)"
    div.style.height = "50px"
    div.style.alignItems = "center"
    div.style.borderBottom = "1px solid lightgray"
    div.draggable = true
    
    checkBox.style.appearance = "none"
    checkBox.style.marginLeft = "10px"
    checkBox.style.border = "1px solid hsl(234, 39%, 85%)"
    checkBox.style.width = "15px"
    checkBox.style.height = "15px"
    checkBox.style.borderRadius = "50%"
    checkBox.style.cursor = "pointer"
    
    if (isClicked === true) {
        checkBox.style.border = "1px solid hsl(235, 24%, 19%)"
        div.style.background = "white"
        label.style.color = "hsl(235, 24%, 19%)"
    }

    contain.appendChild(div)

    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            checkBox.style.background = `${"url('icon-check.svg')"}, ${"linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))"}`
            checkBox.style.backgroundPosition = "center"
            checkBox.style.backgroundRepeat = "no-repeat"
            checkBox.style.backgroundSize = "100%"
            label.style.textDecoration = "line-through"
            label.style.color = "gray"
        } else {
            checkBox.style.background = ""
            label.style.textDecoration = ""
            label.style.color = "hsl(234, 39%, 85%)"
        }
    })

    all.addEventListener('click', () => {
        if (checkBox.checked || !checkBox.checked) {
            div.style.display = "flex"
        }
    })

    active.addEventListener('click', () => {
        if (checkBox.checked) {
            div.style.display = "none"
        } else {
            div.style.display = "flex"
        }
    })

    total = contain.children.length
    
    completed.addEventListener('click', () => {
        if (!checkBox.checked) {
            div.style.display = "none"
        } else {
            div.style.display = "flex"
        }
    })


    clear.addEventListener('click', () => {
        div.remove()
        total--
        if (total === 1) {
            items.textContent = `${total} item left`
        } else {
            items.textContent = `${total} items left`
        }
    })

    if (total === 1) {
        items.textContent = `${total} item left`
    } else {
        items.textContent = `${total} items left`
    }

    input.value = ""
}

function clearCompleted() {
    const allCheckedTasks = contain.querySelectorAll("div")

    allCheckedTasks.forEach(item => {
        const checkedItem = item.querySelector("input")
        if (checkedItem.checked) {
            item.remove()
        }
    })

    total = contain.children.length

    if (total === 1) {
        items.textContent = `${total} item left`
    } else {
        items.textContent = `${total} items left`
    }
}

check.addEventListener('click', () => {
    createToDo()
})

erase.addEventListener('click', () => {
    clearCompleted()
})

let draggedItem = null
contain.addEventListener('dragstart', (event) => {
    draggedItem = event.target
})

contain.addEventListener('dragover', (event) => {
    const currentItem = event.target
    if (currentItem !== draggedItem) {
        const rect = currentItem.getBoundingClientRect()
        const middle = rect.top + rect.height / 2

        if (event.clientY < middle) {
            contain.insertBefore(draggedItem, currentItem)
        } else {
            contain.insertBefore(draggedItem, currentItem.nextSibling)
        }
    }
})

contain.addEventListener('dragend', () => {
    draggedItem = null
})

document.addEventListener('keydown', (event) => {
    const key = event.key
    if (key === 'Enter') {
        createToDo()
        return
    }

    if (key === 'Delete') {
        clearCompleted()
        return                              
    }
})