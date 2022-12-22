import { useContext } from "react"
import ThemeContext from "../../context/ThemeContext"

const ThemeForm = () => {

const [display, setDisplay] = useContext(ThemeContext)
 return (
<form className="text-black">
    <label htmlFor='theme' className="flex flex-col">
          Change Theme
          <select
            onChange={(e) => setDisplay(e.target.value)}
            onBlur={(e) => setDisplay(e.target.value)}
          >
            <option value=''>Default</option>
            <option value='boat'>Boat</option>
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