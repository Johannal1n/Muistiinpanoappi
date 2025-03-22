import { useEffect } from "react"
import NoteForm from "../NoteForm"
import { useCourseStore } from "../stores/useCourseStore"
import { useNoteStore } from "../stores/useNoteStore"

//https://github.com/pmndrs/zustand
function NoteAdd() {
  const fetchCourses = useCourseStore((state) => state.fetchCourses)
  const courses = useCourseStore((state) => state.courses)
  const loadingCourses = useCourseStore((state) => state.loading)
  const coursesError = useCourseStore((state) => state.error)

  const fetchNotes = useNoteStore((state) => state.fetchNotes)
  const notes = useNoteStore((state) => state.notes)
  const loadingNotes = useNoteStore((state) => state.loading)
  const notesError = useNoteStore((state) => state.error)

  useEffect(() => {
    // Lataa kurssit ja muistiinpanot vain jos niitä ei ole vielä ladattu, ks NoteList
    if (courses.length === 0) {
      fetchCourses()
    }
    if (notes.length === 0) {
      fetchNotes()
    }
  }, [fetchCourses, fetchNotes, courses.length, notes.length])

  if (loadingCourses || loadingNotes) {
    return <div className="text-center p-4">Ladataan tietoja...</div>
  }

  if (coursesError || notesError) {
    return <div className="text-center p-4 text-red-500">Virhe: {coursesError || notesError}</div>
  }

  return (
    <div>
      <NoteForm />
    </div>
  )
}

export default NoteAdd

