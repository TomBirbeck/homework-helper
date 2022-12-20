import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"

type UserProps = {
    email: String | undefined;
    firstname: String;
    surname: String;
    child_id: String;
    role: String
}

type SignUpIProps = {
  setPerson: React.Dispatch<React.SetStateAction<string>>
}

const SignupForm = ({setPerson} : SignUpIProps) => {
    const {user} = useAuth0()
    const [newUser, setNewUser] = useState({email: user?.email, firstname: '', surname: '', child_id: '', role: ''})
    
    const CreateUser = async (user: UserProps) => {
        if (user.role === 'student'){
            const newUser = {email: user.email, firstname: user.firstname, surname: user.surname}
            let res = await fetch(
                `https://homeworkhelper.onrender.com/student`,
                // `http://localhost:3001/student`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newUser)
                }
              );
              let result = await res.json();
              console.log("result",result)
              void setPerson('student')
        }
       else if (user.role === 'parent'){
            const newUser = {email: user.email, firstname: user.firstname, surname: user.surname, child_id: user.child_id}
            let res = await fetch(
                `https://homeworkhelper.onrender.com/parent`,
                // `http://localhost:3001/parent`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newUser)
                }
              );
              let result = await res.json();
              setPerson('student')
        }
    }

    function handleAccountType(e: any) {
        e.preventDefault();
        const input = e.target.value;
        setNewUser({...newUser, role: input})
      }
    function handleFirstname(e: any) {
        e.preventDefault();
        const input = e.target.value;
        setNewUser({...newUser, firstname: input})
      }
    function handleSurname(e: any) {
        e.preventDefault();
        const input = e.target.value;
        setNewUser({...newUser, surname: input})
      }
    
    function handleChildId(e: any) {
        e.preventDefault();
        const input = e.target.value;
        setNewUser({...newUser, child_id: input});
      }    

    return (
        <form onSubmit={(e)=>{
            e.preventDefault()
            CreateUser(newUser)
            }}
            className='flex flex-col gap-2 w-1/2 bg-yellow-300'
            >
            <label htmlFor="email" className="flex flex-col mt-2">
                Email
                <input type='email' className="pl-2" defaultValue={user?.email}/>
            </label>
            <label htmlFor="firstname" className="flex flex-col">
                Firstname
                <input type='text' className="pl-2" value={newUser.firstname} onChange={handleFirstname}/>
            </label>
            <label htmlFor="surname" className="flex flex-col">
                Surname
                <input type='text' className="pl-2" value={newUser.surname} onChange={handleSurname}/>
            </label>
            <select name='role' onChange={handleAccountType} onBlur={handleAccountType} className="flex flex-col mt-2">
          <option value='initial'>
            Select account type
          </option>
          <option value='parent'>Parent</option>
          <option value='student'>Student</option>
          </select>
          <label htmlFor="studentCode" className="flex flex-col">
                Student Code (Parent account only)
                <input type='text' className="pl-2" value={newUser.child_id} onChange={handleChildId} placeholder="Please enter your Child's student code"/>
            </label>
          <button type="submit" className="border solid-2 border-black rounded-md w-1/2 self-center bg-green-500">Submit</button>
        </form>
    )
}

// 23f7872d-c4d5-4973-a8e9-26af69edfd8f

export default SignupForm