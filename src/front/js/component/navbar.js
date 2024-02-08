import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const{actions, store} = useContext(Context)
	//variables para ocultar el boton
	const[ver, setVer] = useState("invisible")
	const[visible, setVisible ] = useState("invisible")
	const navigate = useNavigate()

	useEffect(()=>{
		if(store.auth){ // si esta verdadero 
			setVer("invisible") // oculta el boton de login
			setVisible("visible")//muestra el boton de logout el usuario esta loggeado
		}else{
			setVer("visible") // muestra el boton de login
			setVisible("invisible") // oculta el boton de logout
		} 
	},[store.auth]) // esta atento a lo que pasa con el store.auth

	function logout() {
		actions.logout() // rompe el token
		navigate("/") // lleva al home
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">	
				<Link to="/login">									
											{/*  acttualizaer el estado, inicia invisble, clase dinamica */}
					<button  className={"btn btn-outline-success " + ver}>Login</button>
				</Link>
					<button onClick={()=>logout()} className={"btn btn-outline-danger " + visible }>Logout</button>
				
				</div>
			</div>
		</nav>
	);
};
