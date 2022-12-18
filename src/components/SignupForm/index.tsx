import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"

type UserProps = {
    email: String | undefined;
    child_id: Number;
    role: String
}

type SignUpIProps = {
  setPerson: React.Dispatch<React.SetStateAction<string>>
}

const SignupForm = ({setPerson} : SignUpIProps) => {
    const {user} = useAuth0()
    const [newUser, setNewUser] = useState({email: user?.email, child_id: 0, role: ''})
    
    const CreateUser = async (user: UserProps) => {
        if (user.role === 'student'){
            const newUser = {email: user.email}
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
              void setPerson('student')
        }
       else if (user.role === 'parent'){
            const newUser = {email: user.email, child_id: user.child_id}
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
    
    function handleChildId(e: any) {
        e.preventDefault();
        const input = e.target.value;
        setNewUser({...newUser, child_id: input});
      }    

    return (
        <form onSubmit={(e)=>{
            e.preventDefault()
            CreateUser(newUser)
            }}>
            <label htmlFor="email">
                Email
                <input type='email' defaultValue={user?.email}/>
            </label>
            <select name='role' onChange={handleAccountType} onBlur={handleAccountType}>
          <option value='initial'>
            Select account type
          </option>
          <option value='parent'>Parent</option>
          <option value='student'>Student</option>
          </select>
          <label htmlFor="surname">
                Child Id
                <input type='number'value={newUser.child_id} onChange={handleChildId} placeholder='Child Id is only require for parent accounts'/>
            </label>
          <button type="submit">Submit</button>
        </form>
    )
}

export default SignupForm