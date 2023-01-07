import { useState, useEffect, ChangeEvent } from "react";
import {MdKeyboardArrowDown, MdEdit, MdSave, MdOutlineCancel} from 'react-icons/md'
import LogoutButton from "../LogoutButton";
import ThemeForm from "../ThemeForm";
import { artists } from "../../data/data";
import ThemeContext from "../../context/ThemeContext";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
    firstname: string;
    surname: string;
    studentId?: Number;
    parentId? : Number;
    studentCode?: string;
    email?: string;
}

const SideMenu = (person : Props) => {
const [openId, setOpenId] = useState(false)
const [openAccount, setOpenAccount] = useState(false)
const [openFirst, setOpenFirst] = useState(false)
const [openSur, setOpenSur] = useState(false)
const [newFirstname, setNewFirstname] = useState ({firstname: ''})
const [newSurname, setNewSurname] = useState ({surname: ''})
const [picture, setPicture] = useState({photo: '', artist: '', link: ''})
const [display, setDisplay] = useState<String | null>()
const theme = useState(ThemeContext)
const {user} = useAuth0()
const [accountUser, setAccountUser] = useState('')

    async function findStudent() {
      const checkStudent = await fetch(
        `https://homeworkhelper.onrender.com/student?email=${user?.email}`
      );
      const studentData = await checkStudent.json();
      if (studentData.payload.length > 0) {
       setAccountUser('student'); }
      }
      
      async function findParent() {
        const parentCheck = await fetch(
        `https://homeworkhelper.onrender.com/parent?email=${user?.email}`
        );
        const parentData = await parentCheck.json();
        if (parentData.payload.length > 0) {
        setAccountUser('parent');
      }
    }
  
      useEffect(()=>{
        findStudent()
        findParent()
      },[user])



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

  const handleFirstnameEdit = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNewFirstname({...newFirstname, firstname: e.target.value})
  }
  const handleSurnameEdit = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNewSurname({...newSurname, surname: e.target.value})
  }

  const patchUser = async (object:{}) => {
    // console.log("patch", object, accountUser)
    if (accountUser === 'student'){
        let res = await fetch(
            `https://homeworkhelper.onrender.com/student/${person.studentId}`,
            // `http://localhost:3001/student`,
            {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(object)
            }
          );
          let result = await res.json();
          // console.log("result",result)
          return result
    }
   else if (accountUser === 'parent'){
        let res = await fetch(
            `https://homeworkhelper.onrender.com/parent/${person.parentId}`,
            // `http://localhost:3001/parent`,
            {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(object)
            }
          );
          let result = await res.json();
          // console.log("result",result)
          return result
    }
}

const handleFirstnameSubmit = () => {
    patchUser(newFirstname)
    setOpenFirst(false)
    setNewFirstname({...newFirstname, firstname: ''})
}

const handleSurnameSubmit = () => {
    patchUser(newSurname)
    setOpenSur(false)
    setNewSurname({...newSurname, surname: ''})
}

    return (
        <aside className='flex flex-col h-screen fixed right-0 top-10 z-10 w-10/12 md:w-1/4 p-2 mb-1.5 bg-none backdrop-blur-md border-solid border-2 border-opacity-10 border-white rounded-lg text-white'>
            <div className="grid place-items-end">
            <LogoutButton/>
            </div>
            <span className="my-4">Hey {person.firstname}, Welcome to your account menu</span>
            <div className="flex flex-col h-12 mb-2">
            {person.studentCode && <span onClick={()=>{setOpenId(!openId)}} className='display flex flex-row items-center gap-1'>Show Student Code<MdKeyboardArrowDown/></span>}
            {openId && <span className="bg-black text-white">{person.studentCode}</span>}
            </div>
            <div>
                <span onClick={()=>{setOpenAccount(!openAccount)}} className='grid grid-cols-2 my-4 place-items-center'>Edit Account <MdEdit className="text-lg hover:text-green-600 hover:text-2xl" onClick={()=>{setOpenAccount(!openAccount)}}/></span>
                {openAccount && 
                <div className="grid grid-col-1 gap-1">
                    <div className="grid grid-col-1">
                    <span>Firstname:</span>
                    {openFirst ? 
                    <div className="grid grid-cols-2">
                        <input type='text' placeholder={person.firstname} onChange={handleFirstnameEdit} className='text-black'></input>
                        <span className="grid grid-cols-2 w-1/3"><MdSave className="text-2xl hover:text-green-600" onClick={handleFirstnameSubmit}/><MdOutlineCancel className="text-2xl hover:text-red-600" onClick={()=>{setOpenFirst(false)}}/></span>
                    </div> : 
                    <span className="grid grid-cols-2">{person.firstname}<MdEdit className="text-xl hover:text-green-600 hover:text-2xl" onClick={()=> setOpenFirst(!openFirst)}/></span>}
                    </div>
                    <div className="grid grid-col-1">
                    <span>Surname:</span>
                    {openSur ? 
                    <div className="grid grid-cols-2">
                        <input type='text' placeholder={person.surname} onChange={handleSurnameEdit} className='text-black'></input>
                        <span className="grid grid-cols-2 w-1/3"><MdSave className="text-2xl hover:text-green-600" onClick={handleSurnameSubmit}/><MdOutlineCancel className="text-2xl hover:text-red-600" onClick={()=>{setOpenSur(false)}}/></span>
                    </div> : 
                    <span className="grid grid-cols-2">{person.surname}<MdEdit className="text-xl hover:text-green-600 hover:text-2xl" onClick={()=> setOpenSur(!openSur)}/></span>}
                    </div>
                    <span>Email:</span>
                    <span>{person.email}</span>
                </div>}
            </div>
            <ThemeForm/>
            <div className="h-1/2 flex items-end">
            <span className="grid grid-cols-2 gap-1 text-sm md:text-base"><p>Background Image by</p><a href={picture.link} target='_blank' className="hover:text-blue-900 text-sm md:text-base">{picture.artist}</a></span>
            </div>
        </aside>
    )
}

export default SideMenu