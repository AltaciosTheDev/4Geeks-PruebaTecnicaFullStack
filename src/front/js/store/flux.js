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
			posts: [],

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
			  },
			  createPost: async (postData) => {
                const store = getStore();
                const token = store.token;

                if (!token) {
                    console.error("No token found");
                    return;
                }

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/create_post`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(postData)
                    });

                    if (!response.ok) {
                        throw new Error("Failed to create post");
                    }

                    const data = await response.json();
                    console.log("Post created successfully:", data);
                    // Optionally, update the posts in the store
                    setStore({ posts: [...store.posts, data] });
                } catch (error) {
                    console.error("Error creating post:", error);
                }
            },
			fetchAllPosts: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/posts`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch posts");
                    }

                    const data = await response.json();
                    console.log("Posts fetched successfully:", data);
                    setStore({ posts: data });
                } catch (error) {
                    console.error("Error fetching posts:", error);
                }
            }
		}
	};
};

export default getState;
