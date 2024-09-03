import {  themeToggler,notesButton,addNoteButton, addNote, addPinnedNote, deleteButton} from "./elements";
import {  addNotesHandler, deleteNote, showAddNotesPage, showNotesPage, themeTogglerHandler } from "./utils";


export const initListeners = () => {
    themeToggler.addEventListener("click", themeTogglerHandler);
    addNoteButton.addEventListener("click",showAddNotesPage);
    notesButton.addEventListener("click",showNotesPage);
    addNote.addEventListener("click",(e)=>{
        addNotesHandler(e,false);
    })
    addPinnedNote.addEventListener("click",(e)=>{
        addNotesHandler(e,true);
    })
}

export const initTaskListeners = () => {
    deleteButton().forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
            const taskId = parseInt(e.currentTarget.parentElement.parentElement.id);
            deleteNote(e,taskId)
        })
    })
};

