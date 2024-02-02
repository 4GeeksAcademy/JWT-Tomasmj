const getState = ({ getStore, getActions, setStore }) => {
	// url del backend o base de datos
	let url = "https://didactic-halibut-jwjg55xgxg6cp5jr-3001.app.github.dev/api/"
	return {
		store: {
			
		},
		actions: {
			// Use getActions to call a function within a fuction
						// pasando por parametro
			registro: async(nombre, lastname, email, password) => {
				try {
					const response = await fetch(url + "user", {
						method: "POST",
						body: JSON.stringify({
							name: nombre,
							lastname: lastname,
							email: email,
							password: password
						}),
						headers:{"Content-Type": "application/json"}
					})
				} catch (error) {
					console.log(error);
				}
			},

			login: async(email, password) => {
				try{
					const response = await fetch(url + "login", {
						method: "POST",
						body: JSON.stringify({
							email: email,
							password: password
						}),
						headers:{"Content-Type": "application/json"}
					})
					
					if (response.status == 200){ //chequear que el back end devuelva 200
						const data= await response.json()//necesitamos que nos devuelva el token. info que llega
						localStorage.setItem("token", data.access_token) // almacenar en el local storage
					} 
					
					console.log(response); // ver el status en la consola
				} catch(error) {
					console.log(error);
				}
			}	
		}
	};
};

export default getState;
