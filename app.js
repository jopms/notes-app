var list = [];

const storage = {
    nextIndex : 0
}

function Note (title = "Insert title here", text ="Insert text here", index){
    this.title = title;
    this.text = text;
    this.index = index;
}

function toggleSideBar(){
    let sideBarClass = document.getElementsByClassName("side-bar")[0].style;
    sideBarClass.transform === "translateX(0%)" ? sideBarClass.transform= "translateX(-100%)" : sideBarClass.transform= "translateX(0%)";
}

function clearInput (e){
    if(this.innerHTML === `Insert ${this.className.split("-")} here`){
        this.innerHTML = "";
    }
}

function removeNoteFromLocalStorage(id) {
    let removeFromList = 0;
    $(".note").each(function(){
        if(this.id === id){
        this.remove();
        let storageList = JSON.parse(localStorage.getItem('list'));
        let newList =storageList.filter(function(note,index){
            return (note.index != id);
        }); 
        list = newList;
        localStorage.setItem('list',JSON.stringify(newList));
    } });
}

function refreshInput (e){
    if(e.target.className != "note" && e.target.className != "title" && e.target.className != "text-note" && e.target.className != "title-note" && e.target.className != "text" && e.target.className != "far fa-times-circle" && e.target.className != "close"){
        document.querySelectorAll(".title").forEach(e => {
            if(e.innerHTML==="" ){
                let changed = e.innerHTML = "Insert title here";
                updateLocalStorageData (e.parentElement.parentElement.id,"title",changed);
            }
        });
        document.querySelectorAll(".text").forEach(e => {
            if(e.innerHTML===""){
                let changed = e.innerHTML  = "Insert text here";
                updateLocalStorageData (e.parentElement.parentElement.id,"text",changed);
            }
        });
    }
}

function closeNote(){
    removeNoteFromLocalStorage(this.parentElement.id);
}



function getDate(){
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    $(".time").html(`${date.getHours()}:${date.toString().split(" ")[4].split(":")[1]}`);
    $(".week-day").html(weekDays[date.getDay()]);
    $(".day-month").html(`${date.toString().split(" ")[2]} ${monthNames[date.getMonth()]}`);
}

function printNotesHtml(title, text, id){
    $(".notes-wrap").append(
    `
    <div class ="note" id="${id}">
        <div class="close"><span><i class="far fa-times-circle"></i></span></div>
        <div class="title-note"><span class="title" role="textbox" contenteditable>${title}</span></div>
        <div class="text-note"><span class="text" role="textbox" contenteditable>${text}</span></div>
    </div> 
    `);
}        

function addNote(){
    if(storage.nextIndex== "0" && localStorage.getItem('nextIndex')!=undefined)storage.nextIndex=localStorage.getItem('nextIndex');
    const note = new Note (undefined, undefined, storage.nextIndex);
    if(localStorage.getItem('list')!= undefined && list == ""){
        list.push(...JSON.parse(localStorage.getItem('list')));
        list.push(note);
        localStorage.setItem('list', JSON.stringify(list));
    }
    else{
        list.push(note);
        localStorage.setItem('list', JSON.stringify(list));
    }
    JSON.parse(localStorage.getItem('list')).forEach(note => {
        if(note.index === storage.nextIndex)printNotesHtml(note.title,note.text,note.index);
    });
    eventListener ();
    storage.nextIndex ++;
    localStorage.setItem('nextIndex', storage.nextIndex);
}  
    
function eventListener (){
    $(".close").each(function(){this.addEventListener("click", closeNote);})
    $(".title").each(function(){this.addEventListener("click", clearInput);})
    $(".text").each(function(){this.addEventListener("click", clearInput);})
    $("body")[0].addEventListener("click",refreshInput);
    $(".title").keyup(function (e) {
    let change = (e.target.innerHTML).replace(/&nbsp;/g, '');
    updateLocalStorageData (e.target.parentElement.parentElement.id,"title",change);
    });
    $(".text").keyup(function (e) {  
    let change = (e.target.innerHTML).replace(/&nbsp;/g, '');
    updateLocalStorageData (e.target.parentElement.parentElement.id,"text",change);
    });
}

function updateLocalStorageData (id,whatChanged,variable){
    let temporaryList = JSON.parse(localStorage.getItem('list'));
    temporaryList.forEach(note => {
        if(note.index == id){
            if(whatChanged === "title"){
                note.title = variable;
            }
            if(whatChanged === "text"){
                note.text = variable;
            }
    }});
    localStorage.setItem('list', (JSON.stringify(temporaryList)) );
    list = temporaryList; 
}
    
function getNotesFromLocalStorage(){
    $(".notes-wrap").html(localStorage.getItem('dataOfHtml'));
    eventListener ();
}        

getNotesFromLocalStorage();
    
getDate();
setInterval(()=>{getDate();}, 60000);