import { addNoteButton, addNotePage, App, authorInput, normalNotesContainer, noteInput, notesButton, NotesPage, pinnedNotesContainer, titleInput } from "./elements";

export const fetchData = (key) =>{
    const data = localStorage.getItem(key);
    return data? JSON.parse(data):false;

}
const saveToDB = (key,data)=>{
    localStorage.setItem(key,JSON.stringify(data))
}

export const themeTogglerHandler = ()=>{
    App.classList.toggle("app--isDark");
    saveToDB("darkThemeFlag" , App.classList.contains("app--isDark"))
}
export const showAddNotesPage =()=>{
    NotesPage.classList.remove("active");
    notesButton.classList.remove("active");
    addNoteButton.classList.add("active");
    addNotePage.classList.add("active");
    saveToDB("showingAddNotes" , addNoteButton.classList.contains("active"))
    saveToDB("showingNotes" , notesButton.classList.contains("active"))
}
export const showNotesPage =()=>{
    addNoteButton.classList.remove("active");
    addNotePage.classList.remove("active");
    notesButton.classList.add("active");
    NotesPage.classList.add("active");
    saveToDB("showingNotes" , notesButton.classList.contains("active"))
    saveToDB("showingAddNotes" , addNoteButton.classList.contains("active"))
}

const addNote =()=>{
     const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const note = {
        id:Date.now(),
        title : titleInput.value,
        author : authorInput.value,
        noteInfo : noteInput.value,
        date : formattedDate,
        isPinned :false,  
    }
    titleInput.value = '';
    authorInput.value = '';
    noteInput.value = '';
    return note;
}
const initNotes = () =>{
    const notes = fetchData("notes") || [];
    const pinnedNotes = fetchData("pinned-notes") || [];
    pinnedNotesContainer.innerHTML = renderNotes(pinnedNotes);
    normalNotesContainer.innerHTML = renderNotes(notes);
}
export const addNotesHandler = (e)=>{
    e.preventDefault(); 
    if(!titleInput.value||!authorInput.value||!noteInput.value)return;
    const notes = fetchData("notes") || [];
    notes.push(addNote());
    saveToDB("notes",notes);
    initNotes();
}
export const addPinnedNotesHandler = (e)=>{
    e.preventDefault(); 
    if(!titleInput.value||!authorInput.value||!noteInput.value)return;
    const pinnedNotes = fetchData("pinned-notes") || [];
    pinnedNotes.push(addNote());
    saveToDB("pinned-notes",pinnedNotes);
    initNotes();
}

const renderNotes = (notes) => {
    let notesList = ``;
    notes.forEach((note) => {
        let noteEl = ` <div id="${note.id}" class="note ${note.isPinned ? "pinned" : ""}">
              <h4>${note.title}</h4>
              <p>
               ${note.noteInfo}
              </p>
              <div class="note__footer">
                <p class="date">${note.date}</p>
                <button class="delete-btn">Delete</button>
              </div>
            </div>`
        notesList += noteEl;
    });
    return notesList
};


export const deleteNote = (e, id) => {
    e.preventDefault();
    let notes = fetchData("notes");
    notes = notes.filter(note => note.id !== id);
    saveToDB("notes", notes);
    initNotes();
}
export const deletePinnedNote = (e, id) => {
    let pinnedNotes = fetchData("pinned-notes");
    pinnedNotes = pinnedNotes.filter(note => note.id !== id);
    saveToDB("pinned-notes", pinnedNotes);
    initNotes();
}


export const initDataOnStartup =()=>{
    fetchData("darkThemeFlag") && themeTogglerHandler();
    fetchData("showingAddNotes") &&  showAddNotesPage() ;
    fetchData("showingNotes") && showNotesPage() ;
    initNotes();
}
