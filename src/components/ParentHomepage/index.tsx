import { useEffect, useState } from "react"

const ParentHomepage = () => {

    const [api, setApi] = useState<Array<{task_id: Number,subject: String, topic: String, description: String, due:String, completed: Boolean, creator_id: Number}>>()

    useEffect( () => {
        async function dbTest(){
            const res = await fetch('https://homeworkhelper.onrender.com/student/1')
            const data = await res.json()
            setApi(data.payload)
        } 
        dbTest()
        },[])

        console.log(api)
    return (
        <>
        <h1>Hello from Parent Homepage</h1>
        {api?.map((data)=><div><p>{data.subject}</p><p>{data.topic}</p><p>{data.due}</p></div>)}
        </>
    )
}

export default ParentHomepage