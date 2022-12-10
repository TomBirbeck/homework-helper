import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <h1 className='font-bold text-white italic text-5xl my-36 text-center'>
        Welcome to homework helper
      </h1>
      <div className='min-h-screen flex justify-center align-middle gap-1'>
        <Link to='student'>
          <button className='bg-green-600'>Login as Student</button>
        </Link>
        <Link to='parent'>
          <button className='bg-red-600'>Login as Parent</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
