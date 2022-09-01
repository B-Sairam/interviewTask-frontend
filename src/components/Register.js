import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Constant';
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();  

 // =========states==========
  const [name,setName] = useState();
  const [email,setEmail]=useState();
  const[mobile,setMobile] = useState();
  const [password,setPassword]=useState();
  const [rePassword,setRepassword]=useState();
  const [loading,setLoading]=useState(false);


  let loginHandler=async()=>{
    
    setLoading(true)
     if(!email||!password||!rePassword||!name||!mobile){
      alert("Fill all the Fields")
      setLoading(false)
     }else if(!email.includes('@')){
      alert("Enter valid email address")
    setLoading(false)
     }else if(password!==rePassword){
      alert("Password not matched")
    setLoading(false)
     }else{
      try {
         const config = {
           headers :{
            "Content-type":"application/json",
           }
         }
        await axios.post(`${BASE_URL}reg`,{name,email,mobile,password},config);
         alert("Account created successfull")
        setLoading(false)
        navigate('/')

       } catch (error) {
        setLoading(false)
        console.log(error.response.data);
        alert(error.response.data)
         
       }
     }
  }
  return <>
  <div className='container'>
    <div className='login-box'>
      <p className='title'>Register</p>
      <div className="form-floating mb-3">
    <input type={'email'} value={name} className="form-control" id="floatingName"onChange={(e)=>setName(e.target.value)} placeholder="Name" />
    <label for="floatingName">Name</label>
    </div>
    <div className="form-floating mb-3">
    <input type={'email'} value={email} className="form-control" id="floatingInput"onChange={(e)=>setEmail(e.target.value)} placeholder="Email address" />
    <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating mb-3">
    <input type={'text'} value={mobile} maxlength="10" className="form-control" id="floatingInput"onChange={(e)=>setMobile(e.target.value)} placeholder="Mobile Number" />
    <label for="floatingInput">Mobile Number</label>
    </div>
    <div class="form-floating mb-3">
    <input type={"text"} value={password} className="form-control" id="floatingPassword" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
    <label for="floatingPassword">Password</label>
    </div>
    <div class="form-floating mb-3">
    <input type={"text"} value={rePassword} className="form-control" id="floatingrPassword" onChange={(e)=>setRepassword(e.target.value)}placeholder="Confirm Password" />
    <label for="floatingrPassword">Confirm Password</label>
    </div>
   <div className='d-grid col-5 mx-auto mt-4'>
      <button className='btn btn-primary'onClick={()=>loginHandler()}>
      {loading? "Loading...":"Register"}
    </button>
      </div>
      <Link to='/'><p className='mt-3 text-primary'>Already Have an account?</p></Link>
    </div>
  </div>
  </>
}

export default Register;