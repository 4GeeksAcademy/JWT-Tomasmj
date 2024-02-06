import React, { useContext, useState, useEffect, Profiler } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate  } from "react-router-dom"; //importar el useNavigate

export const Protegido = () => { // ir a layout y agregarlo
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()
    let auth = false// crear para saber si devuelve true o false
    useEffect (()=> {
        auth = actions.get_profile()
    },[])
    console.log(auth); 
    return(
        <div className="container">
            {auth ? 
                <h1>Hola {store.profile.name}</h1> :
                <h1>No estas autorizado loquito</h1>
        }
        </div>
    )
}