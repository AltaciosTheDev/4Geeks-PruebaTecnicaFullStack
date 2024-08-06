const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: localStorage.getItem("token") || null,
			profile: JSON.parse(localStorage.getItem("profile")) || null,

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
			,loginUser: async (username, password) => {
				try {
				  const response = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({ username, password }),
				  });
		
				  if (!response.ok) {
					throw new Error('Login failed');
				  }
		
				  const data = await response.json();
				  console.log('Login successful:', data);
		
				// Save token and user profile in the store and localStorage
				setStore({ token: data.access_token, profile: data.user });
				localStorage.setItem('token', data.access_token)
				localStorage.setItem("profile", JSON.stringify(data.user));

				  return data;
				} catch (error) {
				  console.error('Error logging in:', error);
				  return null;
				}
			  },
			  logoutUser: () => {
				// Remove token and profile from the store and localStorage
				setStore({ token: null, profile: null });
				localStorage.removeItem('token');
				localStorage.removeItem('profile');
				console.log('Logout successful');
			  }
		}
	};
};

export default getState;
