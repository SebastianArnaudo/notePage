/* MODALS */

const cards = document.getElementById("cardTable");

cards.addEventListener("click",(e)=>{
    if(e.target.matches(".delete")){
        e.stopPropagation()
        cardDelete(e)
    } else if(e.target.matches(".info")){
        e.stopPropagation()
        
        const typeCard = e.target.parentElement.parentElement.className;

        if(typeCard=="event card"){
            const title= e.target.parentElement.parentElement.children[0].children[0].textContent;
            const desc= e.target.parentElement.parentElement.children[0].children[1].textContent;
            const date= e.target.parentElement.parentElement.children[1].children[0].textContent;

            vewCard(title,desc,date)
        } else if(typeCard == "task card"){
            const title= e.target.parentElement.parentElement.children[0].children[0].textContent;
            const desc= e.target.parentElement.parentElement.children[0].children[1].textContent;

            vewTask(title,desc)
        } else if (typeCard == "list card"){
            const title= e.target.parentElement.parentElement.children[0].children[0].textContent;
            const list= e.target.parentElement.parentElement.children[1].children;

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
    const dateModal = document.getElementById("dateModal");

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

    const cardsElement = document.querySelectorAll(".card");


    for (let event = 0; event < events.length; event++) {
        events[event].classList.remove("cardHidden")
    }

    for (let list = 0; list < lists.length; list++) {
        lists[list].classList.remove("cardHidden")
    }

    for (let task = 0; task < tasks.length; task++) {
        tasks[task].classList.remove("cardHidden")
    }

    cardWatcher(cardsElement)
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

const taskContent = document.getElementById("containerTask");

const eventDesc = document.getElementById("eventDescription");
const eventDate = document.getElementById("dateEvent");

const eventConten = document.getElementById("containerEvent");
const listItems = document.getElementById("containerList");

formEvent.addEventListener("click",()=> changeToEvent());
formList.addEventListener("click",()=> changeToList());
formTask.addEventListener("click",()=> changeToTask());

function changeToEvent(){
    eventConten.style.display="block";
    taskContent.style.display="none";
    listItems.style.display="none";
}

function changeToTask(){
    eventConten.style.display="none";
    taskContent.style.display="block";
    listItems.style.display="none";
}

function changeToList(){
    eventConten.style.display="none";
    taskContent.style.display="none";
    listItems.style.display="block";
}

// VALIDAR FORMULAIO

const formCard = document.getElementById("formCard");

const titleCard = document.getElementById("cardTitle");

const taskInfo = document.getElementById("cardDescription");

const eventI = document.getElementById("eventDescription");
const eventD = document.getElementById("dateEvent");

const itemL = document.querySelectorAll(".itemList").textContent;

const saveButton = document.getElementById("saveCard");

saveButton.addEventListener("click",(e)=>{

    e.preventDefault();

    const checkTask = formTask.checked;
    const checkEvent = formEvent.checked;

    let title = titleCard.value;
    
    let tInfo = taskInfo.value;

    let eInfo = eventI.value;
    let eDate = eventD.value;

    const listItems= document.querySelectorAll(".itemList");

    
    if(checkTask){
        if(title == "" || tInfo == ""){
            alert("No se permiten campos vacios")
            
        } else{
            createTask(title,tInfo)
        }
    } 
    else if(checkEvent){
        if(title == "" || eInfo == "" || eDate == ""){
            alert("No se permiten campos vacios")
            
        } else{
            createEvent(title,eInfo,eDate)
        }
    } 
    else{
        let items = [];
        let count = 0;

        for(let itemL = 0; itemL < listItems.length; itemL++){
            let i=listItems[count].value;
            if(i != ""){
                items.push(i);
            }
            count ++
        }

        if(title == ""){
            alert("Ingrese un titulo")
        } else if(items== "")[
            alert("De haber por lo menos un item en la lista")
        ]
        else{
            createList(title,items)
        }
    }    
});

/* CREAR TARJETAS */

function createTask(title,desc){

    const t = title
    const d = desc

    const bit= "Ver"
    const bdt= "X"

    const card = document.createElement("div");
    const cardD = document.createElement("section");
    const cardO = document.createElement("section");

    const btnI = document.createElement("button")
    const btnD = document.createElement("button")

    const h1 = document.createElement("h1");
    const p = document.createElement("p")

    h1.textContent=t;
    p.textContent=d;

    btnI.textContent=bit;
    btnD.textContent=bdt;

    card.setAttribute("class","task");
    card.classList.add("card");
    cardD.setAttribute("class","cardData");
    cardO.setAttribute("class","cardOption");

    btnI.setAttribute("class","info");
    btnD.setAttribute("class","delete");

    btnI.setAttribute("id", "info");
    btnD.setAttribute("id", "delete");

    cardD.appendChild(h1);
    cardD.appendChild(p);

    cardO.appendChild(btnI);
    cardO.appendChild(btnD);

    card.appendChild(cardD);
    card.appendChild(cardO);

    cards.appendChild(card);

    titleCard.value = "";
    taskInfo.value = "";
}

function createEvent(title,desc,date){

    const t = title
    const de = desc
    const da = date

    let dateValid = da.split("");
    let d = Number(dateValid[8] + dateValid[9])
    let m = Number(dateValid[5] + dateValid[6])

    dateValid= [d +"/"+ m]

    const bit= "Ver"
    const bdt= "X"

    const card = document.createElement("div");
    const cardD = document.createElement("section");
    const cardO = document.createElement("section");
    const cardDate = document.createElement("section")

    const btnI = document.createElement("button")
    const btnD = document.createElement("button")

    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    const dat = document.createElement("h1");

    h1.textContent=t;
    p.textContent=de;
    dat.textContent=dateValid;

    btnI.textContent=bit;
    btnD.textContent=bdt;

    card.setAttribute("class","event");
    card.classList.add("card");
    cardD.setAttribute("class","cardData");
    cardO.setAttribute("class","cardOption");

    btnI.setAttribute("class","info");
    btnD.setAttribute("class","delete");

    btnI.setAttribute("id", "info");
    btnD.setAttribute("id", "delete");

    cardD.appendChild(h1);
    cardD.appendChild(p);

    cardDate.appendChild(dat);

    cardO.appendChild(btnI);
    cardO.appendChild(btnD);

    card.appendChild(cardD);
    card.appendChild(cardDate);
    card.appendChild(cardO);
    
    cards.appendChild(card);

    titleCard.value = "";
    eventI.value = "";
    eventD.value = "";
}

function createList(title,itemS){
    const t = title
    const i = itemS

    const bit= "Ver"
    const bdt= "X"

    const card = document.createElement("div");
    const cardD = document.createElement("section");
    const cardI = document.createElement("section");
    const cardO = document.createElement("section");

    const btnI = document.createElement("button")
    const btnD = document.createElement("button")

    const h1 = document.createElement("h1");

    
    h1.textContent=t;


    btnI.textContent=bit;
    btnD.textContent=bdt;



    card.setAttribute("class","list");
    card.classList.add("card");
    cardD.setAttribute("class","cardData");
    cardI.setAttribute("clas","cardItems")
    cardO.setAttribute("class","cardOption");

    btnI.setAttribute("class","info");
    btnD.setAttribute("class","delete");

    btnI.setAttribute("id","info");
    btnD.setAttribute("id","delete");
    
    for(let itemL = 0; itemL < i.length; itemL++){

        let item;
        item = document.createElement("li");
        cardI.appendChild(item)
        item.innerHTML += i[itemL];
    }
    
    cardD.appendChild(h1);
    

    cardO.appendChild(btnI);
    cardO.appendChild(btnD);

    card.appendChild(cardD);
    card.appendChild(cardI);
    card.appendChild(cardO);

    cards.appendChild(card);

    titleCard.value = "";
}

/* BORRAR TARJETAS */

function cardDelete(e){
    const item = e.target.parentElement.parentElement;
    cards.removeChild(item);
}
