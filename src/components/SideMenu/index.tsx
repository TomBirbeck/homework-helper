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
            <span className="my-2">Hey {person.name} Welcome to your account menu</span>
            <div className="flex flex-col h-12">
            {person.Id && <span onClick={()=>{setOpenId(!openId)}}>Show Student Code v</span>}
            {openId && <span className="bg-black text-white">{person.Id}</span>}
            </div>
            <ThemeForm/>
        </aside>
    )
}

export default SideMenu