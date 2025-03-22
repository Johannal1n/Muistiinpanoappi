import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./styles/index.css"
import { BrowserRouter } from "react-router-dom"
import "./styles/index.css"
import { useCourseStore } from "./stores/useCourseStore"
import { useNoteStore } from "./stores/useNoteStore"

// Alustetaan tiedot paikallisesti
const initializeData = () => {
  const courseStore = useCourseStore.getState()
  const noteStore = useNoteStore.getState()

  //Lataa kurssit sekä muistiinpanot
  if (courseStore.initCourses) courseStore.initCourses()
  if (noteStore.initNotes) noteStore.initNotes()

    //Hakee tiedot, kurssit sekä muistiinpanot
  courseStore.fetchCourses()
  noteStore.fetchNotes()
}

//Alustuskutsut
initializeData()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

