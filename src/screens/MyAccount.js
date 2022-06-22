import React from 'react';
import './MyAccount.css';

const MyAccount = () => {
  return (
    <>
    <div className='body'>
      <div className='card'>
        <div className='imgBx'>
          <img src={require('../imgs/jean-genshin.jpg')}/>
        </div>
        <div className='content'>
          <div className='details'>
            <h2>Lisa<br></br><span>Admin</span></h2>
          <div className='data'>
            <h3>Email<br></br><span>lisa@genshin.com</span></h3>
            {/* <h3>Phone<br></br><span>0828123456</span></h3> */}
            <h3>Date of Birth<br></br><span> Jun 09 </span></h3>
          </div>
          <div className='actionBtn'>
            <button> Detail </button>
            <button> Profile </button>
          </div>
          </div>
        </div>
      </div>
      <div className='card'>
        <div className='imgBx'>
          <img src={require('../imgs/lisa-genshin.jpg')}/>
        </div>
        <div className='content'>
          <div className='details'>
            <h2>Jean<br></br><span>Admin</span></h2>
          <div className='data'>
            <h3>Email<br></br><span>jean@genshin.com</span></h3>
            {/* <h3>Phone<br></br><span>0828123456</span></h3> */}
            <h3>Date of Birth<br></br><span>March 14</span></h3>
          </div>
          <div className='actionBtn'>
            <button> Detail </button>
            <button> Profile </button>
          </div>
          </div>
        </div>
      </div>
      <div className='card'>
        <div className='imgBx'>
          <img src={require('../imgs/genshin.jpg')}/>
        </div>
        <div className='content'>
          <div className='details'>
            <h2>Mihoyo<br></br><span>Operator</span></h2>
          <div className='data'>
            <h3>Email<br></br><span>mihoyo@genshin.com</span></h3>
            {/* <h3>Phone<br></br><span>0828123456</span></h3> */}
            <h3>Date of Birth<br></br><span>09 Jun</span></h3>
          </div>
          <div className='actionBtn'>
            <button> Detail </button>
            <button> Profile </button>
          </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default MyAccount