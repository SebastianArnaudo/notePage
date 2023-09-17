/* MODALS */

const cards = document.getElementById("cardTable");

cards.addEventListener("click",(e)=>{

    if(e.target.matches(".delete")){
        const title=e.target.parentElement.parentElement.children[0].children[0].innerHTML;
        e.stopPropagation()
        deleteModal(title)
    } else if(e.target.matches(".info")){
        e.stopPropagation()
        
        const typeCard = e.target.parentElement.parentElement.className

        if(typeCard=="event"){
            const title=e.target.parentElement.parentElement.children[0].children[0].textContent;
            const desc=e.target.parentElement.parentElement.children[0].children[1].textContent;
            const date=e.target.parentElement.parentElement.children[1].children[0].textContent;

            vewCard(title,desc,date)

        } else if (typeCard=="task"){
            const title=e.target.parentElement.parentElement.children[0].children[0].textContent;
            const desc=e.target.parentElement.parentElement.children[0].children[1].textContent;
            

            vewTask(title,desc)

        } else{
            const title=e.target.parentElement.parentElement.children[0].children[0].textContent;
            const list=e.target.parentElement.parentElement.children[1].children;
            vewList(title,list)
        }
    }
})

// Ver tarea
const modalVew = document.getElementById("modalCardContainer");

const close = document.getElementById("closeButton");

close.addEventListener("click",()=> closeCard());


function vewCard(title,desc,date){

    const titleCModal = document.getElementById("titelCardModal");
    const descModal = document.getElementById("descripcionModal");
    const dateModal = document.getElementById("dateModal");

    const descContainer = document.getElementById("descrip");
    const listModal = document.getElementById("descripList");

    modalVew.style.display="flex";
    descContainer.style.display="block";
    listModal.style.display="none";
    dateModal.style.display = "block";

    titleCModal.innerHTML = title;
    descModal.innerHTML = desc;
    dateModal.innerHTML = date;
}

function vewTask(title,desc){

    const titleCModal = document.getElementById("titelCardModal");
    const descModal = document.getElementById("descripcionModal");
    const dateModal = document.getElementById("dateModal");

    const descContainer = document.getElementById("descrip");
    const listModal = document.getElementById("descripList");

    modalVew.style.display="flex";
    descContainer.style.display="block";
    listModal.style.display="none";
    dateModal.style.display = "none";

    titleCModal.innerHTML = title;
    descModal.innerHTML = desc;
}

function vewList(title,list){

    const titleCModal = document.getElementById("titelCardModal");
    const descContainer = document.getElementById("descrip");
    const listModal = document.getElementById("descripList");

    let count = 0;

    const listItems= document.querySelectorAll("#listItem");
    
    
    modalVew.style.display="flex";
    descContainer.style.display="none";
    listModal.style.display="block";
    dateModal.style.display = "none";


    titleCModal.innerHTML = title;

    for(let index of listItems){
        index.innerHTML = list[count].innerHTML;
        count += 1;
    }
}

function closeCard(){
    modalVew.style.display="none";
}

// Eliminar tarea
const modalDelete = document.getElementById("modalContainer");

const cancelButton = document.getElementById("cancelDelete");
const confirButton = document.getElementById("confirmDelete");


cancelButton.addEventListener("click",()=> cancelDelete());
confirButton.addEventListener("click",()=> deleteCard());


function deleteModal(title){

    const titleDModal = document.getElementById("titleDeleteM");
    modalDelete.style.display="flex";

    const aviso = "¿Seguro que quiere borrar ''" + title +"''?"

    titleDModal.innerHTML = aviso;
}

function deleteCard(){
    modalDelete.style.display="none";
    alert("Se borro la tarjeta")
}

function cancelDelete(){
    modalDelete.style.display="none";
}

/* FILTRAR TARJETA */

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

    allFilter.classList.add("active");
    tastkFilter.classList.remove("active");
    eventFilter.classList.remove("active");
    listFilter.classList.remove("active");

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


    allFilter.classList.remove("active");
    tastkFilter.classList.add("active");
    eventFilter.classList.remove("active");
    listFilter.classList.remove("active");

    for (let event = 0; event < events.length; event++) {
        events[event].classList.add("cardHidden")
    }

    for (let list = 0; list < lists.length; list++) {
        lists[list].classList.add("cardHidden")
    }

    for (let task = 0; task < tasks.length; task++) {
        tasks[task].classList.remove("cardHidden")
    }
}

function filterEvent(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    allFilter.classList.remove("active");
    tastkFilter.classList.remove("active");
    eventFilter.classList.add("active");
    listFilter.classList.remove("active");

    for (let event = 0; event < events.length; event++) {
        events[event].classList.remove("cardHidden")
    }

    for (let list = 0; list < lists.length; list++) {
        lists[list].classList.add("cardHidden")
    }

    for (let task = 0; task < tasks.length; task++) {
        tasks[task].classList.add("cardHidden")
    }
}

function filterList(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    allFilter.classList.remove("active");
    tastkFilter.classList.remove("active");
    eventFilter.classList.remove("active");
    listFilter.classList.add("active");

    for (let event = 0; event < events.length; event++) {
        events[event].classList.add("cardHidden")
    }

    for (let list = 0; list < lists.length; list++) {
        lists[list].classList.remove("cardHidden")
    }

    for (let task = 0; task < tasks.length; task++) {
        tasks[task].classList.add("cardHidden")
    }
}

/* FORMULARIO */

// CAMBIAR DE FORMULARIO

//Checkbox

const formTask = document.getElementById("task");
const formEvent = document.getElementById("event");
const formList = document.getElementById("list");

//Formularios

const taskDesc = document.getElementById("containerTask");

const eventDesc = document.getElementById("eventDescription");
const eventDate = document.getElementById("dateEvent");

const eventConten = document.getElementById("containerEvent");
const listItems = document.getElementById("containerList");

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

// VALIDAR FORMULARIO