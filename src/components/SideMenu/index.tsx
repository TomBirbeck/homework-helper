import { useState, useEffect } from "react";
import {MdKeyboardArrowDown} from 'react-icons/md'
import LogoutButton from "../LogoutButton";
import ThemeForm from "../ThemeForm";
import { artists } from "../../data/data";
import ThemeContext from "../../context/ThemeContext";

interface Props {
    firstname?: String;
    surname?: String;
    studentId?: String;
    parentId? : Number;
    email?: String;
}

const SideMenu = (person : Props) => {
const [openId, setOpenId] = useState(false)
const [picture, setPicture] = useState({photo: '', artist: '', link: ''})
const [display, setDisplay] = useState<String | null>()
const theme = useState(ThemeContext)

const findPictureDetails = (arr: {photo: string, artist: string, link: string}[]) => {
for (let i = 0; i < arr.length; i++ ){
    if (arr[i].photo === display){
        setPicture(arr[i])
    }
}   }

useEffect(()=>{
    setDisplay(localStorage.getItem('Theme'))
    findPictureDetails(artists)
  },[theme])

    return (
        <aside className='flex flex-col h-screen fixed right-0 top-10 z-10 w-1/4 p-2 mb-1.5 bg-none backdrop-blur-md border-solid border-2 border-opacity-10 border-white rounded-lg text-white'>
            <LogoutButton/>
            <span className="my-4">Hey {person.firstname} Welcome to your account menu</span>
            <div className="flex flex-col h-12">
            {person.studentId && <span onClick={()=>{setOpenId(!openId)}} className='display flex flex-row items-center gap-1'>Show Student Code<MdKeyboardArrowDown/></span>}
            {openId && <span className="bg-black text-white">{person.studentId}</span>}
            </div>
            <ThemeForm/>
            <div className="h-1/2 flex items-end">
            <span><a href={picture.link} target='_blank' className="hover:text-blue-900">Picture by {picture.artist}</a></span>
            </div>
        </aside>
    )
}

export default SideMenu