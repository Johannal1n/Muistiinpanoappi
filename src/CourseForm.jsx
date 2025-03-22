import { useState } from "react"
import { useCourseStore } from "./stores/useCourseStore"

function CourseForm() { //lomake uuden kurssin lisäämsiseksi, tarvitaan: kurssin nimi, lomakelähetys, (storesista) kurssinlisäys Zustandista ja haetaan Zustandista lopuksi kaikki.
  const [courseName, setCourseName] = useState("")
  const [message, setMessage] = useState("")
  const addCourse = useCourseStore((state) => state.addCourse)
  const courses = useCourseStore((state) => state.courses)

  const handleSubmit = (e) => {
    e.preventDefault() //ei uudelleenlatausta
    if (courseName.trim() === "") { //tarkistus, onko tyhjä
      return //tyhjässä palautus ja lopetus
    }
//laskee edellisistä huomioiden uuden kurssin id, aloitus 0.
  const newId = courses.length ? courses.reduce((maxId, course) => Math.max(maxId, course.id), -1) + 1 : 0;
//reduce metodi palauttaa 1 arvon mm objekti.
    //Math.max ottaa kaikki id:t ja palauttaa suurimman niistä, toimi. Palauttaa newid 0, jos ei muita ole, muutoin järjestyksessään seuraavan suuremman id:n.

   // Ei toimi. const newId = courses.length > 0 ? courses[courses.length - 1].id + 1 : 0;



   //Uuden kurssin lisäys ja newid
    const newCourse = {
      id: newId,
      name: courseName.trim(), //trim poistaa ylimääräiset lyönnit. Ilman undifined.
    }

    addCourse(newCourse)
    setMessage(`Kurssi '${newCourse.name}' lisätty id:llä ${newCourse.id}`) //viesti, toimi.
    setCourseName("") //tyhjennä kenttä.
  }


//Kurssilisäys-lomakkeen renderöinti
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Lisää uusi kurssi</h2>

{/* //form käsittelee tapahtuma handleSubmit-funktion yllä */}
      <form onSubmit={handleSubmit} className="space-y-4"> 
        <div>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Syötä kurssin nimi"
          />
        </div>


{/* Sama sininen kuin headerin ylänapeissa ja pyöristys tarkastettu */}


        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Tallenna
        </button>
      </form>

      {message && <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">{message}</div>}


    </div>
  )
}

export default CourseForm

