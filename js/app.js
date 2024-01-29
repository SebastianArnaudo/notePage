//* MODALS *//
const cards = document.getElementById("cardTable");
const cardSection = document.getElementById("cardSection");

let unfoldedCard = "";

cards.addEventListener("click",(e)=>{

    if(e.target.matches(".delete")){
        e.stopPropagation()
        cardDelete(e);
        
    } else if(e.target.matches(".info")){
        e.stopPropagation()
        
        const typeCard = e.target.parentElement.parentElement.className;
        unfoldedCard = e.target.parentElement.parentElement;

        if(typeCard=="event card"){
            const title= e.target.parentElement.parentElement.children[0].children[0].textContent;
            const desc= e.target.parentElement.parentElement.children[0].children[1].textContent;
            const date= e.target.parentElement.parentElement.children[1].children[0].textContent;

            vewCard(title,desc,date)

        } else if(typeCard == "task card"){
            const title= e.target.parentElement.parentElement.children[0].children[0].textContent;
            const desc= e.target.parentElement.parentElement.children[0].children[1].textContent;
            const date = false;

            vewCard(title,desc,date)

        } else if (typeCard == "list card"){
            const title= e.target.parentElement.parentElement.children[0].children[0].textContent;
            const desc= e.target.parentElement.parentElement.children[1].children[0];
            const date = "list";

            vewCard(title,desc,date)
        }
    }
})

// *Ver tarea

const modalVew = document.getElementById("modalCard");

const close = document.getElementById("closeButton");

close.addEventListener("click",()=> closeCard());

function showModal(){
    modalVew.classList.replace("modalH","showModal");
}
function hiddenModal(){
    modalVew.classList.add("hiddenModal");
}

function vewCard(title,desc,date){
    showModal();

    clearDescModal();
    const titleCModal = document.getElementById("titelCardModal");
    const descModal = document.getElementById("descrip");
    const dateModal = document.getElementById("dateModal");

    // modalVew.style.display="block";
    titleCModal.innerHTML = title;

    if (date == "list"){
        const ul = document.createElement("ul");

        descModal.appendChild(ul);

        const listElements = desc.children;
        let count = 0;
        let liModal= []

        for(i of listElements){
            liModal.push(desc.children[count].innerHTML)
            count +=1
        }

        for(let index = 0; index < liModal.length; index++){
            let li;
            li = document.createElement("li");
            
            ul.appendChild(li);
            li.innerHTML += liModal[index];
        }

    } else if (date != false){
        const p = document.createElement("p");
        descModal.appendChild(p);

        p.innerHTML = desc;
        dateModal.innerHTML = date;

    } else{
        const p = document.createElement("p");
        descModal.appendChild(p);

        p.innerHTML = desc;
    }
    setTimeout(()=>{
        modalVew.classList.remove("showModal");
    },1000)
    
}

function clearDescModal() {
    let dateModal = document.getElementById("dateModal");
    const descModal = document.getElementById("descrip");

    dateModal.innerHTML = ""

    while (descModal.firstChild) {
        descModal.removeChild(descModal.firstChild);
    }
}

function closeCard(){
    hiddenModal()
    unfoldedCard = "";
    setTimeout(()=>{
        modalVew.classList.remove("hiddenModal");
        modalVew.classList.add("modalH");
    },900)
}

//* FILTRAR TARJETA 

const allFilter = document.getElementById("all");
const taskFilter = document.getElementById("tasks");
const eventFilter = document.getElementById("events");
const listFilter = document.getElementById("lists");

allFilter.addEventListener("click",()=> filterAll());
taskFilter.addEventListener("click",()=> filterTask());
eventFilter.addEventListener("click",()=> filterEvent());
listFilter.addEventListener("click",()=> filterList());

function depureShow(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    for (let event = 0; event < events.length; event++) {
        events[event].classList.remove("cardShow");
    }

    for (let list = 0; list < lists.length; list++) {
        lists[list].classList.remove("cardShow");
    }
        
    for (let task = 0; task < tasks.length; task++) {
        tasks[task].classList.remove("cardShow");
    }
}

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
        if(events[event].classList.contains("cardFilted")){
            setTimeout(() =>{
                events[event].classList.replace("cardFilted","cardShow");
            },900)
        }
    }

    for (let list = 0; list < lists.length; list++) {
        if(lists[list].classList.contains("cardFilted")){
            setTimeout(() =>{
                lists[list].classList.replace("cardFilted","cardShow");
            },900)
        }
    }
        
    for (let task = 0; task < tasks.length; task++) {
        if(tasks[task].classList.contains("cardFilted")){
            setTimeout(() =>{
                tasks[task].classList.replace("cardFilted","cardShow");
            },900)
        }
    }

    setTimeout(depureShow,1500)
    let ce = cardsElement.length;
    let css = "all"

    cardWatcher(ce,css);
}

function filterTask(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    allFilter.classList.remove("active");
    taskFilter.classList.add("active");
    eventFilter.classList.remove("active");
    listFilter.classList.remove("active");

    let ce = tasks.length;
    let css = "task"

    for (let event = 0; event < events.length; event++) {
        if(!events[event].classList.contains("cardFilted")){
            events[event].classList.add("cardHidden");
            setTimeout(()=>{
                events[event].classList.replace("cardHidden","cardFilted");
            },900)
        }
    }

    for (let list = 0; list < lists.length; list++) {
        if(!lists[list].classList.contains("cardFilted")){
            lists[list].classList.add("cardHidden");
            setTimeout(()=>{
                lists[list].classList.replace("cardHidden","cardFilted");
            },900)
        }
    }

    for (let task = 0; task < tasks.length; task++) {
        if(tasks[task].classList.contains("cardFilted")){
            setTimeout(()=>{
                tasks[task].classList.replace("cardFilted","cardShow");
            },900)
            tasks[task].classList.remove("cardHidden");
        }
    }

    setTimeout(depureShow,1500);
    cardWatcher(ce,css)
}

function filterEvent(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    let ce = events.length;
    let css = "event";


    allFilter.classList.remove("active");
    taskFilter.classList.remove("active");
    eventFilter.classList.add("active");
    listFilter.classList.remove("active");

    for (let event = 0; event < events.length; event++) {
        if(events[event].classList.contains("cardFilted")){

            setTimeout(() =>{
                events[event].classList.replace("cardFilted","cardShow");
            },900)
            events[event].classList.remove("cardHidden");
        }
    }

    for (let list = 0; list < lists.length; list++) {
        if(!lists[list].classList.contains("cardFilted")){
            lists[list].classList.add("cardHidden");

            setTimeout(()=>{
                lists[list].classList.replace("cardHidden","cardFilted");
            },900)
        }
    }

    for (let task = 0; task < tasks.length; task++) {
        if(!tasks[task].classList.contains("cardFilted")){          
            tasks[task].classList.add("cardHidden");

            setTimeout(()=>{
                tasks[task].classList.replace("cardHidden","cardFilted");
            },900)
        }
    }

    setTimeout(depureShow,1500);
    cardWatcher(ce,css)
}

function filterList(){
    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    let ce = lists.length
    let css = "list";

    allFilter.classList.remove("active");
    taskFilter.classList.remove("active");
    eventFilter.classList.remove("active");
    listFilter.classList.add("active");

    for (let event = 0; event < events.length; event++) {
        if(!events[event].classList.contains("cardFilted")){
            events[event].classList.add("cardHidden");

            setTimeout(()=>{
                events[event].classList.replace("cardHidden","cardFilted");
            },900)
        }
    }

    for (let list = 0; list < lists.length; list++) {
        if(lists[list].classList.contains("cardFilted")){

            setTimeout(()=>{
                lists[list].classList.replace("cardFilted","cardShow");
            },900)
            lists[list].classList.remove("cardHidden");
        }
    }

    for (let task = 0; task < tasks.length; task++) {
        if(!tasks[task].classList.contains("cardFilted")){          
            tasks[task].classList.add("cardHidden");

            setTimeout(()=>{
                tasks[task].classList.replace("cardHidden","cardFilted");
            },900)
        }
    }

    setTimeout(depureShow,1500);
    cardWatcher(ce,css);
}

//* FORMULARIO 

//* CAMBIAR DE FORMULARIO

//Checkbox

const formTask = document.getElementById("task");
const formEvent = document.getElementById("event");
const formList = document.getElementById("list");

//Formularios

const cardInfoContent = document.getElementById("containerTask");

const eventD = document.getElementById("dateEvent");
const eventConten = document.getElementById("containerEvent");

const listItems = document.getElementById("containerList");
const lIF = document.querySelectorAll("#item");

const cardInfo = document.getElementById("cardDescription");

const itemImput = document.querySelectorAll(".itemList");


formEvent.addEventListener("click",()=> changeToEvent());
formList.addEventListener("click",()=> changeToList());
formTask.addEventListener("click",()=> changeToTask());


function changeToEvent(){
    if(!listItems.classList.contains("hidden")){
        for (let i = 0; i < itemImput.length; i++) {
            itemImput[i].classList.add("hiddenInputsList");
        }
        setTimeout(()=>{
            for (let i = 0; i < itemImput.length; i++) {
                itemImput[i].classList.replace("hiddenInputsList","liHidden");
                listItems.classList.add("hidden");
            }
        },900)
    }
    
    if(cardInfoContent.classList.contains("hidden")){
        setTimeout(()=>{
            cardInfoContent.classList.remove("hidden");
            cardInfo.classList.replace("hidden","showInput");
        },600)
        setTimeout(()=>{
            eventConten.classList.remove("hidden");
            eventD.classList.replace("edHidden","showDate");
        },900)
    } else{
        eventConten.classList.remove("hidden");
        eventD.classList.replace("edHidden","showDate");
    }
    
    setTimeout(()=>{
        eventD.classList.remove("showDate");
        cardInfo.classList.remove("showInput");
    },1500)
}

function changeToTask(){
    if(!listItems.classList.contains("hidden")){
        for (let i = 0; i < itemImput.length; i++) {
            itemImput[i].classList.add("hiddenInputsList");
        }
        setTimeout(()=>{
            for (let i = 0; i < itemImput.length; i++) {
                itemImput[i].classList.replace("hiddenInputsList","liHidden");
                listItems.classList.add("hidden");
            }
        },954)
    }

    if(!eventConten.classList.contains("hidden")){
        eventD.classList.add("hiddenDate");
        setTimeout(()=>{
            eventD.classList.replace("hiddenDate","edHidden");
            eventConten.classList.add("hiddenDate");
            eventConten.classList.replace("hiddenDate","hidden");
        },954)
    }   

    
    setTimeout(()=>{
        if(cardInfoContent.classList.contains("hidden")){
            cardInfoContent.classList.remove("hidden");
            cardInfo.classList.replace("hidden","showInput");            
        }
    },955)

    setTimeout(() => {
        cardInfo.classList.remove("showInput");
    }, 1500);

}

function changeToList(){

    if(!eventConten.classList.contains("hidden")){
        eventD.classList.add("hiddenDate");
        setTimeout(()=>{
            eventD.classList.replace("hiddenDate","edHidden");
            eventConten.classList.add("hidden");
        },949)
    }   

    cardInfo.classList.add("hiddenInput");
    setTimeout(()=>{
        cardInfoContent.classList.add("hidden");
        cardInfo.classList.replace("hiddenInput","hidden");
    },949)

    setTimeout(()=>{
        listItems.classList.remove("hidden");
        for (let i = 0; i < itemImput.length; i++) {
            itemImput[i].classList.replace("liHidden","showInputsList");
        }
        setTimeout(() => {
            for (let i = 0; i < itemImput.length; i++) {
                itemImput[i].classList.remove("showInputsList");
            }
        }, 950);
    },955)

}

//* VALIDAR FORMULAIO

const formCard = document.getElementById("formCard");

const titleCard = document.getElementById("cardTitle");

const itemL = document.querySelectorAll(".itemList").textContent;

const saveButton = document.getElementById("saveCard");

const alert = document.getElementById("alertConteiner");
const closeAlertButton = document.getElementById("closeAlert");

function showAlert(t){
    const alertP = document.getElementById("alertError");
    alert.style.display="flex";
    alertP.innerHTML = t;
}

closeAlertButton.addEventListener("click",()=>{
    alert.style.display="none";
})

saveButton.addEventListener("click",(e)=>{

    e.preventDefault();

    const checkTask = formTask.checked;
    const checkEvent = formEvent.checked;

    let title = titleCard.value;
    
    let tInfo = cardInfo.value;

    let eDate = eventD.value;

    const listItems= document.querySelectorAll(".itemList");

    let errorType;

    switch (true) {
        case checkTask:
            if (title == "" || tInfo == "") {
                errorType="No se permiten campos vacios";
                showAlert(errorType);
            } else {
                let date = "";
                createCard(title, tInfo, date);
            }
            break;
        case checkEvent:
            if (title == "" || tInfo == "" || eDate == "") {
                errorType="No se permiten campos vacios";
                showAlert(errorType);
            } else {
                createCard(title, tInfo, eDate);
                titleCard.value = "";
                eventD.value = "";
            }
            break;
        default:
            let items = [];
            let count = 0;
            let date = "list"
        
            for (let itemL = 0; itemL < listItems.length; itemL++) {
                let i = listItems[count].value;
                if (i != "") {
                items.push(i);
                }
                count++;
            }
        
            if (title == "") {
                errorType="Ingrese un titulo";
                showAlert(errorType);
            } else if (items == "") {
                errorType="De haber por lo menos un item en la lista";
                showAlert(errorType);
            } else {
                createCard(title,items,date);
            }
        
            for (var i = 0; i < listItems.length; i++) {
                listItems[i].value = "";
            }
    }
});



//*CREAR TARJETAS 

function createCard(title,desc,date){
    const t = title;
    const d = desc;

    const bit= "Ver";
    const bdt= "delete";
    
    const btnSpan = document.createElement("span");
    btnSpan.setAttribute("class","material-symbols-outlined");
    btnSpan.textContent=bdt;

    const card = document.createElement("div");
    const cardD = document.createElement("section");
    const cardO = document.createElement("section");
    const cardDel = document.createElement("section");

    const btnI = document.createElement("button");
    const btnD = document.createElement("button");

    const h1 = document.createElement("h1");
    h1.textContent=t;

    btnI.textContent=bit;
    btnD.textContent="X";

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

    card.appendChild(cardD);

    
    if(date == "list"){
        const cardI = document.createElement("section");
        const cardL = document.createElement("ul");
        cardI.setAttribute("class","cardItems");
        cardL. setAttribute("class", "cardList");

        for(let itemL = 0; itemL < desc.length; itemL++){
            let item;
            item = document.createElement("li");
            cardI.appendChild(cardL);

            cardL.appendChild(item);
            item.innerHTML += desc[itemL];
        }
        cardI.appendChild(cardL);
        card.appendChild(cardI);
        card.setAttribute("class","list");
        card.classList.add("card");
        card.classList.add("card","cardShow");
    }
    else if (date == ""){
        const p = document.createElement("p");
        p.textContent=d;
        cardD.appendChild(p);
        card.appendChild(cardD);
    }
    else if (date != "list"){

        let dateValid = date.split("");
        let day = dateValid[8] + dateValid[9];
        let month = dateValid[5] + dateValid[6];

        dateValid= [day +"/"+ month];

        const cardDate = document.createElement("section");
        const dat = document.createElement("h1");

        dat.textContent=dateValid;
        cardDate.appendChild(dat);

        const p = document.createElement("p");
        p.textContent=d;
        cardD.appendChild(p);
        card.appendChild(cardD);

        card.appendChild(cardDate);
        card.setAttribute("class","event");
        card.classList.add("card","cardShow");
        
    }
    
    card.appendChild(cardO);
    card.appendChild(cardDel);

    setTimeout(()=>{
        cardSection.appendChild(card)
        
        const firstElement = cardSection.children[0];
        cardSection.insertBefore(card, firstElement);
            
        let tF = taskFilter.classList[1];
        let eF = eventFilter.classList[1];
        let lF = listFilter.classList[1];

        const cardClass = card.classList[0];

        switch(true) {
            case ( tF === "active"):
                var activeFilter = "task";

                newCardWatcher(activeFilter,cardClass,card);
                break;
            case ( eF === "active"):
                var activeFilter = "event";

                newCardWatcher(activeFilter,cardClass,card);                  
                break;
            case ( lF === "active" && card.classList[0] !== "list"):
                var activeFilter = "list";

                newCardWatcher(activeFilter,cardClass,card);
                break;
            default:
                hiddenMessage();
                depureMessage();
                card.classList.add("cardShow");
        }

    },1000)
    
    titleCard.value = "";
    cardInfo.value = "";
    
    setInterval(depureShow, 1500);
}

//* BORRAR TARJETAS 

function cardDelete(e){

    const item = e.target.parentElement.parentElement;
    let cardsElement = document.querySelectorAll(".card");
    let ce;

    if(item == unfoldedCard){
        closeCard()
    }

    ce = item.classList[0];

    let cont = e.target.parentElement;
    cont.classList.add("deleted")

    let bConteiner = e.target.parentElement;
    let button = e.target;
    let card = e.target.parentElement.parentElement;

    bConteiner.classList.add("deleted");
    button.classList.add("deleted");
    card.classList.add("deleted");

    function del(){
        cardSection.removeChild(item);  
        cardWatcherDeleter(ce,cardsElement);
    }

    setTimeout(del,2000);
}

//* CONTADORES DE TARJETAS 

const message = document.getElementById("message");

function showMessage(){
    message.classList.add("showMessage");
    setTimeout(()=>{
        message.classList.replace("hiddenMessage","message");
    },900)
}

function hiddenMessage(){
        message.classList.add("messageHidden");
        setTimeout(()=>{
            message.classList.replace("message","hiddenMessage");
        },900)  
}

function depureMessage(){
    if(message.classList.contains("showMessage")){
        message.classList.remove("showMessage");
    } else if(message.classList.contains("messageHidden")){
        message.classList.remove("messageHidden");
    }
}

function cardWatcher(i,c){
    switch(c){
        case "task":
            if(i==0 && message.classList=="hiddenMessage"){
                showMessage();
                depureMessage();
            } else if (i!=0 && message.classList == "message"){
                hiddenMessage();
                depureMessage();
            }
            break;
        case "event":
            if(i==0 && message.classList=="hiddenMessage"){
                showMessage();
                depureMessage();
            } else if (i!=0 && message.classList == "message"){
                hiddenMessage();
                depureMessage();
            }
            break;
        case "list":
            if(i==0 && message.classList=="hiddenMessage"){
                showMessage();
                depureMessage();
            } else if (i!=0 && message.classList == "message"){
                hiddenMessage();
                depureMessage();
            }
            break;
        default:
            if(i==0 && message.classList=="hiddenMessage"){
                showMessage();
                depureMessage();
            } else if (i!=0 && message.classList == "message"){
                hiddenMessage();
                depureMessage();
            }
            break;
    }
}

function newCardWatcher(f,c,cl){
    if(f == c && message.classList=="message"){
        hiddenMessage();
        depureMessage();
        
        cl.classList.add("cardShow");
    } else{
        cl.classList.add("cardFilted");
    }
}

function cardWatcherDeleter(ce,cardsElement){
    let t = ce;
    let c = cardsElement;
    c = c.length;

    c -= 1;

    let cardsTask = document.querySelectorAll(".task").length;
    let cardsEvent = document.querySelectorAll(".event").length;
    let cardsList = document.querySelectorAll(".list").length;

    let tF = taskFilter.classList[1];
    let eF = eventFilter.classList[1];
    let lF = listFilter.classList[1];
    let aF = allFilter.classList[1];

    if(aF== "active"){
        if(c==0){
            showMessage();
            depureMessage();
        }
    }
    else{
        switch (t) {
            case "task":
                if(tF == "active" && cardsTask == 0){
                    showMessage();
                    depureMessage();
                }
                break;
            case "event":
                if(eF=="active" && cardsEvent == 0){
                    showMessage();
                    depureMessage();
                }
                break;
            case "list":
                if(lF == "active" && cardsList == 0){
                    showMessage();
                    depureMessage();
                }
                break;
        }
    }
}