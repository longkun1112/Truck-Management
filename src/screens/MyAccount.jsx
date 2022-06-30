import React, { useEffect, useState } from 'react';
import './MyAccount.css';
import axios from 'axios';

const MyAccount = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    await axios.get('http://localhost:8000/users')
    .then(function (response) {
      console.log(response.data);
      setUsers(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    getUsers();
    console.log('test', users)
  }, [])
  return (
    <>
    <div className='body'>
      {users.length > 0 ? 
        (<>
          {users.map((user) =>
            (
              <div className='card'>
                <div className='imgBx'>
                  <img src={user.image !== '' ? user.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPSLHeCARXVSGgCgQNk43vrya5cinr6McfmARLozzMg&s'}/>
                </div>
                <div className='content'>
                  <div className='details'>
                    <h2>{user.name}<br></br><span>{user.role}</span></h2>
                  <div className='data'>
                    <h3>Email<br></br><span>{user.email}</span></h3>
                    <h3>Date of Birth<br></br><span> {user.dob} </span></h3>
                  </div>
                  <div className='actionBtn'>
                    <button> Detail </button>
                    <button> Profile </button>
                  </div>
                  </div>
                </div>
              </div>
            )
            ) 
          }
        </>)
        :
        (
          <>
            123
          </>
        )
      }
    </div>
    </>
  )
}

export default MyAccount