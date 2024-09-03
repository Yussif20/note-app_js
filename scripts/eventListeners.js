import {  themeToggler,notesButton,addNoteButton, addNote, addPinnedNote, deleteButton, notes} from "./elements";
import {  addNotesHandler, chooseNote, deleteNote, showAddNotesPage, showNotesPage, themeTogglerHandler } from "./utils";


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
            const noteId = parseInt(e.currentTarget.parentElement.parentElement.id);
            deleteNote(e,noteId)
        })
    })
    notes().forEach((note)=>{
        note.addEventListener("click",(e)=>{
            const noteId = parseInt(e.currentTarget.parentElement.id);
            chooseNote(e,noteId)
        })
    })
};

