const overLay = {
    opacity (n) {
        document.getElementsByClassName("overLay")[0].style.opacity=`${n}`
    },
    zIndex (n) {
        document.getElementsByClassName("overLay")[0].style.zIndex=`${n}`
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

function toggleSideBar(){
    let sideBarClass = document.getElementsByClassName("side-bar")[0].style;
    sideBarClass.transform === "translateX(0%)" ? sideBarClass.transform= "translateX(-100%)" : sideBarClass.transform= "translateX(0%)";
}

function createNote (){
    console.log("im here");
    createButton.zIndex(-1);
    overLay.opacity(1);
    createNoteObj.opacity(1);
    header.zIndex(-1);
    body.overflow("hidden");
    sideBar.zIndex(-1);
}   

function closeCreateNote(){ 
    createButton.zIndex(0);
    sideBar.zIndex(0);
    createNoteObj.opacity(-1);
    overLay.opacity(-1);
    header.zIndex(0);
    body.overflow("none")
}

document.getElementsByClassName("close")[0].addEventListener("click", closeCreateNote);
document.getElementsByClassName("overLay")[0].addEventListener("click", closeCreateNote);
