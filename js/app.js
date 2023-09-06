/* MODALS */

const modalDelete = document.getElementById("modalDelete");
const modalVew = document.getElementById("modalCard");

const close = document.getElementById("closeButton");
const cancelButton = document.getElementById("cancelDelete");
const confirButton = document.getElementById("confirmDelete");

// Ver tarea

close.addEventListener("click",()=> closeCard());

function vewCard(){
    modalVew.style.display="flex";
}

function closeCard(){
    modalVew.style.display="none";
}

// Eliminar tarea

cancelButton.addEventListener("click",()=> cancelDelete());
confirButton.addEventListener("click",()=> deleteCard())

function deleteModal(){
    modalDelete.style.display="flex";
}

function deleteCard(){
    modalDelete.style.display="none";
    alert("Se borro la tarjeta")
}

function cancelDelete(){
    modalDelete.style.display="none";
}

/* FORMULARIO */

// CAMBIAR FORMULARIO

//Checkbox

const formTask = document.getElementById("task");
const formEvent = document.getElementById("event");
const formList = document.getElementById("list");

//Formularios

const taskDesc = document.getElementById("conteinerTask");

const eventDesc = document.getElementById("eventDescription");
const eventDate = document.getElementById("dateEvent");

const eventConten = document.getElementById("conteinerEvent");
const listItems = document.getElementById("conteinerList");

formEvent.addEventListener("click",()=> changeToEvent());
formList.addEventListener("click",()=> changeToList());
formTask.addEventListener("click",()=> changeToTask());

function changeToEvent(){
    eventConten.style.display="block";
    taskDesc.style.display="none";
    listItems.style.display="none";
}

function changeToTask(){
    eventConten.style.display="none";
    taskDesc.style.display="block";
    listItems.style.display="none";    
}

function changeToList(){
    eventConten.style.display="none";
    taskDesc.style.display="none";
    listItems.style.display="block";
}

/* FILTRAR TARJETA */

//Filtros
const allFilter = document.getElementById("all");
const tastkFilter = document.getElementById("tasks");
const eventFilter = document.getElementById("events");
const listFilter = document.getElementById("lists");

allFilter.addEventListener("click",()=> filterAll());
tastkFilter.addEventListener("click",()=> filterTask());
eventFilter.addEventListener("click",()=> filterEvent());
listFilter.addEventListener("click",()=> filterList());

function filterAll(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    
    for (let event = 0; event < events.length; event++) {
        events[event].classList.remove("cardHidden")
    }

    for (let list = 0; list < lists.length; list++) {
        lists[list].classList.remove("cardHidden")
    }

    for (let task = 0; task < tasks.length; task++) {
        tasks[task].classList.remove("cardHidden")
    }
}

function filterTask(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    for (let event = 0; event < events.length; event++) {
        events[event].classList.add("cardHidden")
    }

    for (let list = 0; list < lists.length; list++) {
        lists[list].classList.add("cardHidden")
        console.log(lists)
    }

    for (let task = 0; task < tasks.length; task++) {
        tasks[task].classList.remove("cardHidden")
        console.log(tasks)
    }
}

function filterEvent(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    for (let event = 0; event < events.length; event++) {
        events[event].classList.remove("cardHidden")
    }

    for (let list = 0; list < lists.length; list++) {
        lists[list].classList.add("cardHidden")
        console.log(lists)
    }

    for (let task = 0; task < tasks.length; task++) {
        tasks[task].classList.add("cardHidden")
        console.log(tasks)
    }
}

function filterList(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    for (let event = 0; event < events.length; event++) {
        events[event].classList.add("cardHidden")
    }

    for (let list = 0; list < lists.length; list++) {
        lists[list].classList.remove("cardHidden")
        console.log(lists)
    }

    for (let task = 0; task < tasks.length; task++) {
        tasks[task].classList.add("cardHidden")
        console.log(tasks)
    }
}