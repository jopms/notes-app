const storage = { 
    data: ""
}

function Note (title = "Insert title here", text ="Insert text here"){
    this.title = title;
    this.text = text;
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

function refreshInput (e){
    if(e.target.className != "note" && e.target.className != "title" && e.target.className != "text-note" && e.target.className != "title-note" && e.target.className != "text" && e.target.className != "far fa-times-circle" && e.target.className != "close"){
        document.querySelectorAll(".title").forEach(e => {
            if(e.innerHTML==="" ){
                e.innerHTML = "Insert title here";
                updateLocalStorageData ();
            }
        });
        document.querySelectorAll(".text").forEach(e => {
            if(e.innerHTML===""){
                e.innerHTML  = "Insert text here";
                updateLocalStorageData ();
            }
        });
    }
}

function closeNote(){
    (this.parentElement).remove();
    updateLocalStorageData ();
}

function getDate(){
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    $(".time").html(`${date.getHours()}:${date.toString().split(" ")[4].split(":")[1]}`);
    $(".week-day").html(weekDays[date.getDay()]);
    $(".day-month").html(`${date.toString().split(" ")[2]} ${monthNames[date.getMonth()]}`);
}

   
function printNotesHtml(title, text){
    $(".notes-wrap").append(
        `
        <div class ="note">
            <div class="close"><span><i class="far fa-times-circle"></i></span></div>
            <div class="title-note"><span class="title" role="textbox" contenteditable>${title}</span></div>
            <div class="text-note"><span class="text" role="textbox" contenteditable>${text}</span></div>
        </div> 
        `);
}        

function addNote(){
    const note = new Note ();
    printNotesHtml(note.title,note.text);
    updateLocalStorageData ();
    eventListener ();
}  
    
function eventListener (){
    $(".close").each(function(){this.addEventListener("click", closeNote);})
    $(".title").each(function(){this.addEventListener("click", clearInput);})
    $(".text").each(function(){this.addEventListener("click", clearInput);})
    $("body")[0].addEventListener("click",refreshInput);
    $(".title").keyup(function (e) {
    (e.target.innerHTML).replace(/&nbsp;/g, '');
    updateLocalStorageData ();
    });
    $(".text").keyup(function (e) {
    (e.target.innerHTML).replace(/&nbsp;/g, '');
    updateLocalStorageData ();
    });
}

function updateLocalStorageData (){
    localStorage.setItem('dataOfHtml', document.querySelector(".notes-wrap").innerHTML);
}
    
function getNotesFromLocalStorage(){
    $(".notes-wrap").html(localStorage.getItem('dataOfHtml'));
    eventListener ();
}        

getNotesFromLocalStorage();
    
getDate();
setInterval(()=>{getDate();}, 60000);