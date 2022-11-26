import { useState } from "react"

const NewTaskForm = () => {
    const [subject, setSubject] = useState('')
    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')
    const [due, setDue] = useState('')

    const handleSubmit = () => {
        console.log(subject, topic, description, due)
    }

    return (
        <div>
            Add new homework task
        <form
        onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        className="grid grid-cols-5 border-solid border-4 border-black space-around"
        >
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
                <input type='text'
                className="border-solid border-2 border-grey-700 w-24"
                value={topic}
                placeholder='topic'
                onChange={(e) => setTopic(e.target.value)}
                ></input>
            </label>
            <label htmlFor="description" className="flex gap-1">
                Description:
                <input type='text'
                className="border-solid border-2 border-grey-700 w-24"
                value={description}
                placeholder='description'
                onChange={(e) => setDescription(e.target.value)}
                ></input>
            </label>
            <label htmlFor="date" className="flex gap-1">
                Due:
                <input type='date'
                className="border-solid border-2 border-grey-700 w-32"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                ></input>
            </label>
            <button className="bg-green-400 w-24 border-solid border-2 border-black" type="submit">Submit</button>
        </form>
        </div>
    )
}

export default NewTaskForm