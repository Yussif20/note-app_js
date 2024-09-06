import { addNoteButton, addNotePage, App, authorInput, normalNotesContainer, noteDetailsPage, noteInput, notesButton, NotesPage, pinnedNotesContainer, titleInput } from "./elements";
import { initTaskListeners } from "./eventListeners";

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

const addNote =(isPinned = false)=>{
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
        isPinned :isPinned,  
    }
    titleInput.value = '';
    authorInput.value = '';
    noteInput.value = '';
    return note;
}
const initNotes = () =>{
    const notes = fetchData("notes") || [];
    console.log(notes)
    const normalNotes = notes.filter(note => note.isPinned === false)
    const pinnedNotes = notes.filter(note => note.isPinned === true) 
    normalNotesContainer.innerHTML = renderNotes(normalNotes);
    pinnedNotesContainer.innerHTML = renderNotes(pinnedNotes);
    initTaskListeners();
}
export const addNotesHandler = (e,isPinned)=>{
    e.preventDefault(); 
    if(!titleInput.value||!authorInput.value||!noteInput.value)return;
    const notes = fetchData("notes") || [];
    notes.push(addNote(isPinned));
    saveToDB("notes",notes);
    initNotes();
}

const renderNotes = (notes) => {
    let notesList = ``;
    notes.forEach((note) => {
        let noteEl = ` 
        <div id="${note.id}" class="note">
              <div class="note-main">
                <h4>${note.title}</h4>
              <p>
               ${note.noteInfo}
              </p>
              </div>
              <div class="note__footer">
                <p class="date">${note.date}</p>
                <button class="delete-btn">Delete</button>
              </div>
            </div>`
        notesList += noteEl;
    });
    return notesList
};
const renderNoteDetails = (note) =>{
    let noteEl = `
          <h2>${note.title}</h2>
          <span>${note.date} / by ${note.author}</span>
          <p>
           ${note.noteInfo}
          </p>
    `
    noteDetailsPage.innerHTML = noteEl;
}


export const deleteNote = (e, id) => {
    let notes = fetchData("notes") || [];
    notes = notes.filter(note => note.id !== id);
    saveToDB("notes", notes);
    initNotes();
}
export const chooseNote = (e, id) => {
    let notes = fetchData("notes") || [];
    let note = notes.find(note => note.id === id);
   renderNoteDetails(note);
}


export const initDataOnStartup =()=>{
    fetchData("darkThemeFlag") && themeTogglerHandler();
    fetchData("showingAddNotes") &&  showAddNotesPage() ;
    fetchData("showingNotes") && showNotesPage() ;
    initNotes();
}
