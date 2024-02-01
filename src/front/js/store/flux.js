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
			}
			
		}
	};
};

export default getState;
