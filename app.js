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


function toggleSideBar(){
    let sideBarClass = document.getElementsByClassName("side-bar")[0].style;
    sideBarClass.transform === "translateX(0%)" ? sideBarClass.transform= "translateX(-100%)" : sideBarClass.transform= "translateX(0%)";
}



function changeInputText(refresh){
    if(document.getElementsByClassName("title")[0].innerHTML === ""){
        document.getElementsByClassName("title")[0].innerHTML = "Insert title here";
    }
    
    if(document.getElementsByClassName("text")[0].innerHTML === ""){
        document.getElementsByClassName("text")[0].innerHTML = "Insert text here";
    }

    if(refresh === "refresh"){
        document.getElementsByClassName("title")[0].innerHTML = "Insert title here";
        document.getElementsByClassName("text")[0].innerHTML = "Insert text here";
    }
}

function clearInput (e){
    if(this.innerHTML === `Insert ${this.className.split("-")} here`){
        this.innerHTML = "";
    }
}

function refreshInput (e){
    if(e.target.className != "note" && e.target.className != "title" && e.target.className != "text-note" && e.target.className != "title-note" && e.target.className != "text" && e.target.className != "far fa-times-circle" && e.target.className != "close"){
        document.querySelectorAll(".title").forEach(e => {
            if(e.innerHTML===""){
                e.innerHTML = "Insert title here";
            }
        });
        document.querySelectorAll(".text").forEach(e => {
            if(e.innerHTML===""){
                e.innerHTML = "Insert text here";
            }
        });
    }
}

function closeNote(){
    (this.parentElement).remove()
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


function addNote(){
    document.getElementsByClassName("notes-wrap")[0].innerHTML += 
    `
    <div class ="note" id="note">
        <div class="close" ><span><i class="far fa-times-circle"></i></span></div>
        <div class="title-note"><span class="title" role="textbox" contenteditable>Insert title here</span></div>
        <div class="text-note"><span class="text" role="textbox" contenteditable>Insert text here</span></div>
    </div>
        `
        document.querySelectorAll(".close").forEach(e => {e.addEventListener("click", closeNote);});
        document.querySelectorAll(".title").forEach(e => {e.addEventListener("click", clearInput);});
        document.querySelectorAll(".text").forEach(e => {e.addEventListener("click", clearInput);});
        document.getElementsByTagName("body")[0].addEventListener("click",refreshInput);
    }       
    getDate();
    setInterval(()=>{getDate();}, 60000);
    
    