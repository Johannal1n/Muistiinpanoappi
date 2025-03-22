import { useState, useEffect } from "react"
import { useCourseStore } from "./stores/useCourseStore"
import { useNoteStore } from "./stores/useNoteStore"
import { useNavigate } from "react-router-dom"

function NoteForm() { //muistiinpanoihin: notetext, ja oikea kurssiid, istunnon lukitus vaatimuksina. Käytä usestate.
  const [noteText, setNoteText] = useState("")
  const [selectedCourseId, setSelectedCourseId] = useState("")
  const [sessionLocked, setSessionLocked] = useState(false)

  const courses = useCourseStore((state) => state.courses)
  const { addNote, sessionNotes, clearSession } = useNoteStore()
  const navigate = useNavigate()


  
  useEffect(() => { 
    if (courses.length === 0) {
      navigate("/course-add")//navikoi lisäykseen, jos ei ole kursseja
    }
  }, [courses, navigate])


  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (noteText.trim() === "" || (!sessionLocked && selectedCourseId === "")) {
      return
    }

    const courseId = sessionLocked ? sessionNotes[0].course.id : Number.parseInt(selectedCourseId)
    const course = courses.find((c) => c.id === courseId)

    if (!course) return


    //Aikaleima 
    const timestamp = new Date().toISOString()
    const newNote = {
      id: Date.now(), 
      text: noteText.trim(),
      course: course,
      timestamp: timestamp,
    }

    addNote(newNote)
    setNoteText("")


    if (!sessionLocked) {
      setSessionLocked(true)
      setSelectedCourseId(courseId.toString())
    }
  }

  const handleNewSession = () => {
    clearSession()
    setSessionLocked(false)
    setSelectedCourseId("")
  }

  if (courses.length === 0) {
    return <div>Ladataan...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Lisää muistiinpano valitulle kurssille</h2>
        {sessionLocked && (
          <button
            onClick={handleNewSession}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300"
          >
            Aloita uusi muistiinpano kurssille
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!sessionLocked ? (
          <div>

            <select
              id="courseSelect"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            > {/* Oletusarvo, kun ei mitää valittua, Mapattu kurssit*/}
              <option value="">Valitse kurssi</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        ) : ( //find etsii kurssin joka vastaa valittua id:tä (intinä)
          <div className="p-3 bg-blue-100 text-blue-800 rounded-md">
            Muistiinpanon lisääminen kurssiin: {courses.find((c) => c.id === Number.parseInt(selectedCourseId))?.name}
          </div> //täytyy olla ?-merkki namen edessä, estää kaatumisen.
        )}

        <div>

          <textarea
            id="noteText"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
            placeholder="Kirjoita muistiinpano"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Tallenna
        </button>
      </form>

      {sessionNotes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Tämän kurssin muistiinpanot:</h3>
          <div className="space-y-2">
            {sessionNotes.map((note) => (
              <div key={note.id} className="p-3 bg-gray-100 rounded-md">
                {note.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteForm

