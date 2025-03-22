import { Routes, Route, Outlet } from "react-router-dom"
import Header from "./Header"
import "./styles/App.css"
import Home from "./views/Home"
import CourseAdd from "./views/CourseAdd"
import NoteAdd from "./views/NoteAdd"
import NoteList from "./views/NoteList"
import Footer from "./Footer"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/course-add" element={<CourseAdd />} />
          <Route path="/note-add" element={<NoteAdd />} />
          <Route path="/note-list" element={<NoteList />} />
        </Route>
      </Routes>
    </div>
  )
}

function Layout() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App

