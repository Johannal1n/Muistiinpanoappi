import NoteList from "../components/NoteList"
import { useFetchCourses } from "../stores/useCourseStore"
import { useFetchNotes } from "../stores/useNoteStore"

//Storesta
function ListNotes() {
  const { loading: loadingCourses, error: coursesError } = useFetchCourses()
  const { loading: loadingNotes, error: notesError } = useFetchNotes()


  
  if (loadingCourses || loadingNotes) {
    return <div className="text-center p-4">Ladataan tietoja...</div>
  }
//Vähä virhekäsittelyä:
  if (coursesError || notesError) {
    return <div className="text-center p-4 text-red-500">Virhe: {coursesError || notesError}</div>
  }

  return (
    <div>
      <NoteList />
    </div>
  )
}

export default ListNotes

