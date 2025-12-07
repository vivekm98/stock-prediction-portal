import React,{useContext, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'

const Login = () => {
  const [username ,SetUsername] = useState('')
  const [password,SetPassword] = useState('')
  const [loading,Setloading] = useState(false)
  const navigate = useNavigate()
  const [error,setError] = useState('')
  const {IsLoggedin,setIsLoggedin} = useContext(AuthContext)
  const handleLogin = async (e) =>{
    Setloading(true)
    e.preventDefault();
    const userdata = {username,password}
    console.log(userdata)

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/',userdata)
      localStorage.setItem('accessToken',response.data.access)
      localStorage.setItem('refreshToken',response.data.refresh)
      console.log("login successfull")
      Setloading(true)
      setIsLoggedin(true)
      navigate('/')
    }catch(error){
      console.error("invalid credential")
      setError("invalid credential")
    }finally{
      Setloading(false)
    }
  }
  return (
     <>
     <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5 rounded">
          <h3 className='text-light text-center mb-4'>Login to our portal </h3>
          <form onSubmit={handleLogin}  action="">
            <div className='mb-3'>
               <input type="text" className='form-control mb-3' placeholder='Username' value={username} onChange={(e)=>SetUsername(e.target.value)} />
              
            </div>
            <div className='mb-3'>
              <input type="password" className='form-control' placeholder='Set Pasword' value={password} onChange={(e)=>SetPassword(e.target.value)} />
             
            </div>

            {error && <div className='text-danger text-center mb-3'>{error}</div> }
             
             {loading ? (
              <button type='submit' className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/>Loging in...</button>
             ):(
              <button type='submit' className='btn btn-info d-block mx-auto'>Login</button>
             )}
          </form>
        </div>
      </div>
     </div>
    </>
  )
}

export default Login