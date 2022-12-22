import { useState } from "react";
import LogoutButton from "../LogoutButton";
import ThemeForm from "../ThemeForm";


interface Props {
    name: String | undefined;
    Id?: String
}

const SideMenu = (person : Props) => {
const [openId, setOpenId] = useState(false)

    return (
        <aside className='flex flex-col h-screen fixed right-0 top-10 z-10 w-1/4 p-2 mb-1.5 bg-none backdrop-blur-md border-solid border-2 border-opacity-10 border-white rounded-lg text-white'>
            <LogoutButton/>
            <ThemeForm/>
            <span>{person.name}</span>
            {person.Id && <span onClick={()=>{setOpenId(!openId)}}>Show Student Code</span>}
            {openId && <span>{person.Id}</span>}
        </aside>
    )
}

export default SideMenu