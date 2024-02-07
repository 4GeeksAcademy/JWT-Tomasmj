import React, { useContext, useState, useEffect, Profiler } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate  } from "react-router-dom"; //importar el useNavigate

export const Protegido = () => { // ir a layout y agregarlo
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()
    useEffect(()=>{
        actions.get_profile()
    }, [])
    
    return(
        <div className="container">
            {store.auth ? 
                <h1>Hola {store.profile.name}</h1> :
                <h1>No estas autorizado loquito</h1>
        }
        </div>
    )
}