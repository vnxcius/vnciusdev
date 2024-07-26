import { Link } from "react-router-dom";
import LanguageSelector from "./components/languague-selector";

function App() {

  return (
    <>
      <header className="py-3">
        <nav className="max-w-xl flex mx-auto justify-between items-center">
          <Link to="/" className="text-xl font-medium tracking-wider">vncius</Link>
          <ul>
            <li>
              <LanguageSelector />
            </li>
          </ul>
        </nav>
      </header>
      <div></div>
    </>
  )
}

export default App