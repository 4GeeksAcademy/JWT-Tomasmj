import React, { useState, useContext } from 'react'
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';



export const Login = () => {
  const { store, actions } = useContext(Context);
  //vrear los estados para almacenar la informacion 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const loggeo = async (e) => {
    e.preventDefault()
    //chequear si los campos estan vacios
    if (email != "" & password != "") {
      let respuesta = await actions.login(email, password)
      if (respuesta) {
        navigate("/protected")
      }
    } else {
        alert("Faltan datos");
    }
  }

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <br />
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
        </div>

        <button onClick={(e) => loggeo(e)} type="submit" className="btn btn-success">Login</button>
      </form>
    </div>
  )
}