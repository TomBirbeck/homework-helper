import { useEffect, useState } from "react"

const ParentHomepage = () => {

    const [api, setApi] = useState<Array<[]>>()

    useEffect( () => {
        async function dbTest(){
            const res = await fetch('https://homeworkhelper.onrender.com/student')
                const data = await res.json()
                setApi(data.payload)
        } 
        dbTest()
        },[])

        console.log(api)
    return (
        <h1>Hello from Parent Homepage</h1>
    )
}

export default ParentHomepage