import React, {useState, useContext} from 'react'
import { Context } from "../store/appContext";



export const Login = () => {
  const { store, actions } = useContext(Context);
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")

  const loggeo = (e) => {
    e.preventDefault()
    actions.login(email, password)

  }

    return(
      <div className="container">
        <h1 className="text-center">Login</h1>
        <br/>
        <form>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
      <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  
  <button onClick={(e) => loggeo(e)} type="submit" className="btn btn-success">Login</button>
</form>
</div>
    )
}