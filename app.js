var list = [];

const sidebar = {
    closeAll(){
        localStorage.removeItem('list');
        localStorage.removeItem('nextIndex');
        getNotesFromLocalStorage();
        $('.note').each(function(){this.remove();})
        list =[];
        localStorage.setItem('nextIndex', 0);
    },
    darkMode : 1
}

const search = {
    searchType: "title",
    byTitle(){
        this.searchType = "title";
        $('#byTitle').addClass("active");
        $('#byText').removeClass("active");
        searchNote('update');
    },
    byText(){
        this.searchType = "text";
        $('#byText').addClass("active");
        $('#byTitle').removeClass("active");
        searchNote('update');
    }
}

const storage = {
    nextIndex : 0
}


function Note (title = "Insert title here", text ="Insert text here", index, resize = 0){
    this.title = title;
    this.text = text;
    this.index = index;
    this.resize = resize;
}

function toggleSideBar(){
    let sideBarClass = document.getElementsByClassName("side-bar")[0].style;
    sideBarClass.transform === "translateX(0%)" ? sideBarClass.transform= "translateX(-100%)" : sideBarClass.transform= "translateX(0%)";
    $('#delete-all').on('click', function() {
        sidebar.closeAll();
    });



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
            $(`#${this.id}`).animate({opacity: '0'},300, function(){this.remove()});
            
            let storageList = JSON.parse(localStorage.getItem('list'));
            let newList = storageList.filter(function(note,index){
                
            return (note.index != id.match(/\d+/)[0]);
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

    if(e.target.className != "fas fa-bars" && e.target.className != "search-option active"){
        $('.search-by-option').fadeOut();
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
    <div class ="note" id="note${id}">
        <div class="close"><span><i class="far fa-times-circle"></i></span></div>
        <div class="title-note"><span class="title" role="textbox" contenteditable >${title}</span></div>
        <div class="text-note"><span class="text" id="text${id}" role="textbox" contenteditable >${text}</span></div>
        <div class ="resize"></div>
    </div> 
    `);
}

function printSearchedHtml (note,newlist){
    let display = "";
    
    for(let i=0; i< note.length; i++){
        display+= `
        <div class ="note" id="note${note[i].index}">
            <div class="close"><span><i class="far fa-times-circle"></i></span></div>
            <div class="title-note"><span class="title" role="textbox" contenteditable>${note[i].title}</span></div>
            <div class="text-note"><span class="text" id="text${note[i].index}" role="textbox" contenteditable>${note[i].text}</span></div>
            <div class ="resize"></div>
        </div> 
        `
        
    }
    
    $(".notes-wrap").html(display);

}


function searchNote(note){

    if(note==='update'){ //Note is only update when user changes the search by option.
        searchNote($('.search').val());
        return;
    }

    let display = [];
    let newlist = JSON.parse(localStorage.getItem('list'));
    
    if(search.searchType === "title"){
    newlist.forEach(element => {
        if((element.title).toLowerCase().includes(note.toLowerCase()) === true){
            display.push(element);
        }
    });

    }else{
    newlist.forEach(element => {
        if((element.text).toLowerCase().includes(note.toLowerCase()) === true){
            display.push(element);
        }
    });

}

    printSearchedHtml(display,newlist);
    $(".close").each(function(){this.addEventListener("click", closeNote);})
    $(".title").each(function(){this.addEventListener("click", clearInput);})
    $(".title").each(function(){this.addEventListener("focus", clearInput);})
    $(".text").each(function(){this.addEventListener("click", clearInput);})
    $(".text").each(function(){this.addEventListener("focus", clearInput);})

    $("body")[0].addEventListener("click",refreshInput);
    $(".resize").each(function(){this.addEventListener("click", updateResize);})
    $(".title").keyup(function (e) {
    let change = (e.target.innerHTML).replace(/&nbsp;/g, '');
    updateLocalStorageData (e.target.parentElement.parentElement.id,"title",change);
    });
    $(".text").keyup(function (e) {  
    let change = (e.target.innerHTML).replace(/&nbsp;/g, '');
    updateLocalStorageData (e.target.parentElement.parentElement.id,"text",change);
    });
    


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

function updateResize(){
    
    updateLocalStorageData(this.parentElement.id, "resize");
    
    
}
    
function eventListener (){
    
    $(".close").each(function(){this.addEventListener("click", closeNote);})
    $(".title").each(function(){this.addEventListener("click", clearInput);})
    $(".title").each(function(){this.addEventListener("focus", clearInput);})
    $(".text").each(function(){this.addEventListener("click", clearInput);})
    $(".text").each(function(){this.addEventListener("focus", clearInput);})
    $('#options').on('click',function(){ $("#dark-mode").fadeToggle(); })
    $("body")[0].addEventListener("click",refreshInput);
    $(".resize").each(function(){this.addEventListener("click", updateResize);})
    $(".title").keyup(function (e) {
    let change = (e.target.innerHTML).replace(/&nbsp;/g, '');
    updateLocalStorageData (e.target.parentElement.parentElement.id,"title",change);
    });
    $(".text").keyup(function (e) {  
    let change = (e.target.innerHTML).replace(/&nbsp;/g, '');
    updateLocalStorageData (e.target.parentElement.parentElement.id,"text",change);
    });
    $('.search').keyup(function(e){
        searchNote(e.target.value);
    })
    $('.search-option').click(function(){
        this.id === "byTitle" ? search.byTitle() : search.byText();
    })
}

function updateLocalStorageData (id,whatChanged,variable){
    let temporaryList = JSON.parse(localStorage.getItem('list'));
    temporaryList.forEach(note => {
        if(note.index == id.match(/\d+/)[0]){
            
            if(whatChanged === "title"){
                note.title = variable;
            }
            if(whatChanged === "text"){
                note.text = variable;
            }
            if(whatChanged === "resize"){
                
                note.resize=== 0 ? note.resize =1 : note.resize =0
                if(note.resize ===1){
                    $(`#${id}`).css({'max-height':'100%'});
                    $('.resize').hover(function() {
                        $(this).css("cursor","zoom-out")
                      });
                    $(`#text${id.match(/\d+/)}`).css({'max-height':'100%'});
                }else{
                    $(`#${id}`).css({'max-height':'20rem'});
                    $('.resize').hover(function() {
                        $(this).css("cursor","zoom-in")
                      });
                    $(`#text${id.match(/\d+/)}`).css({'max-height':'15rem'});}
            }
    }});
    localStorage.setItem('list', (JSON.stringify(temporaryList)) );
    list = temporaryList; 
}

function startEventListener (){
    $('.fa-bars').click(function () {
        $('.search-by-option').fadeToggle();
    });

    $("body")[0].addEventListener('click', function(e){
        if(e.target.className != 'side-bar' &&e.target.className != 'side-option' &&  e.target.className != 'sub-side-option' &&e.target.className != 'slider round' && e.target.id != 'side-button' && $('.side-bar').css('transform') != "matrix(1, 0, 0, 1, -144, 0)"){
            console.log(e.target);
            $('.side-bar').css('transform','translateX(-100%)');
            $("#dark-mode").fadeToggle(); 
        }
    });


}

function darkMode(){
    let root = document.documentElement;
    if(sidebar.darkMode === 1) {
        sidebar.darkMode = 0; 
        root.style.setProperty('--header', '#e9e9e9');
        root.style.setProperty('--mainColor', '#85C7F2');
        root.style.setProperty('--background', '#fafafa');
        root.style.setProperty('--button', '#d4d4d4');
        root.style.setProperty('--text', '#121212');
        root.style.setProperty('--noteText', '#121212');
        root.style.setProperty('--active', '#7e7e7e');
        root.style.setProperty('--scroll', '#292929');
        root.style.setProperty('--scrollHover', '#3a3a3a');
        root.style.setProperty('--search', '#cacaca');
        root.style.setProperty('--searchButton', '#757575');
        root.style.setProperty('--sideOptionBackground', '#bdbdbd');
        root.style.setProperty('--SubSideOptionBackground', '#dddddd');
        root.style.setProperty('--shadow', '#00000044');
    }
    else{
        sidebar.darkMode = 1
        root.style.setProperty('--header', '#1F1F1F');
        root.style.setProperty('--mainColor', '#EDAE49');
        root.style.setProperty('--background', '#121212');
        root.style.setProperty('--button', '#070707');
        root.style.setProperty('--text', '#E1E1E1');
        root.style.setProperty('--noteText', '#121212');
        root.style.setProperty('--active', '#363636');
        root.style.setProperty('--scroll', '#292929');
        root.style.setProperty('--scrollHover', '#3a3a3a');
        root.style.setProperty('--search', '#0e0e0e');
        root.style.setProperty('--searchButton', '#757575');
        root.style.setProperty('--sideOptionBackground', '#0e0e0e');
        root.style.setProperty('--SubSideOptionBackground', '#161616');
        root.style.setProperty('--shadow', '#000000');
    }
    

    
}

function getNotesFromLocalStorage(){
    if(localStorage.getItem('list')!= null){
        JSON.parse(localStorage.getItem('list')).forEach(note => {
            printNotesHtml(note.title,note.text,note.index);
    });
}   
eventListener ();
}


getNotesFromLocalStorage();
startEventListener ();
getDate();
setInterval(()=>{getDate();}, 60000);