const getState = ({ getStore, getActions, setStore }) => {
	// url del backend o base de datos
	let url = "https://didactic-halibut-jwjg55xgxg6cp5jr-3001.app.github.dev/api/"
	return {
		store: {
			profile: {}, // crear esto
			auth: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			// pasando por parametro
			registro: async (nombre, lastname, email, password) => {
				try {
					const response = await fetch(url + "user", {
						method: "POST",
						body: JSON.stringify({
							name: nombre,
							lastname: lastname,
							email: email,
							password: password
						}),
						headers: { "Content-Type": "application/json" }
					})
					return true //devolver que se ejecuto correctamente la funcion
				} catch (error) {
					console.log(error);
					return false // SINO SE hace el fetch correctamente
				}
			},

			login: async (email, password) => {
				try {
					const response = await fetch(url + "login", {
						method: "POST",
						body: JSON.stringify({
							email: email,
							password: password
						}),
						headers: { "Content-Type": "application/json" }
					})
					if (response.status == 200) { //chequear que el back end devuelva 200
						const data = await response.json()//necesitamos que nos devuelva el token. info que llega
						localStorage.setItem("token", data.access_token) // almacenar en el local storage
						setStore({ auth: true })
						return true
					}
					console.log(response); // ver el status en la consola
				} catch (error) {
					console.log(error);
					return false
				}
			},
			get_profile: async () => {
				let access_token = localStorage.getItem("token") // aca recuperamos el token y lo guardamos en una variable
				try {
					const response = await fetch(url + "profile", {
						method: "GET",
						headers: { Authorization: "Bearer " + access_token } // pasando el toke, capturado en el lcoal storage
					})
					const data = await response.json() //pasar a json la info  y daya tiene la info usuario
					console.log(data);
					setStore({ profile: data.user })
					setStore({ auth: true })
				} catch (error) {
					console.log(error);
					return false
				} // crear vista protegido
			},
			logout: () => {
				localStorage.removeItem("token")
				setStore({ auth: false })
			}
		}
	};
};
export default getState;
