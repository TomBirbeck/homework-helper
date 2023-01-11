import { useAuth0 } from "@auth0/auth0-react"
import { ChangeEvent, useState } from "react"

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
              // console.log("result",result)
              void setPerson('student')
              return result
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
              return result
        }
    }

    function handleAccountType(e: ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        const input = e.target.value;
        setNewUser({...newUser, role: input})
      }
    function handleFirstname(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const input = e.target.value;
        setNewUser({...newUser, firstname: input})
      }
    function handleSurname(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const input = e.target.value;
        setNewUser({...newUser, surname: input})
      }
    
    function handleChildId(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const input = e.target.value;
        setNewUser({...newUser, child_id: input});
      }    

    return (
        <form onSubmit={(e)=>{
            e.preventDefault()
            CreateUser(newUser)
            }}
            className='flex flex-col gap-2 w-3/4 md:w-1/2 bg-teal-800 text-left mb-2'
            >
            <label htmlFor="email" className="flex flex-col mt-2">
                Email
                <input type='email' className="pl-2 text-black" defaultValue={user?.email}/>
            </label>
            <label htmlFor="firstname" className="flex flex-col">
                Firstname
                <input type='text' className="pl-2 text-black" value={newUser.firstname} onChange={handleFirstname}/>
            </label>
            <label htmlFor="surname" className="flex flex-col">
                Surname
                <input type='text' className="pl-2 text-black" value={newUser.surname} onChange={handleSurname}/>
            </label>
            <select name='role' onChange={handleAccountType} onBlur={handleAccountType} className="flex flex-col mt-2 text-black">
          <option value='initial'>
            Select account type
          </option>
          <option value='parent'>Parent</option>
          <option value='student'>Student</option>
          </select>
          <label htmlFor="studentCode" className="flex flex-col">
                Student Code (Parent account only)
                <input type='text' className="pl-2 text-black" value={newUser.child_id} onChange={handleChildId} placeholder="Please enter your Child's student code"/>
            </label>
          <button type="submit" className="border solid-2 border-white rounded-md w-1/2 self-center bg-green-300 hover:bg-green-600 text-white">Submit</button>
        </form>
    )
}

export default SignupForm