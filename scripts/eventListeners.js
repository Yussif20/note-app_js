import {  themeToggler,notesButton,addNoteButton, addNote, addPinnedNote, deleteButton, notes, plusButton, burgerMenu, notesAside, noteDetailsPage, notesAsideList, mobileSearchButton, mobileNav, searchInput, notesElements} from "./elements";
import {  addNotesHandler, chooseNote, deleteNote, showAddNotesPage, showNotesPage, themeTogglerHandler } from "./utils";
export const initListeners = () => {
      burgerMenu.addEventListener('click', () => {
      burgerMenu.classList.toggle('active');
      notesAside.classList.toggle('active');
    });
    mobileSearchButton.addEventListener("click",()=>{
      mobileNav.classList.toggle("active");
    })
    themeToggler.addEventListener("click", themeTogglerHandler);
    addNoteButton.addEventListener("click",showAddNotesPage);
    plusButton.addEventListener("click",showAddNotesPage);
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
            if (window.matchMedia("(max-width: 500px)").matches){
                 noteDetailsPage.style.display = "block";
                notesAsideList.style.display = "none";
            }
            noteDetailsPage.classList.add("active")
            const noteId = parseInt(e.currentTarget.parentElement.id);
            chooseNote(e,noteId)
        })
    })
};
searchInput.forEach(searchInput=>{
        searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase(); 
        notesElements().forEach(note => {
        const noteTitle = note.querySelector('h4').textContent.toLowerCase();
        if (noteTitle.includes(query)) {
            note.style.display = '';
        }else{
            note.style.display = 'none';
        }
});});})






