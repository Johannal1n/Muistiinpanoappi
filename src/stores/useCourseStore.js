import { create } from "zustand"

export const useCourseStore = create((set, get) => ({
  courses: [],
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses")
      if (!response.ok) {
        throw new Error("Failed to fetch courses")
      }
      const data = await response.json()
      set({ courses: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error("Error fetching courses:", error)
    }
  },

  addCourse: (course) => {
    set((state) => ({
      courses: [...state.courses, course],
    }))
    // Tallennetaan kurssi myös local storageen varmuuden vuoksi
    const updatedCourses = [...get().courses]
    localStorage.setItem("courses", JSON.stringify(updatedCourses))
   // localStorage.setItem("courses", JSON.stringify(state.courses))
  },

  //init-funktio, joka lataa kurssit paikallisesti
  initCourses: () => {
    const storedCourses = localStorage.getItem("courses")
    if (storedCourses) {
      set({ courses: JSON.parse(storedCourses) }) //muuntaa tallennetun merkkijonon takaisin objektiksi ja päiv. Zustand-storen
    }
  },
}))

