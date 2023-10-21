/* MODALS */
const cards = document.getElementById("cardTable");
const cardSection = document.getElementById("cardSection");

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
const taskFilter = document.getElementById("tasks");
const eventFilter = document.getElementById("events");
const listFilter = document.getElementById("lists");

allFilter.addEventListener("click",()=> filterAll());
taskFilter.addEventListener("click",()=> filterTask());
eventFilter.addEventListener("click",()=> filterEvent());
listFilter.addEventListener("click",()=> filterList());

function filterAll(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    let cardsElement = document.querySelectorAll(".card");
    allFilter.classList.add("active");
    taskFilter.classList.remove("active");
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
    let ce = cardsElement.length

    cardWatcher(ce)
}

function filterTask(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");


    allFilter.classList.remove("active");
    taskFilter.classList.add("active");
    eventFilter.classList.remove("active");
    listFilter.classList.remove("active");

    let ce = tasks.length

    for (let event = 0; event < events.length; event++) {
        events[event].classList.add("cardHidden")
    }

    for (let list = 0; list < lists.length; list++) {
        lists[list].classList.add("cardHidden")
    }

    for (let task = 0; task < tasks.length; task++) {
        tasks[task].classList.remove("cardHidden")
    }

    cardWatcher(ce)
}

function filterEvent(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    let ce = events.length

    allFilter.classList.remove("active");
    taskFilter.classList.remove("active");
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

    cardWatcher(ce)
}

function filterList(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    let ce = lists.length

    allFilter.classList.remove("active");
    taskFilter.classList.remove("active");
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

    cardWatcher(ce)
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
            alert("No se permiten campos vacios");
            
        } else{
            let date = "";
            createCard(title,tInfo,date);
        }
    } 
    else if(checkEvent){
        if(title == "" || eInfo == "" || eDate == ""){
            alert("No se permiten campos vacios");
            
        } else{
            createEvent(title,eInfo,eDate);
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
            count ++;
        }

        if(title == ""){
            alert("Ingrese un titulo");
        } else if(items== ""){
            alert("De haber por lo menos un item en la lista");
        }else{
            createList(title,items);
        }
    }
    message.style.display="none";
});

/* CREAR TARJETAS */

function createCard(title,desc,date){
    const t = title;
    const d = desc;

    const bit= "Ver";
    const bdt= "X";

    const card = document.createElement("div");
    const cardD = document.createElement("section");
    const cardO = document.createElement("section");
    const cardDel = document.createElement("section");

    const btnI = document.createElement("button");
    const btnD = document.createElement("button");

    const h1 = document.createElement("h1");
    h1.textContent=t;

    btnI.textContent=bit;
    btnD.textContent=bdt;

    card.setAttribute("class","task");
    card.classList.add("card");
    cardD.setAttribute("class","cardData");
    cardO.setAttribute("class","cardVew");
    cardDel.setAttribute("class","deleterCard");

    btnI.setAttribute("class","info");
    btnD.setAttribute("class","delete");

    btnI.setAttribute("id", "info");
    btnD.setAttribute("id", "delete");

    cardD.appendChild(h1);

    cardO.appendChild(btnI);
    cardDel.appendChild(btnD);

    card.appendChild(cardD)
    
    if(date == "list"){
        const cardI = document.createElement("section");
        cardI.setAttribute("class","cardItems");

        for(let itemL = 0; itemL < desc.length; itemL++){
            let item;
            item = document.createElement("li");
            cardI.appendChild(item)
            item.innerHTML += desc[itemL];
        }
        card.appendChild(cardI)
        card.setAttribute("class","list");
        card.classList.add("card");
    }
    else if (date == ""){
        const p = document.createElement("p");
        p.textContent=d;
        cardD.appendChild(p);
        card.appendChild(cardD);
    }
    else if (date != "list"){
        const p = document.createElement("p");
        p.textContent=d;
        cardD.appendChild(p);
        card.appendChild(cardD);

        card.appendChild(date);
        card.setAttribute("class","event");
        card.classList.add("card");
    }
    
    
    card.appendChild(cardO);
    card.appendChild(cardDel);

    cardSection.appendChild(card);
    
    let tF = taskFilter.classList[1];
    let eF = eventFilter.classList[1];
    let lF = listFilter.classList[1];

    if(tF == "active" && card.classList[0] != "task"){
        filterTask();
    } else if (eF == "active" && card.classList[0] != "event"){
        filterEvent();
    } else if (lF == "active" && card.classList[0] != "list"){
        filterList();
    }

    titleCard.value = "";
    taskInfo.value = "";
}

function createEvent(title,desc,date){
    
    const da = date;

    let dateValid = da.split("");
    let d = Number(dateValid[8] + dateValid[9]);
    let m = Number(dateValid[5] + dateValid[6]);

    dateValid= [d +"/"+ m];

    const cardDate = document.createElement("section");
    const dat = document.createElement("h1");

    dat.textContent=dateValid;
    cardDate.appendChild(dat);

    createCard(title,desc,cardDate);

    titleCard.value = "";
    eventI.value = "";
    eventD.value = "";
}

function createList(title,itemS){
    const i = itemS;
    const cardI = document.createElement("section");
    cardI.setAttribute("class","cardItems");

    for(let itemL = 0; itemL < i.length; itemL++){
        let item;
        item = document.createElement("li");
        cardI.appendChild(item)
        item.innerHTML += i[itemL];
    }

    let items = cardI.innerText
    let date = "list";
    createCard(title, items, date);
}

/* BORRAR TARJETAS */

function cardDelete(e){
    let cardsElement = document.querySelectorAll(".card");
    let ce;

    const item = e.target.parentElement.parentElement;

    ce = item.classList[0];

    cardSection.removeChild(item);
    cardWatcherDeleter(ce,cardsElement);
}

/* CONTADOR DE TARJETAS */ 

const message = document.getElementById("message")

function cardWatcher(i){
    if(i == 0){
        message.style.display="block";
    } else{
        message.style.display="none";
    }

    console.log(i)
}

function cardWatcherDeleter(ce,cardsElement){
    let t = ce;
    let c = cardsElement;
    c = c.length;

    c -= 1

    let cardsTask = document.querySelectorAll(".task");
    let cardsEvent = document.querySelectorAll(".event");
    let cardsList = document.querySelectorAll(".list");

    let tF = taskFilter.classList[1];
    let eF = eventFilter.classList[1];
    let lF = listFilter.classList[1];

    if (c == 0){
        message.style.display = "block";
    } else if (t == "task" && tF == "active"){

        if (cardsTask.length == 0)
        message.style.display = "block";
    } else if (t == "event" && eF == "active"){

        if (cardsEvent.length == 0){
            message.style.display = "block";
        }
    } else if (t == "list" && lF == "active"){

        if (cardsList.length == 0){
            message.style.display = "block";
        }
    }
}