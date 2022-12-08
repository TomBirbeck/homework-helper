import { useEffect, useState } from "react"

const ParentHomepage = () => {

    const [student, setStudent] = useState<Number>(0)
    const [parent, setParent] = useState<{firstname:String, surname:String, childId:Number}>({firstname:"", surname:"", childId:0})
    const [api, setApi] = useState<Array<{task_id: Number,subject: String, topic: String, description: String, due:String, completed: Boolean, creator_id: Number}>>()

    useEffect(() =>{
       
        async function getStudent() {

                const res = await fetch('https://homeworkhelper.onrender.com/parent/2')
                const data = await res.json()
                setStudent(data.payload[0].child_id)
                setParent({firstname: data.payload[0].firstname, surname: data.payload[0].surname, childId: data.payload[0].child_id})
            
        }
        getStudent()
    },[])
    console.log(student)
    console.log(parent)

    useEffect( () => {
        async function getTasks(){
            if (parent.childId > 0) {
                const res = await fetch(`https://homeworkhelper.onrender.com/student/tasks/${parent.childId}`)
                const data = await res.json()
                setApi(data.payload)
            }
        } 
        getTasks()
        },[student])

        console.log(api)
    return (
        <>
        <h1>Hello {parent.firstname}</h1>
        {api &&<h2>Here are the tasks your child currently has on file</h2>}
        {api?.map((data)=><div className="bg-red-200 gap-2 mb-2"><p>{data.subject}</p><p>{data.topic}</p><p>{data.due}</p></div>)}
        </>
    )
}

export default ParentHomepage