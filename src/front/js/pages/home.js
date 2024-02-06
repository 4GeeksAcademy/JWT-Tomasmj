import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate  } from "react-router-dom"; //importar el useNavigate

export const Home = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate() //crear esto
	const [name, setName] = useState("")
	const [lastname, setlastName] = useState("")
	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("")

	const guardar = async (e) => { // la e es la misma del e.target.value
		e.preventDefault() //detiene el envio de la info
		let rsp = await actions.registro(name, lastname, email, password) // acceder a los actions del flux
		//aqui espera true
		console.log(rsp);
		if (rsp){
			navigate("/login") // or al login
		}
		setName("")
		setlastName("")
		setEmail("")
		setPassword("")
	}

	return (
		<div className="text-center mt-5 container">
			<h1>Registro</h1>
			<form>
				<div className="row">
					<div className="col">
						<div className="mb-3">
							<label for="exampleInputEmail1" className="form-label">Name</label>
							{/* crear value y pasarle name y crear onChange para capturar el name */}
							<input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
						</div>
					</div>
					<div className="col">
						<div className="mb-3">
							<label for="exampleInputEmail1" className="form-label">Lastname</label>
							<input value={lastname} onChange={(e) => setlastName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<div className="mb-3">
							<label for="exampleInputEmail1" className="form-label">Email address</label>
							<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
							<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
						</div>
					</div>
					<div className="col">
						<div className="mb-3">
							<label for="exampleInputPassword1" className="form-label">Password</label>
							<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
						</div>
					</div>
				</div>
				
				<button onClick={(e)=> guardar(e)} type="submit" className="btn btn-success">Register</button>
			</form>
		</div>
	);
};
