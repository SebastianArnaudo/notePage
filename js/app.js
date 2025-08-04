//* MODALS *//
const cards = document.getElementById("cardTable");
const cardSection = document.getElementById("cardSection");

let unfoldedCard = ""; //Variable en la que se guarda la tarjeta desplegada para posterior comparación.

cards.addEventListener("click",(e)=>{

    //La variable "e" corresponde al elemento al que se clica dentro de la sección "cards".

    if(e.target.matches(".delete")){ //Si la clase del elemento es "delete" (osea se el boton de "borrar")
        //Se detienen todos los procesos automaticos y se llama a la funcion "cardDelete" pasandole como valor el elemento seleccionado.
        e.stopPropagation()
        cardDelete(e);
        
    } else if(e.target.matches(".info")){ //Si por el contrario la clase del elementro es "info" (osea se, el botón de "ver")
        //Se detienen todos los procesos automaticos.
        e.stopPropagation()
        
        unfoldedCard = e.target.parentElement.parentElement; 
        //Se guarda en la variable "unfoldedCard" el elemento padre del contenedor del botón (La tarjeta a la que pertenece) 

        const typeCard = e.target.parentElement.parentElement.className; 
        //Y se almacena en una constante la clase de dicha tarjeta.

        //Segun sea dicha clase...
        if(typeCard=="event card"){

            //Se almacena en difeerentes constantes los contenidos de la tarjeta.

            const title= e.target.parentElement.parentElement.children[0].children[0].textContent; //Contenido de la seccion titulo de la tarjeta
            const desc= e.target.parentElement.parentElement.children[0].children[1].textContent; //Contenido de la seccion descripcion de la tarjeta
            const date= e.target.parentElement.parentElement.children[1].children[0].textContent; //Contenido de la seccion fecha de la tarjeta

            vewCard(title,desc,date) //Y se ejecuta la funcionque que despliega la tarjeta con los contenidos de la misma. 

        } else if(typeCard == "task card"){
            const title= e.target.parentElement.parentElement.children[0].children[0].textContent;
            const desc= e.target.parentElement.parentElement.children[0].children[1].textContent;
            const date = "task"; //En este caso no existe una "fecha" en las tarjetas de clase "task", por lo que el valor de la constante es "task".

            vewCard(title,desc,date)

        } else if (typeCard == "list card"){
            const title= e.target.parentElement.parentElement.children[0].children[0].textContent;
            const desc= e.target.parentElement.parentElement.children[1].children[0];
            const date = "list"; //En este caso no existe una "fecha" en las tarjetas de clase "list", por lo que el valor de la constante es "list".

            vewCard(title,desc,date)
        }
    }
})

//* Ver tarea

const modalVew = document.getElementById("modalCard");

const close = document.getElementById("closeButton");

close.addEventListener("click",()=> closeCard());

function showModal(){
    //Se remplaza del elemento la clase "modalH", que le da un display none, por la clase "showModal"
    //que inicia una animacion para su despliegue.
    modalVew.classList.replace("modalH","showModal");
}

function hiddenModal(){
    //Se le añade la clase "hiddenModal" que incia una animacion de desaparicion. 
    modalVew.classList.add("hiddenModal");
}

const titleCModal = document.getElementById("titelCardModal"); //Elemento "h1" en el modal que corresponde al titulo.
const descModal = document.getElementById("descrip"); //Contenedor de la descripcion en el modal.
const dateModal = document.getElementById("dateModal"); //Elemento "p" en el modal que corresponde a la fecha.

function vewCard(title,desc,date){
    showModal();

    clearDescModal(); //Se "limpian" los contenidos del modal para mostrar los nuevos.

    titleCModal.innerHTML = title; //El modal adquiere el titulo de la tarjeta.

    if (date == "list"){ //Si la variable date corresponde a "list"...

        //Se crea un elemento "ul" que se insertara en la seccion de la descripcion del modal.
        const ul = document.createElement("ul");
        descModal.appendChild(ul);

        const listElements = desc.children;
        let count = 0;
        let liModal= [];

        //Se crea un array en el que se insertaran el valor de cada uno de los elementos hijos de la seccion descripcion de la tarjeta.
        for(i of listElements){
            liModal.push(desc.children[count].innerHTML)
            count +=1
        }

        //Se crea un elemento "li" por cada elemento en el array anteriormente creado.
        //Recibiendo su valor y posteriormente siendo incertado en el elemento "ul"
        for(let index = 0; index < liModal.length; index++){
            let li;
            li = document.createElement("li");
            
            ul.appendChild(li);
            li.innerHTML += liModal[index];
        }

    }else if (date == "task"){ //Si la variable date corresponde a "task"...

        //Se crea un elemeto "p" que se inserta en la seccion de la descripcion del modal.
        //Se le asigna el valor de la descripcion de la tarjeta seleccionada.
        const p = document.createElement("p");
        descModal.appendChild(p);

        p.innerHTML = desc;
    }else {
        //Si ninguna de las anteriores condiciones se cumple, aparte de crearse el elemento "p".
        const p = document.createElement("p");
        descModal.appendChild(p);

        p.innerHTML = desc;

        //Se asigna al parrafo de la fecha el valor de la variable "date".
        dateModal.innerHTML = date; 
    } 

    //Luego de que la animacion termine de ejecutarse se remueve del elemento modal la clase "showModal".
    setTimeout(()=>{
        modalVew.classList.remove("showModal");
    },1000)
    
}

function clearDescModal() {
    dateModal.innerHTML = ""; //Se vacia el elemento "dateModal"

    //Se eliminan todos los elementos creados en la seccion de descripcion.
    while (descModal.firstChild) {
        descModal.removeChild(descModal.firstChild);
    }
}

function closeCard(){
    hiddenModal();

    unfoldedCard = ""; //Se vacia la variable "unfoldedCard".

    //Momentos antes de que se termine la animacion se remplaza la clase "hiddenModal" por la clase "modalH", 
    //que le da un display none.
    setTimeout(()=>{
        modalVew.classList.remove("hiddenModal");
        modalVew.classList.add("modalH");
    },900)
}

//* FILTRAR TARJETA *//
//El objetico de la funcione "filterAll" es quitar los filtros aplicados,
//mientras que el de "filterTask", "filterEvent" y "filterList" es mostrar solo las tarjetas
//de tipo "task", "event" o "list" respectivamente.
//Para ello se utilizan las clases "cardShow" que incia una animacion de despliegue, 
//"cardHidden" que inicia una animacion de desaparicion.
//Las mismas deben ser eliminadas cuando la animacion termina para poder ser activada correctamente la proxima vez.
//Y la clase "cardFilted" que da a las tarjetas un display none.



const allFilter = document.getElementById("all"); //Boton en el nav para mostrar todas las tarjetas.
const taskFilter = document.getElementById("tasks"); //Boton en el nav para mostrar solo las tarjetas de tipo "task".
const eventFilter = document.getElementById("events"); //Boton en el nav para mostrar solo las tarjetas de tipo "event".
const listFilter = document.getElementById("lists"); //Boton en el nav para mostrar solo las tarjetas de tipo "list".

allFilter.addEventListener("click",()=> filterAll());
taskFilter.addEventListener("click",()=> filterTask());
eventFilter.addEventListener("click",()=> filterEvent());
listFilter.addEventListener("click",()=> filterList());

function depureShow(){

    //recorre todas las tarjetas y elimina la clase "cardShow".

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
    //Recorre todas las tarjetas y comprueva si contienen la clase "cardFilted".
    //Si es el caso la remplazará por la clase "cardShow", que como se dijo anteriormente, inicia una animacion de despliegue.
    //Llamando a la funcion "depureShow" para eliminar esta clase una vez terminado el proceso.

    const events = document.querySelectorAll(".event");
    const lists = document.querySelectorAll(".list");
    const tasks = document.querySelectorAll(".task");

    //Establece la clase 'active' para resaltar el filtro activo

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

    //La funcion "cardWatcher" y sus parametros tienen como objetivo
    //comprobar el filtro activo y la cantidad de tarjetas que se despliegan con el mismo.
    //para, de ser necesario, hacer aparecer (o desaparecer) un mensaje.

    let ce = document.querySelectorAll(".card").length;
    let css = "all"

    cardWatcher(ce,css);
}

function filterTask(){

    //Recorre todas las tarjetas y de ser necesario despliega las tarjetas de clase "task"
    //y hace desaparecer las tarjetas de otras clases.

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

    //Recorre todas las tarjetas y de ser necesario despliega las tarjetas de clase "event"
    //y hace desaparecer las tarjetas de otras clases.

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

    //Recorre todas las tarjetas y de ser necesario despliega las tarjetas de clase "list"
    //y hace desaparecer las tarjetas de otras clases.

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

//* CAMBIAR FORMULARIO *//

//En la siguiente seccion se proporciona la logica detras del cambio en los elementos del formulario. mrdiante tres funciones similares

//* Checkbox
const formTask = document.getElementById("task");
const formEvent = document.getElementById("event");
const formList = document.getElementById("list");

//* Inputs
const cardInfoContent = document.getElementById("containerTask"); 
//Contenedor del input tipo textarea compartido por las tarjetas  tipo "task" y "event".

const eventConten = document.getElementById("containerEvent"); //Contenedor del input tipo date de la tarjeta tipo "event".
const eventD = document.getElementById("dateEvent"); //input tipo date.

const listItems = document.getElementById("containerList"); //Contenedor de los inputs tipo text de la tarjeta tipo "list".

const cardInfo = document.getElementById("cardDescription"); 
//input tipo textarea compartido por las tarjetas tipo "task" y "event".

const itemImput = document.querySelectorAll(".itemList"); //inputs tipo text.


formEvent.addEventListener("click",()=> changeToEvent());
formList.addEventListener("click",()=> changeToList());
formTask.addEventListener("click",()=> changeToTask());

//La funciones "changeToEvent", "changeToTask" y "changeToList" tienen como objetivo habilitar los elementos 
//nesesarios para la creacion de las tarjetas de clase "event", "task" y "list" respectivamente.

//Cada tipo de input y su contenedor cuenta con una clase especifica que da inicio a una animacion de desaparicion 
//y una clase que da inicio a una animacion de despliegue. Cuando la animacion termina debe eliminarse la clase,
//para poder ser activada correctamente la proxima vez.


function changeToEvent(){
    //De ser necesario, oculta los inputs tipo text y su contenedor,
    //donde irian los items de la tarjeta de clase "list".
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
    
    //De ser necesario, despliega el input tipo textarea y su contenedor, donde iria la descripcion de la tarjeta.
    //Despliega el input tipo date y su contenedior, donde iria la fecha del evento.
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

    //De ser necesario, oculta el input de tipo date y su contenedor,
    //donde iria la fecha del evento de las tarjetas de clase "event"
    if(!eventConten.classList.contains("hidden")){
        eventD.classList.add("hiddenDate");
        setTimeout(()=>{
            eventD.classList.replace("hiddenDate","edHidden");
            eventConten.classList.add("hiddenDate");
            eventConten.classList.replace("hiddenDate","hidden");
        },954)
    }
    
    //De ser necesario, despliega el input tipo textarea y su contenedor, 
    //donde iria la descripcion de la tarjeta.
    if(cardInfoContent.classList.contains("hidden")){
        setTimeout(()=>{
            cardInfoContent.classList.remove("hidden");
            cardInfo.classList.replace("hidden","showInput");            
        },955)
    }

    setTimeout(() => {
        cardInfo.classList.remove("showInput");
    }, 1500);

}

function changeToList(){

    //Oculta los elementos inecesarios
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

    //Descpliega  los inputs tipo text y su contenedor,
    //donde irian los items de la tarjeta de clase "list".
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

//* VALIDAR FORMULAIO *//

//En este segmento se realiza la logica detras del funcionamiento del formulario para crear tarjeta.
//Con su control de errores y el manejo de un pop up a modo de "alerta" en caso de cometerse uno.

//La mayoria de los elementos involucrados ya son invocados en la seccion anterior.

const formCard = document.getElementById("formCard"); //Contenedor del formulario.

const titleCard = document.getElementById("cardTitle"); //Input donde se ingresa el titulo de la tarjeta. 

//Referenciamos especificamente el conteido de los inputs del formulario de "list".
const itemL = document.querySelectorAll(".itemList").textContent; 

const saveButton = document.getElementById("saveCard"); 

const alert = document.getElementById("alertConteiner"); //Contenedor del pop ap "alerta".
const closeAlertButton = document.getElementById("closeAlert");

function showAlert(t){
    //La funcion "showAlert" despliega la alerta.
    //El parametro "t" es una cadena de texto que señala el error cometido.
    const alertP = document.getElementById("alertError");
    alert.style.display="flex";
    alertP.innerHTML = t;
}

closeAlertButton.addEventListener("click",()=>{
    //Oculta la alerta.
    alert.style.display="none";
})

saveButton.addEventListener("click",(e)=>{

    e.preventDefault(); //Se detienen los procesos automaticos del boton.

    //Se almacena el estado "check" de las checkbox.
    const checkList = formList.checked; 
    const checkEvent = formEvent.checked;

    let title = titleCard.value; //Se almacena el valor del input "titelCard".
    let tInfo = cardInfo.value; //Se almacena el valor del input "cardInfo".
    let eDate = eventD.value; //Se almacena el valor del input "eventD".

    //Se almacenan todos los inputs con la clase "itemList", donde irian los items a agregar en la targeta de tipo "list".
    const listItems = document.querySelectorAll(".itemList"); 

    let errorType; //Variable donde se almacena la naturaleza del error cometido.

    //Como se dijo antes, segun el checkbox seleccionado se mostraran diferentes elementros en el formulario.

    switch (true) {
         //Se comprueba que configuracion esta activa.
        case checkList:

            //Si checkList esta seleccionado...

            //Se crea un array vacio y un contador con valor "0".
            
            let items = [];
            let count = 0;

            // Recorre los elementos almacenados en la variable "listItems" mediante el método "querySelectorAll",
            // y guarda en el array "items" solo aquellos que tengan un valor diferente a null.
            for (let itemL = 0; itemL < listItems.length; itemL++) {
                let i = listItems[count].value;
                if (i != "") {
                items.push(i);
                }
                count++;
            }
        
            // Comprueba si la entrada del título del formulario está vacía
            //y si el array "items" también lo está.
            //se ejecuta la funcion "showAlert" con el error correspondiente como parametro si alguno lo esta.
            if (title == "") {
                errorType="Ingrese un titulo";
                showAlert(errorType);
            } else if (items == "") {
                errorType="Debe haber por lo menos un item en la lista";
                showAlert(errorType);
            } else {
                // Ejecuta la función "createCard" con los parámetros correspondientes a los datos ingresados,
                // y la variable "date" con valor "list" debido a la inexistencia de dicho input en esta configuración de formulario.
                let date = "list"
                createCard(title,items,date);
                
                // Limpia los campos del formulario.
                for (var i = 0; i < listItems.length; i++) {
                    listItems[i].value = "";
                }
                
            }
            break;
        case checkEvent:
            //Si por el contrario "checkEvent" esta sekeccionado..

            //Se comprueba si el título, la información y la fecha están vacíos.
            if (title == "" || tInfo == "" || eDate == "") {
                //Se muestra un mensaje de error si hay campos vacíos.
                errorType="No se permiten campos vacios";
                showAlert(errorType);
            } else {
                //Se crea la tarjeta utilizando los valores ingresados
                //en el título, la información y la fecha.
                createCard(title, tInfo, eDate);
                titleCard.value = "";
                eventD.value = "";
            }
            break;
        default:
            // "formTask" cheked es el estado por default del formulario. 

            //Del mismo modo se comprueba el estado de los inputs.
            if (title == "" || tInfo == "") {
                errorType="No se permiten campos vacios";
                showAlert(errorType);
            } else {
                // Al no contar con el input de fecha,
                //se utiliza la variable "date" con el valor "task".                
                let date = "task";
                createCard(title, tInfo, date);
            }
            
    }
});


//* CREAR TARJETAS *//
function createCard(title,desc,date){

    //La funcion encargada de la creación de nuevas tarjetas
    //resive como parametros desde un formulario un titlo, una descripcion y un elemento extra
    //que varia segun el tipo de tarjeta que se cree.

    const t = title;
    const d = desc;

    const bit= "Ver";
    const bdt= "delete";

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

    // La tarjeta resultante puede tener tres o cuatro secciones, según su tipo:
    // - Clase "task": incluye título y descripción, botón de despliegue y botón de borrado.
    // - Clase "event": además de título y descripción, incluye una sección extra para la fecha del evento.
    // - Clase "list": contiene solo título y una sección extra para los ítems de la lista.

    
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
    else if (date == "task"){
        const p = document.createElement("p");
        p.textContent=d;
        cardD.appendChild(p);
        card.appendChild(cardD);
    }
    else {
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
    
    //El tipo de tarjeta viene dado por la variable extra, que ingresa un string con la clase o una fecha directamente.

    card.appendChild(cardO);
    card.appendChild(cardDel);

    //Se verifica si hay algun filtro activo, 
    //en caso de no coincidir con el filtro la tarjeta tendra una clase extra que evita su despliegue. 
    //Si la tarjeta coincide con el filtro o no hay ninguno aparece al inicio de la bandeja
    //con una clase extra que le da una animacion de despliegue. Que luego es depurada.

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
                card.classList.add("cardShow");
        }

    },1000)
    
    titleCard.value = "";
    cardInfo.value = "";
    
    setInterval(depureShow, 1500);
}

//* BORRAR TARJETAS *//
function cardDelete(e){
    //La funcion cardDelete elimina una tarjeta recibiendo como parametro el boton dentro de la misma que la desencadena.

    const item = e.target.parentElement.parentElement;
    let cardsElement = document.querySelectorAll(".card");
    let ce;

    //Se almacena en una variable el elemento padre del contenedor del boton (la tarjeta),
    //un array con la cantidad de tarjetas existentes y la clase de la tarjeta seleccionada.
    //Si esta desplegado un elemento PopUp dependiente de la tarjeta eliminada este se cierra automaticamente.

    if(item == unfoldedCard){
        closeCard()
    }

    ce = item.classList[0];

    //Al mismo tiempo se inicia una animacion que involucra tres elementos (el boton, su contenedor y la tarjeta en su totalidad).
    let cont = e.target.parentElement;
    cont.classList.add("deleted");


    let bConteiner = e.target.parentElement;
    let button = e.target;
    let card = e.target.parentElement.parentElement;

    bConteiner.classList.add("deleted");
    button.classList.add("deleted");
    card.classList.add("deleted");

    //Una vez la animacion termina la tarjeta es eliminada
    //y se hace una comprobacion de cantidad de elementos para controlar la presencia de un mensaje.
    function del(){
        cardSection.removeChild(item);  
        cardWatcherDeleter(ce,cardsElement);
    }

    setTimeout(del,2000);
}

//* CONTADORES DE TARJETAS *//

//Las siguientes funciones tienen como fin la comparacion de elementos existentes en la bandeja de tarjetas,
//visibles o no, y el manejo de un mensaje segun corresonda. 

const message = document.getElementById("message"); //Conetenedor del mensaje.

function showMessage(){
    //Cambia el estado del mensaje de "oculto" a "visible"
    message.classList.replace("hiddenMessage","message");
}

function hiddenMessage(){    
    //Cambia el estado del mensaje de "visible" a "oculto" 
    message.classList.replace("message","hiddenMessage");
}

function cardWatcher(i,c){

    // La función cardWatcher se ejecuta cada vez que un filtro se activa.
    // Recibe un string con el tipo de filtro activo y
    // un Array en el que se almacenan las tarjetas con la clase correspondiente al filtro.
    // Esto permite controlar la presencia de un mensaje en la bandeja de tarjetas.

    // Si el array está vacío y el mensaje está oculto, se desplegará.
    // Si, en cambio, el mensaje está desplegado y el array tiene algún elemento, el mensaje se ocultará.

    switch (c) {
        case "task":
        case "event":
        case "list":
        default:
            if (i == 0 && message.classList == "hiddenMessage") {
                showMessage();
            } else if (i != 0 && message.classList == "message") {
                hiddenMessage();
            }
            break;
    }
}

function newCardWatcher(f,c,cl){

    // La función newCardWatcher se ejecuta cada vez que se crea una nueva tarjeta.
    // Recibe como parámetros la clase de la tarjeta creada, el filtro activo y la tarjeta como elemento en sí.

    // Si la clase de la tarjeta coincide con el filtro activo, la tarjeta aparecerá con una animación.
    // Adicionalmente, se ocultará el mensaje si está desplegado. En caso contrario, la tarjeta no aparecerá.


    if(f == c && message.classList=="message"){
        hiddenMessage();
        cl.classList.add("cardShow");
    } else{
        cl.classList.add("cardFilted");
    }
}

function cardWatcherDeleter(ce,cardsElement){

    // La función cardWatcherDeleter se ejecuta cada vez que se elimina una tarjeta.
    // Recibe como parámetros la clase del elemento eliminado y un array con la cantidad de tarjetas existentes.

    let t = ce;
    let c = cardsElement;
    c = c.length;

    let cardsTask = document.querySelectorAll(".task").length;
    let cardsEvent = document.querySelectorAll(".event").length;
    let cardsList = document.querySelectorAll(".list").length;

    c -= 1; 

    // Se actualiza la cantidad de tarjetas existentes
    //y se comprueba la cantidad de tarjetas para cada clase específica (task, event, list).
    // Si no quedan tarjetas coincidentes con el filtro activo se muestra un mensaje, 
    //a menos que no haya filtro activo, en cuyo caso se muestra el mensaje si no hay tarjetas en ninguna categoría.

    if (allFilter.classList[1] == "active") {
        if (c == 0) {
            showMessage();
        }
    } else {
        switch (t) {
            case "task":
                if (taskFilter.classList[1] == "active" && cardsTask == 0) {
                    showMessage();
                }
                break;
            case "event":
                if (eventFilter.classList[1] == "active" && cardsEvent == 0) {
                    showMessage();
                }
                break;
            case "list":
                if (listFilter.classList[1] == "active" && cardsList == 0) {
                    showMessage();
                }
                break;
        }
    }
}