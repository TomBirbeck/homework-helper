import { useState, useEffect } from "react";
import {MdKeyboardArrowDown, MdEdit, MdSave} from 'react-icons/md'
import LogoutButton from "../LogoutButton";
import ThemeForm from "../ThemeForm";
import { artists } from "../../data/data";
import ThemeContext from "../../context/ThemeContext";

interface Props {
    firstname: string;
    surname: string;
    studentId?: String;
    parentId? : Number;
    email?: String;
}

const SideMenu = (person : Props) => {
const [openId, setOpenId] = useState(false)
const [openAccount, setOpenAccount] = useState(false)
const [openFirst, setOpenFirst] = useState(false)
const [openSur, setOpenSur] = useState(false)
const [newFirstname, setNewFirstname] = useState ({firstname: ''})
const [newSurname, setNewSurname] = useState ({surname: ''})
// const [openEmail, setOpenEmail] = useState(false)
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

  const handleFirstnameEdit = (e:any) => {
    e.preventDefault()
    setNewFirstname({...newFirstname, firstname: e.target.value})
  }
  const handleSurnameEdit = (e:any) => {
    e.preventDefault()
    setNewSurname({...newSurname, surname: e.target.value})
  }

  console.log(newFirstname, newSurname)

    return (
        <aside className='flex flex-col h-screen fixed right-0 top-10 z-10 w-1/4 p-2 mb-1.5 bg-none backdrop-blur-md border-solid border-2 border-opacity-10 border-white rounded-lg text-white'>
            <LogoutButton/>
            <span className="my-4">Hey {person.firstname} Welcome to your account menu</span>
            <div className="flex flex-col h-12 mb-2">
            {person.studentId && <span onClick={()=>{setOpenId(!openId)}} className='display flex flex-row items-center gap-1'>Show Student Code<MdKeyboardArrowDown/></span>}
            {openId && <span className="bg-black text-white">{person.studentId}</span>}
            </div>
            <div>
                <span onClick={()=>{setOpenAccount(!openAccount)}} className='grid grid-cols-2 mb-4'>Edit Account <MdEdit className="text-xl" onClick={()=>{setOpenAccount(!openAccount)}}/></span>
                {openAccount && 
                <div className="grid grid-col-1 gap-1">
                    <div className="grid grid-col-1">
                    <span>Firstname:</span>
                    {openFirst ? 
                    <div className="grid grid-cols-2">
                        <input type='text' placeholder={person.firstname} onChange={handleFirstnameEdit} className='text-black'></input>
                        <span><MdSave className="text-2xl" onClick={()=>{setOpenFirst(!openFirst)}}/></span>
                    </div> : 
                    <span className="grid grid-cols-2">{person.firstname}<MdEdit className="text-xl" onClick={()=> setOpenFirst(!openFirst)}/></span>}
                    </div>
                    <div className="grid grid-col-1">
                    <span>Surname:</span>
                    {openSur ? 
                    <div className="grid grid-cols-2">
                        <input type='text' placeholder={person.surname} onChange={handleSurnameEdit} className='text-black'></input>
                        <span><MdSave className="text-2xl" onClick={()=>{setOpenSur(!openSur)}}/></span>
                    </div> : 
                    <span className="grid grid-cols-2">{person.surname}<MdEdit className="text-xl" onClick={()=> setOpenSur(!openSur)}/></span>}
                    </div>
                    <span>Email:</span>
                    <span>{person.email}</span>
                </div>}
            </div>
            <ThemeForm/>
            <div className="h-1/2 flex items-end">
            <span><a href={picture.link} target='_blank' className="hover:text-blue-900">Picture by {picture.artist}</a></span>
            </div>
        </aside>
    )
}

export default SideMenu