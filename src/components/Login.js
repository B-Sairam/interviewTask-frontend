import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Constant';
import { UserContext } from '../Context';
 
const Login = () => {
  const {setUser} = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("kpr"));
    if(user){
      setUser(user);
      alert(`Welcome back ${user.name} !!`);
      navigate('/home');
      
    }
    // eslint-disable-next-line
  },[])

 // =========states==========
  const [password,setPassword]=useState();
  const [showPass,setShowPass]=useState(false);
  const [EmailPhone,setEmailPhone] = useState();
  const [loading,setLoading]=useState(false);

  function hidepassword(){
    if(showPass===true) setShowPass(false)
    else setShowPass(true)
  }

  let loginHandler=async()=>{
    console.log(EmailPhone);
    setLoading(true)
     if(!EmailPhone||!password){
     alert("Fill all the Fields")
    setLoading(false)
     }else{
      try {
         const config = {
           headers :{
            "Content-type":"application/json",
           }
         }
         const {data}= await axios.post(`${BASE_URL}login`,{EmailPhone,password},config);
        alert("Login Successfull")
         localStorage.setItem('kpr',JSON.stringify(data.user));
        const user = JSON.parse(localStorage.getItem('kpr'));
        setUser(user);
        console.log(user);
        setLoading(false)
        navigate('/home')

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
      <p className='title'>Login</p>
    
    <div className="form-floating mb-3">
    <input type={'text'} value={EmailPhone} className="form-control" id="floatingInput"onChange={(e)=>setEmailPhone(e.target.value)} placeholder="Email or Mobile"/>
    <label for="floatingInput">Email or Mobile</label>
    </div>
    <div class="form-floating">
    <input type={showPass?"text":"password"} value={password} className="form-control" id="floatingPassword" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
    <label for="floatingPassword">Password</label>
    </div>
    <div className=" d-flex flexDirection-row justify-content-between  pt-2">
       <div className='form-check'> <input className="form-check-input" type="checkbox" onClick={()=>hidepassword()} id="flexCheckDefault"/>
        &nbsp;<label className="form-check-label" for="flexCheckDefault">
          Show Password 
      </label></div>
      <Link to='/register'  className="text-primary">Create new account</Link>
      
   </div>
   <div className='d-grid col-5 mx-auto mt-4'>
      <button className='btn btn-primary'onClick={()=>loginHandler()}>
      {loading? "Loading...":"Login"}
    </button>
      </div>
    </div>
  </div>
  </>
}

export default Login;