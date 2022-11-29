import {Link} from 'react-router-dom'

const LoginPage = () => {
    return (
        <div>
        <h1>Welcome to homework helper</h1>
        <Link to='student'>
        <button className="bg-green-300">Login as Child</button>
        </Link>
        <Link to='parent'>
        <button className="bg-red-500">Login as Parent</button>
        </Link>
        </div>
    )
}

export default LoginPage