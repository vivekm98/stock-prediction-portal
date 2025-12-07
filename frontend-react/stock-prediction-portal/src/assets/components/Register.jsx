import React,{useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
  const [username ,SetUsername] = useState('')
  const [email,SetEmail] = useState('')
  const [password,SetPassword] = useState('')
  const [error,Seterror] = useState({})
  const [success,Setsuccess] = useState(false)
  const [loading,Setloading] = useState(false)
  const handelRegistration = async (e) => {
    Setloading(true)
    e.preventDefault();
    const userData = {
      username,email,password
    }
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/',userData)
      console.log('data=',response.data)
      console.log('successfull')
      Seterror({})
      Setsuccess(true)
    }catch(error){
      Seterror(error.response.data)
      console.error('registration error :',error.response.data)
    }finally{
      Setloading(false)
    }
    
  }
   return (
    <>
     <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5 rounded">
          <h3 className='text-light text-center mb-4'>Create an Account</h3>
          <form onSubmit={handelRegistration} action="">
            <div className='mb-3'>
               <input type="text" className='form-control mb-3' placeholder='Username' value={username} onChange={(e)=>SetUsername(e.target.value)} />
              <small>{error.username && <div className='text-danger'>{error.username}</div>}</small>
            </div>
            <div className='mb-3'>
               <input type="email" className='form-control' placeholder='Email' value={email} onChange={(e)=>SetEmail(e.target.value)} />
                <small>{error.email && <div className='text-danger'>{error.email}</div>}</small>
            </div>
            <div className='mb-3'>
              <input type="password" className='form-control' placeholder='Set Pasword' value={password} onChange={(e)=>SetPassword(e.target.value)} />
               <small>{error.password && <div className='text-danger'>{error.password}</div>}</small>
            </div>
              {success && <div className='alert alert-success'>Registration successfull</div> }
             {loading ? (
              <button type='submit' className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/>Please wait...</button>
             ):(
              <button type='submit' className='btn btn-info d-block mx-auto'>Register</button>
             )}
          </form>
        </div>
      </div>
     </div>
    </>
  )
}

export default Register