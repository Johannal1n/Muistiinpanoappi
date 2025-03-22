import { Link } from "react-router-dom";
import { SlNote } from "react-icons/sl";
import { RiHomeHeartLine } from "react-icons/ri";


//Nappulat lilana ja hooverilla sinistyy, linkitys toimii.
function Header() {
  return (
    <div> 
      {/* Lisätty ikoni otsikon eteen */}
        <h1 className="text-4xl font-bold mb-12 text-center flex justify-center items-center gap-2">
        <SlNote size={36} className="text-purple-500" /> Luentomuistiinpanoappi
      </h1>
      <nav className="flex space-x-4 justify-center mb-8"> {/*Lisätty home-ikoni etusivun eteen */}
        <Link className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2" to="/">
          <RiHomeHeartLine size={24} /> Etusivu
        </Link>
        <Link className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-blue-600 transition" to="/course-add">
          Lisää kurssi
        </Link>
        <Link className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-blue-600 transition" to="/note-add">
          Lisää muistiinpano kurssille
        </Link>
        <Link className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-blue-600 transition" to="/note-list">
          Selaa kurssien muistiinpanoja
        </Link>
      </nav>
    </div>
  );
}

export default Header;