import { create } from "zustand"

export const useNoteStore = create((set, get) => ({
  notes: [],
  sessionNotes: [],
  loading: false,
  error: null,

  fetchNotes: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("https://luentomuistiinpano-api.netlify.app/.netlify/functions/notes")
      if (!response.ok) {
        throw new Error("Failed to fetch notes")
      }
      const data = await response.json()
      set({ notes: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error("Error fetching notes:", error)
    }
  },

  addNote: (note) => {
    set((state) => ({
      notes: [...state.notes, note],
      sessionNotes: [...state.sessionNotes, note],
    }))
    // Tallennetaan muistiinpanot myös local storageen
    const updatedNotes = [...get().notes]
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
  },

  deleteNote: (noteId) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== noteId),
      sessionNotes: state.sessionNotes.filter((note) => note.id !== noteId),
    }))
    // Päivitetään local storage
    const updatedNotes = get().notes.filter((note) => note.id !== noteId)
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
  },

  clearSession: () => set({ sessionNotes: [] }),

  // Lisätään init-funktio, joka lataa muistiinpanot local storagesta
  initNotes: () => {
    const storedNotes = localStorage.getItem("notes")
    if (storedNotes) {
      set({ notes: JSON.parse(storedNotes) })
    }
  },
}))

