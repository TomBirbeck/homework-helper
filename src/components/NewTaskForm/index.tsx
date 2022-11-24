import { useState } from "react"

const NewTaskForm = () => {
    const [subject, setSubject] = useState<String>()

    return (
        <div>
            Add new homework task
        <form className="grid grid-cols-5 border-solid border-4 border-black space-around">
            <label htmlFor="subject" className="flex gap-1">
                Subject:
                <input
                type='text'
                className="border-solid border-2 border-grey-700 w-24"
                value={subject}
                placeholder='subject'
                onChange={(e) => setSubject(e.target.value)}
                ></input>
            </label>
            <label htmlFor="topic" className="flex gap-1">
                Topic:
                <input type='text' className="border-solid border-2 border-grey-700 w-24"></input>
            </label>
            <label htmlFor="description" className="flex gap-1">
                Description:
                <input type='text' className="border-solid border-2 border-grey-700 w-24"></input>
            </label>
            <label htmlFor="date" className="flex gap-1">
                Due:
                <input type='date' className="border-solid border-2 border-grey-700 w-32"></input>
            </label>
            <button className="bg-green-400 w-24 border-solid border-2 border-black">Submit</button>
        </form>
        </div>
    )
}

export default NewTaskForm