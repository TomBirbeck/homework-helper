import { useState, useEffect, ChangeEvent } from 'react';
import {
  MdKeyboardArrowDown,
  MdEdit,
  MdSave,
  MdOutlineCancel,
  MdOutlineContentCopy,
} from 'react-icons/md';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import LogoutButton from '../LogoutButton';
import ThemeForm from '../ThemeForm';
import { artists } from '../../data/data';
import ThemeContext from '../../context/ThemeContext';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  firstname: string;
  surname: string;
  studentId?: Number;
  parentId?: Number;
  studentCode: string;
  email?: string;
}

const SideMenu = (person: Props) => {
  const [openId, setOpenId] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [openFirst, setOpenFirst] = useState(false);
  const [openSur, setOpenSur] = useState(false);
  const [newFirstname, setNewFirstname] = useState({ firstname: '' });
  const [newSurname, setNewSurname] = useState({ surname: '' });
  const [picture, setPicture] = useState({ photo: '', artist: '', link: '' });
  const [display, setDisplay] = useState<String | null>();
  const theme = useState(ThemeContext);
  const { user } = useAuth0();
  const [accountUser, setAccountUser] = useState('');

  async function findStudent() {
    const checkStudent = await fetch(
      `https://homeworkhelper.onrender.com/student?email=${user?.email}`
    );
    const studentData = await checkStudent.json();
    if (studentData.payload.length > 0) {
      setAccountUser('student');
    }
  }

  async function findParent() {
    const parentCheck = await fetch(
      `https://homeworkhelper.onrender.com/parent?email=${user?.email}`
    );
    const parentData = await parentCheck.json();
    if (parentData.payload.length > 0) {
      setAccountUser('parent');
    }
  }

  useEffect(() => {
    findStudent();
    findParent();
  }, [user]);

  const findPictureDetails = (
    arr: { photo: string; artist: string; link: string }[]
  ) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].photo === display) {
        setPicture(arr[i]);
      }
    }
  };

  useEffect(() => {
    setDisplay(localStorage.getItem('Theme'));
    findPictureDetails(artists);
  }, [theme]);

  const handleFirstnameEdit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewFirstname({ ...newFirstname, firstname: e.target.value });
  };
  const handleSurnameEdit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewSurname({ ...newSurname, surname: e.target.value });
  };

  const patchUser = async (object: {}) => {
    // console.log("patch", object, accountUser)
    if (accountUser === 'student') {
      let res = await fetch(
        `https://homeworkhelper.onrender.com/student/${person.studentId}`,
        // `http://localhost:3001/student`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(object),
        }
      );
      let result = await res.json();
      // console.log("result",result)
      return result;
    } else if (accountUser === 'parent') {
      let res = await fetch(
        `https://homeworkhelper.onrender.com/parent/${person.parentId}`,
        // `http://localhost:3001/parent`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(object),
        }
      );
      let result = await res.json();
      // console.log("result",result)
      return result;
    }
  };

  const handleFirstnameSubmit = () => {
    patchUser(newFirstname);
    setOpenFirst(false);
    setNewFirstname({ ...newFirstname, firstname: '' });
  };

  const handleSurnameSubmit = () => {
    patchUser(newSurname);
    setOpenSur(false);
    setNewSurname({ ...newSurname, surname: '' });
  };

  return (
    <aside
      aria-label='aside sidebar menu'
      className='flex flex-col h-screen fixed right-0 top-11 z-10 w-10/12 md:w-1/4 p-2 mb-1.5 bg-none backdrop-blur-md border-solid border-2 border-opacity-10 border-white rounded-lg text-white'
    >
      <div className='grid place-items-end'>
        <LogoutButton />
      </div>
      <span aria-label='aside header' className='my-4'>
        Hey {person.firstname}, Welcome to your account menu
      </span>
      <div className='flex flex-col h-12 mb-2'>
        {person.studentCode && (
          <button
            aria-label='open student code span'
            onClick={() => {
              setOpenId(!openId);
            }}
            className='display flex flex-row items-center gap-1'
          >
            Show Student Code
            <MdKeyboardArrowDown />
          </button>
        )}
        {openId && (
          <div
            aria-label='student code'
            className='grid grid-cols-6 place-items-center'
          >
            <span className='text-xs md:text-sm col-span-5 bg-black text-white'>
              {person.studentCode}
            </span>
            <CopyToClipboard text={person.studentCode}>
              <MdOutlineContentCopy className='md:text-lg hover:text-xl' />
            </CopyToClipboard>
          </div>
        )}
      </div>
      <div>
        <div
          aria-label='edit account text'
          className='grid grid-cols-3 place-items-center'
        >
          <span>Edit Account</span>{' '}
          <button aria-label='edit account icon'
           onClick={() => {
            setOpenAccount(!openAccount);
          }}
          >
          <MdEdit className='text-xl hover:text-green-600 hover:text-2xl'/>
          </button>
        </div>
        {openAccount && (
          <div className='grid grid-col-1 mt-2 pl-1 md:pl-2'>
            <div className='grid grid-col-1'>
              <span aria-label='firstname label'>Firstname:</span>
              {openFirst ? (
                <div className='grid grid-cols-2'>
                  <input
                    aria-label='firstname input'
                    type='text'
                    placeholder={person.firstname}
                    onChange={handleFirstnameEdit}
                    className='text-black'
                  ></input>
                  <span className='grid grid-cols-2 w-1/3'>
                    <button
                       aria-label='save firstname icon'
                       onClick={handleFirstnameSubmit}
                    >
                    <MdSave
                      className='text-2xl hover:text-green-600'
                    />
                    </button>
                    <button
                     aria-label='cancel edit firstname icon'
                     onClick={() => {
                       setOpenFirst(false);
                     }}
                    >
                    <MdOutlineCancel
                      className='text-2xl hover:text-red-600'
                    />
                    </button>
                  </span>
                </div>
              ) : (
                <span aria-label='first name text' className='grid grid-cols-2'>
                  {person.firstname}
                  <button
                  aria-label='edit firstname icon'
                  onClick={() => setOpenFirst(!openFirst)}
                  >
                  <MdEdit
                    className='text-xl hover:text-green-600 hover:text-2xl'
                  />
                  </button>
                </span>
              )}
            </div>
            <div className='grid grid-col-1'>
              <span aria-label='surname label'>Surname:</span>
              {openSur ? (
                <div className='grid grid-cols-2'>
                  <input
                    aria-label='edit surname input'
                    type='text'
                    placeholder={person.surname}
                    onChange={handleSurnameEdit}
                    className='text-black'
                  ></input>
                  <span className='grid grid-cols-2 w-1/3'>
                    <button
                    aria-label='save edit surname icon'
                    onClick={handleSurnameSubmit}
                    >
                    <MdSave
                      className='text-2xl hover:text-green-600'
                    />
                    </button>
                    <button
                     aria-label='cancel edit surname icon'
                     onClick={() => {
                       setOpenSur(false);
                     }}
                    >
                    <MdOutlineCancel
                      className='text-2xl hover:text-red-600'
                    />
                    </button>
                  </span>
                </div>
              ) : (
                <span aria-label='surname text' className='grid grid-cols-2'>
                  {person.surname}
                  <button
                   aria-label='edit surname icon'
                   onClick={() => setOpenSur(!openSur)}
                  >
                  <MdEdit
                    className='text-xl hover:text-green-600 hover:text-2xl'
                  />
                  </button>
                </span>
              )}
            </div>
            <span aria-label='email label'>Email:</span>
            <span aria-label='email text'>{person.email}</span>
          </div>
        )}
      </div>
      <ThemeForm />
      <div className='h-1/2 flex items-end'>
        <span
          aria-label='background image information area'
          className='grid grid-cols-2 gap-1 text-sm md:text-base'
        >
          <p>Background Image by</p>
          <a
            href={picture.link}
            target='_blank'
            className='hover:text-blue-900 text-sm md:text-base'
          >
            {picture.artist}
          </a>
        </span>
      </div>
    </aside>
  );
};

export default SideMenu;
