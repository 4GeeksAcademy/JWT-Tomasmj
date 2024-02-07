import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const{actions, store} = useContext(Context)
	const[ver, setVer] = useState("invisible")
	const[visible, setVisible ] = useState("invisible")
	const navigate = useNavigate()

	useEffect(()=>{
		if(store.auth){
			setVer("invisible")
			setVisible("visible")
		}else{
			setVer("visible")
			setVisible("invisible")
		} 
	},[store.auth])

	function logout() {
		actions.logout()
		navigate("/")
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">	
				<Link to="/login">
					<button  className={"btn btn-outline-success " + ver}>Login</button>
				</Link>
					<button onClick={()=>logout()} className={"btn btn-outline-danger " + visible }>Logout</button>
				
				</div>
			</div>
		</nav>
	);
};
