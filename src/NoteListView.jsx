import { useState, useEffect } from "react"
import { useCourseStore } from "./stores/useCourseStore"
import { useNoteStore } from "./stores/useNoteStore"
import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";


function NoteListView() {
  const [filterCourseId, setFilterCourseId] = useState("")
  const courses = useCourseStore((state) => state.courses)
  const { notes, deleteNote } = useNoteStore()

  //Valittu kurssi, vain nämä mp:t, muutoin kaikki.
  const filteredNotes = filterCourseId
    ? notes.filter((note) => note.course.id === Number.parseInt(filterCourseId))
    : notes

  const handleDeleteNote = (noteId) => { //poistaa ja kytkös id.
    deleteNote(noteId)
  }


  //päiväysmerkintä, toimi.
  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleString("fi-FI")
  }

 
  if (courses.length === 0 && notes.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Muistiinpanot</h2>
        <div className="p-4 bg-gray-100 rounded-md text-center">Ladataan...</div>
      </div>
    )
  }


  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Muistiinpanot</h2>
        <div className="p-4 bg-gray-100 rounded-md text-center">Ei kursseja saatavilla!</div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Muistiinpanot</h2>

      <div className="mb-6"> 
        <label htmlFor="filterCourse" className="block text-sm font-medium text-gray-700 mb-1">
          Valitse alta haluamasi kurssi
        </label>
        <select
          id="filterCourse"
          value={filterCourseId}
          onChange={(e) => setFilterCourseId(e.target.value)}
          className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Kaikki kurssit</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {filteredNotes.length > 0 ? (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div key={note.id} className="p-4 bg-gray-100 rounded-lg border border-gray-300 relative">
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                
              >
                <MdOutlineDeleteForever size={24} /> {/*Roskis-ikoni lisätty */}
              </button>


              <p className="mb-2 text-lg">{note.text}</p>

              <div className="text-sm text-gray-600">
                <p>
                  Kurssi: {note.course.name} (ID: {note.course.id})
                </p>
                <p>Tallennettu: {formatDate(note.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 bg-gray-100 rounded-md text-center">Ei muistiinpanoja!</div>
      )}
    </div>
  )
}

export default NoteListView;
