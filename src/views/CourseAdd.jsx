import { useEffect } from "react"
import CourseForm from "../CourseForm"
import { useCourseStore } from "../stores/useCourseStore"

function CourseAdd() {
  const fetchCourses = useCourseStore((state) => state.fetchCourses)
  const loading = useCourseStore((state) => state.loading)
  const error = useCourseStore((state) => state.error)
  const courses = useCourseStore((state) => state.courses)

  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses()
    }
  }, [fetchCourses, courses.length])

  if (loading) {
    return <div className="text-center p-4">Ladataan tietoja...</div>
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Virhe: {error}</div>
  }

  return (
    <div>
      <CourseForm />
    </div>
  )
}

export default CourseAdd

