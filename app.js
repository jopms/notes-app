const overLay = {
    opacity (n) {
        document.getElementsByClassName("overLay")[0].style.opacity=`${n}`
    }
};

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
function toggleSideBar(){
    console.log("im here");
    let sideBarClass = document.getElementsByClassName("side-bar")[0].style;
    sideBarClass.transform === "translateX(0%)" ? sideBarClass.transform= "translateX(-100%)" : sideBarClass.transform= "translateX(0%)";
}

function createNote (){
    createButton.zIndex(-1);
    overLay.opacity(1);
    createNoteObj.opacity(1);
}

function closeCreateNote(){ 
    createNoteObj.opacity(-1);
    overLay.opacity(-1);
}

document.getElementsByClassName("close")[0].addEventListener("click", closeCreateNote);
document.getElementsByClassName("overLay")[0].addEventListener("click", closeCreateNote);
