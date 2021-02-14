const overLay = {
    opacity (n) {
        document.getElementsByClassName("overLay")[0].style.opacity=`${n}`
    },
    zIndex (n) {
        document.getElementsByClassName("overLay")[0].style.zIndex=`${n}`
    }
}

const createNoteObj = {
    opacity (n) {
        document.getElementsByClassName("add-note-menu")[0].style.opacity=`${n}`
    },
    zIndex (n) {
        document.getElementsByClassName("add-note-menu")[0].style.zIndex=`${n}`
    }
}

const createButton = {
    zIndex (n) {
        document.getElementsByClassName("create-button")[0].style.zIndex =`${n}`
    }
}

const header = {
    zIndex (n) {
        document.getElementsByClassName("header")[0].style.zIndex =`${n}`
    }
}

const sideBar = {
    zIndex (n) {
        document.getElementsByClassName("side-bar")[0].style.zIndex =`${n}`
    }
}

const body = {
    overflow (t) {
        document.getElementsByTagName("body")[0].style.overflow =`${t}`
    } 
}

const note = {
    number: 0,
    zIndex (n) {
        document.getElementsByClassName("add-note-menu")[0].style.zIndex =`${n}`
    }
}

const storage = { 
    data: "",
    nextIndex: 0
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
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();

    let time = `${date.getHours()}:${date.toString().split(" ")[4].split(":")[1]}`;
    let dayMonth = `${date.toString().split(" ")[2]} ${monthNames[date.getMonth()]}`;
    let weekDay = weekDays[date.getDay()];
    document.querySelector(".time").innerHTML = time;
    document.querySelector(".week-day").innerHTML = weekDay;
    document.querySelector(".day-month").innerHTML = dayMonth;
}
function expandNote (e){
    //document.getElementById("note").style.maxHeight = "unset";
}   

function startExpandAnimation(times,height){
    let h=height+20;
    $(".fas").fadeIn({duration:500,queue:false}).transition({ y: "40px"},{duration:800,queue:false}).delay(500).fadeOut().transition({ y: '0px' });
    if(--times) return setTimeout(startExpandAnimation.bind(this, times), 1450);
}(3)
   
function printNotesHtml(id, title, text){
    document.getElementsByClassName("notes-wrap")[0].innerHTML +=
    `
    <div class ="note" id="${id}">
        <div class="close"><span><i class="far fa-times-circle"></i></span></div>
        <div class="title-note"><span class="title" role="textbox" contenteditable>${title}</span></div>
        <div class="text-note"><span class="text" role="textbox" contenteditable>${text}</span></div>
        <div class="expand"><i class="fas fa-angle-double-down"></i></div>
    </div>
        `
}        




function addNote(){
    storage.nextIndex ++;
    localStorage.setItem('current',storage.nextIndex);
    const note = new Note (undefined,undefined,`${storage.nextIndex}`);
    printNotesHtml(storage.nextIndex,note.title,note.text);
    updateLocalStorageData ();
    eventListener ();
}  
    
    function eventListener (){
        document.querySelectorAll(".close").forEach(e => {e.addEventListener("click", closeNote);});
        document.querySelectorAll(".title").forEach(e => {e.addEventListener("click", clearInput);});
        document.querySelectorAll(".text").forEach(e => {e.addEventListener("click", clearInput);});
        document.getElementsByTagName("body")[0].addEventListener("click",refreshInput);
        document.querySelectorAll(".text").forEach(e => {e.addEventListener("click", expandNote);});
        $(".title").keyup(function (e) {
        note.title = (e.target.innerHTML).replace(/&nbsp;/g, '');
        updateLocalStorageData ();
        });
        $(".text").keyup(function (e) {
        note.text = (e.target.innerHTML).replace(/&nbsp;/g, '');
        updateLocalStorageData ();
        });

}

function updateLocalStorageData (){
    storage.data = document.querySelector(".notes-wrap").innerHTML;
    localStorage.setItem('dataOfHtml', storage.data);
}
    


function getNotesFromLocalStorage(){
    localStorage.length >1 ? storage.data = localStorage.getItem('dataOfHtml') : null
    document.getElementsByClassName("notes-wrap")[0].innerHTML += storage.data;
    eventListener ();
}        

    getNotesFromLocalStorage();
    
    getDate();
    setInterval(()=>{getDate();}, 60000);

  
        
    
    