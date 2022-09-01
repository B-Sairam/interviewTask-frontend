import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Constant';
import axios from 'axios'


const Home = () => {

  useEffect(()=>{
    getData();
  },[])
  const {user,setUser} = useContext(UserContext);
  const [popup,setPopup]=useState(false);
  const [loading,setLoading]= useState(false);
  const [name,setName]= useState();
  const [email,setEmail]= useState();
  const [mobile,setMobile]= useState();
  const [age,setAge]= useState();
  const [userList,setUserList]= useState([]);

  const navigate = useNavigate(""); 

  const Logout=()=>{
    localStorage.removeItem('kpr')
    setUser('');
    navigate('/')
  }

  const getData=async()=>{
    try {
      const {data} = await axios.get(`${BASE_URL}getUser`);
      setUserList(data.user)
    } catch (error) {
      
    }
  }

  const postHandeler = async()=>{
    setLoading(true);
    if(!name||!email||!mobile||!age){
      alert('Fill all the requirement');
      setLoading(false)
    }else{
      try {
        const config = {
          headers:{
            "Content-type":"application/json",
          }
        }
        await axios.post(`${BASE_URL}creatUser`,{name,email,mobile,age},config)
        alert('User created successfully')
      getData();
      setLoading(false)
      setPopup(false)
      } catch (error) {
        setLoading(false)
        alert(error.response.data);
      }
    }
  }
  return <>
  <div className='main'>
    <div className='head'>
      <h3 className='m-2'>{user.name}!!</h3>
      <div>
      <button className='btn btn-warning m-2' onClick={()=>setPopup(true)}>Add users +</button>
      <button className='btn btn-primary m-2' onClick={()=>Logout()}>Logout</button>
      </div>
      
    </div>
    {userList.length?<div className='user-list'>
      <h3 className='text-center mb-4'>Users List</h3>
    <table className='table table-hover text-center'>
        <thead>
            <tr >
                <th>Name</th>
                <th >Email</th>
                <th>Mobile No</th>
                <th>Age</th>
               
            </tr>
        </thead>
        <tbody>
        {
      userList.map((e)=>{
        return <tr key={e._id} className='apply-box'>
            <td>{e.name}</td>
            <td>{e.email}</td>
            <td>{e.mobile}</td>
            <td>{e.age}</td>
        </tr>
      }) 
    }
        </tbody>
    </table>
    </div>:<p className='text-center fs-3 mt-5'>User not Added in the list</p>}
   
  </div>

            {/* popup */}
  <div className={popup?'form-box':"disable"}>
    <div className='pop-head'>
      <h2 >Add user</h2>
      <button className='btn btn-danger' onClick={()=>setPopup(false)}><i class="fa-solid fa-x"></i></button>
    </div>
    <div className='form-body'>
    <div class="m-2">
      <label for="exampleFormControlInput1" class="form-label">Name</label>
      <input type="text" class="form-control" onChange={(e)=>setName(e.target.value)} id="exampleFormControlInput1" placeholder="User name"/>
    </div>
    <div class="m-2">
      <label for="exampleFormControlInput1" class="form-label">Email</label>
      <input type={'email'} class="form-control" onChange={(e)=>setEmail(e.target.value)}  id="exampleFormControlInput1" placeholder="Email address"/>
    </div>
    <div class="m-2">
      <label for="exampleFormControlInput1" class="form-label">Mobile</label>
      <input type="text" maxlength="10" class="form-control"onChange={(e)=>setMobile(e.target.value)}  id="exampleFormControlInput1" placeholder="Mobile number"/>
    </div>
    <div class="m-2">
      <label for="exampleFormControlInput1" class="form-label">Age</label>
      <input type={'number'}  class="form-control" onChange={(e)=>setAge(e.target.value)}  id="exampleFormControlInput1" placeholder='Your Age'/>
    </div>

    <div className='d-grid col-5 mx-auto mt-4'>
      <button className='btn btn-primary'onClick={()=>postHandeler()}>
      {loading? "Posting...":"Post"}
      </button>
    </div>
    </div>
  </div>
  </>
}

export default Home
