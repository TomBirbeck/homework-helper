import { useContext } from "react"
import ThemeContext from "../../context/ThemeContext"

const ThemeForm = () => {

const [display, setDisplay] = useContext(ThemeContext)
 return (
<form className="text-white my-2">
    <label htmlFor='theme' className="flex flex-col">
          Change Page Theme
          <select
            className="text-white bg-black w-1/2"
            onChange={(e) => setDisplay(e.target.value)}
            onBlur={(e) => setDisplay(e.target.value)}
          >
            <option value=''>Default</option>
            <option value='stream'>Stream</option>
            <option value='universe'>Universe</option>
            <option value='ruin'>Ruin</option>
            <option value='tree'>Tree</option>
            <option value='aurora'>Aurora</option>
          </select>
        </label>
    </form>
 )
}

export default ThemeForm